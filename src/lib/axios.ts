import axios from "axios";

const apiClient = axios.create({
  baseURL: typeof window !== "undefined" ? "/api" : `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Response interceptor — unwrap data or throw structured errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // The server responded with an error status
      const message =
        error.response.data?.message || error.response.statusText || "An error occurred";
      const status = error.response.status;

      // For 401 errors, the auth-client will handle redirects
      const apiError = new Error(message) as Error & { status: number };
      apiError.status = status;
      return Promise.reject(apiError);
    }

    if (error.request) {
      // Request was made but no response received
      return Promise.reject(new Error("Network error. Please check your connection."));
    }

    return Promise.reject(error);
  }
);

export default apiClient;
