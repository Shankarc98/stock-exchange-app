export const AUTH_TOKEN_KEY = "token";
export const SESSION_TIMEOUT_NOTICE_KEY = "sessionTimeoutNotice";
export const SESSION_TIMEOUT_SHOWN_KEY = "sessionTimeoutShown";
export const SESSION_EXPIRED_EVENT = "session-expired";
export const SESSION_INVALID_EVENT = "session-invalid";
export const SESSION_TIMEOUT_MESSAGE = "Session timed out, login again";

export function getTokenExpiration(token) {
  if (typeof token !== "string") return null;

  try {
    const parts = token.split(".");
    if (parts.length !== 3 || !parts[1]) return null;

    const encodedPayload = parts[1]
      .replace(/-/g, "+")
      .replace(/_/g, "/")
      .padEnd(Math.ceil(parts[1].length / 4) * 4, "=");
    const decodedPayload = atob(encodedPayload);
    const bytes = Uint8Array.from(decodedPayload, character => character.charCodeAt(0));
    const payload = JSON.parse(new TextDecoder().decode(bytes));

    if (!Number.isSafeInteger(payload.exp) || payload.exp <= 0) return null;
    return payload.exp * 1000;
  } catch {
    return null;
  }
}

export function getSessionStatus(token, now = Date.now()) {
  if (!token) return "missing";

  const expiresAt = getTokenExpiration(token);
  if (expiresAt === null) return "invalid";
  return now >= expiresAt ? "expired" : "valid";
}

export function clearAuthToken() {
  localStorage.removeItem(AUTH_TOKEN_KEY);
}

export function expireAuthSession() {
  clearAuthToken();
  sessionStorage.setItem(SESSION_TIMEOUT_NOTICE_KEY, "true");
  window.dispatchEvent(new Event(SESSION_EXPIRED_EVENT));
}

export function invalidateAuthSession() {
  clearAuthToken();
  window.dispatchEvent(new Event(SESSION_INVALID_EVENT));
}

export function clearSessionTimeoutNotice() {
  sessionStorage.removeItem(SESSION_TIMEOUT_NOTICE_KEY);
  sessionStorage.removeItem(SESSION_TIMEOUT_SHOWN_KEY);
}

export class SessionExpiredError extends Error {
  constructor() {
    super(SESSION_TIMEOUT_MESSAGE);
    this.name = "SessionExpiredError";
  }
}

export class SessionInvalidError extends Error {
  constructor() {
    super("Authentication is no longer valid.");
    this.name = "SessionInvalidError";
  }
}

export function isSessionControlError(error) {
  return error instanceof SessionExpiredError || error instanceof SessionInvalidError;
}
