// Centralized fetch wrapper for talking to the backend API
const API_URL = import.meta.env.VITE_API_URL;

export async function apiRequest(endpoint, options = {}) {
    const res = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...options.headers,
        },
    });

    const data = await res.json();

    if (!res.ok) {
        // Backend sends { error: "message" } on failure — surface it to the caller
        throw new Error(data.error || "Something went wrong");
    }

    return data;
}
