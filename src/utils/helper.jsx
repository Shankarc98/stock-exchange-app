
import {
    expireAuthSession,
    getSessionStatus,
    invalidateAuthSession,
    SessionExpiredError,
    SessionInvalidError
} from "./session";

const url = import.meta.env.VITE_API_URL;

export default async function apiFetch(endpoint, options = {}){
    const token = localStorage.getItem("token");

    const isAuthEndpoint = endpoint.startsWith("/auth/");
    const isProtectedRequest = Boolean(token) && !isAuthEndpoint;

    if (isProtectedRequest) {
        const status = getSessionStatus(token);
        if (status === "expired") {
            expireAuthSession();
            throw new SessionExpiredError();
        }
        if (status === "invalid") {
            invalidateAuthSession();
            throw new SessionInvalidError();
        }
    }

    const response = await fetch(`${url}${endpoint}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...(token && !isAuthEndpoint && {
                Authorization: `Bearer ${token}`
            }),
            ...options.headers
            
        }
    });

    if (isProtectedRequest && response.status === 401) {
        if (getSessionStatus(token) === "expired") {
            expireAuthSession();
            throw new SessionExpiredError();
        }

        invalidateAuthSession();
        throw new SessionInvalidError();
    }

    return response;
}