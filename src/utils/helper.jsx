
const url = import.meta.env.VITE_API_URL; 

export default async function apiFetch(endpoint, options = {}){
    const token = localStorage.getItem("token"); 

    const isAuthEndpoint = endpoint.startsWith("/auth/");

    return fetch(`${url}${endpoint}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...(token && !isAuthEndpoint && {
                Authorization: `Bearer ${token}`
            }),
            ...options.headers
            
        }
    });
}