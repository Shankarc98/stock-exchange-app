import Home from "./Components/Home";
import History from "./Components/History.jsx";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import {Navigate, Routes, Route, useLocation, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {
  AUTH_TOKEN_KEY,
  clearAuthToken,
  clearSessionTimeoutNotice,
  getSessionStatus,
  getTokenExpiration,
  SESSION_EXPIRED_EVENT,
  SESSION_INVALID_EVENT,
  SESSION_TIMEOUT_NOTICE_KEY
} from "./utils/session";

const protectedPaths = new Set(["/home", "/history"]);

function SessionMonitor(){
  const navigate = useNavigate();
  const {pathname} = useLocation();

  useEffect(() => {
    let expiryTimer;

    const redirectToLogin = timedOut => {
      navigate("/", {
        replace: true,
        state: timedOut ? {sessionTimedOut: true} : null
      });
    };

    const checkSession = () => {
      window.clearTimeout(expiryTimer);
      const token = localStorage.getItem(AUTH_TOKEN_KEY);

      if (!token) {
        const timedOut = sessionStorage.getItem(SESSION_TIMEOUT_NOTICE_KEY) === "true";
        if (timedOut) {
          clearSessionTimeoutNotice();
          redirectToLogin(true);
        } else if (protectedPaths.has(pathname)) {
          redirectToLogin(false);
        }
        return;
      }

      const status = getSessionStatus(token);
      if (status === "expired") {
        clearAuthToken();
        redirectToLogin(true);
        return;
      }
      if (status === "invalid") {
        clearAuthToken();
        if (protectedPaths.has(pathname)) redirectToLogin(false);
        return;
      }

      expiryTimer = window.setTimeout(
        checkSession,
        Math.max(0, getTokenExpiration(token) - Date.now())
      );
    };

    const handleExpiredSession = () => {
      clearSessionTimeoutNotice();
      redirectToLogin(true);
    };
    const handleInvalidSession = () => redirectToLogin(false);
    const handleStorage = event => {
      if (event.key === AUTH_TOKEN_KEY) checkSession();
    };
    const handleVisibility = () => {
      if (document.visibilityState === "visible") checkSession();
    };

    checkSession();
    window.addEventListener(SESSION_EXPIRED_EVENT, handleExpiredSession);
    window.addEventListener(SESSION_INVALID_EVENT, handleInvalidSession);
    window.addEventListener("focus", checkSession);
    window.addEventListener("pageshow", checkSession);
    window.addEventListener("storage", handleStorage);
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      window.clearTimeout(expiryTimer);
      window.removeEventListener(SESSION_EXPIRED_EVENT, handleExpiredSession);
      window.removeEventListener(SESSION_INVALID_EVENT, handleInvalidSession);
      window.removeEventListener("focus", checkSession);
      window.removeEventListener("pageshow", checkSession);
      window.removeEventListener("storage", handleStorage);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [navigate, pathname]);

  return null;
}

function RequireSession({children}){
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  const status = getSessionStatus(token);

  if (status === "valid") return children;
  return (
    <Navigate
      to="/"
      replace
      state={status === "expired" ? {sessionTimedOut: true} : null}
    />
  );
}

function App(){

  return <>
    <SessionMonitor />
    <Routes>
      <Route path="/" element={<Login />}/>
      <Route path="/signup" element={<Signup />}/>
      <Route path="/home" element={<RequireSession><Home /></RequireSession>} />
      <Route path="/history" element={<RequireSession><History /></RequireSession>}/>
    </Routes>
  </>
}

export default App;