const rawBaseUrl = import.meta.env.VITE_API_URL;
const PROJECT_ID = import.meta.env.VITE_PROJECT_ID;

/**
 * Wrapper around fetch for the NOVI backend.
 * - Adds JSON headers
 * - Adds project-id header
 * - Adds Authorization header when token exists
 * - Supports AbortController (cleanup in useEffect)
 * - Throws readable errors for non-OK responses
 */
export async function apiFetch(endpoint, options = {}) {
  if (!rawBaseUrl) {
    throw new Error("VITE_API_URL is missing. Add it to your .env file.");
  }

  if (!PROJECT_ID) {
    throw new Error("VITE_PROJECT_ID is missing. Add it to your .env file.");
  }

  const baseUrl = rawBaseUrl.replace(/\/$/, "");
  const path = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  const url = `${baseUrl}${path}`;

  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    "novi-education-project-id": PROJECT_ID,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers,
      signal: options.signal, // ✅ ensures AbortController works
    });

    if (!response.ok) {
      let message = "Request failed";

      try {
        const text = await response.text();
        if (text) message = text;
      } catch {
        // ignore
      }

      throw new Error(message);
    }

    // Handle 204 No Content
    if (response.status === 204) {
      return null;
    }

    const contentType = response.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      return await response.json();
    }

    return null;
  } catch (error) {
    // Important: re-throw AbortError properly
    if (error.name === "AbortError") {
      throw error;
    }

    throw error;
  }
}