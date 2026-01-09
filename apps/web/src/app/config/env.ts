export const config = {
    apiUrl: import.meta.env.VITE_API_URL || "http://localhost:3001/api/v1",
    apiTimeout: Number(import.meta.env.VITE_API_TIMEOUT) || 10000,
    defaultQueryStaleTime: Number(import.meta.env.VITE_DEFAULT_QUERY_STALE_TIME) || 5 * 60 * 1000,
}