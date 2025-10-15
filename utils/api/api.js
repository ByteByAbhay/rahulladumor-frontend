import axios from "axios";
import apiEndpoints from "./apiEndpoints";

// --- TOKEN STORAGE HELPERS ---
export const getStoredAuthToken = () =>
  typeof window !== "undefined" ? localStorage.getItem("authToken") : null;
export const getStoredIdToken = () =>
  typeof window !== "undefined" ? localStorage.getItem("idToken") : null;
export const getStoredRefreshToken = () =>
  typeof window !== "undefined" ? localStorage.getItem("refreshToken") : null;
export const setAuthToken = (token) =>
  typeof window !== "undefined" && localStorage.setItem("authToken", token);
export const setRefreshToken = (token) =>
  typeof window !== "undefined" && localStorage.setItem("refreshToken", token);
export const setIdToken = (token) =>
  typeof window !== "undefined" && localStorage.setItem("idToken", token);

// --- UTILS ---
export const objectToQueryString = (params = {}) => {
  const esc = encodeURIComponent;
  return Object.keys(params)
    .map((k) => esc(k) + "=" + esc(params[k]))
    .join("&");
};

const getBackendUrl = () => {
  return process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://localhost:3002";
};

const defaults = {
  baseURL: getBackendUrl(),
  error: {
    code: "INTERNAL_ERROR",
    message:
      "Something went wrong. Please check your internet connection or contact our support.",
    status: 503,
    data: {},
  },
};

export const refreshAccessToken = async () => {
  try {
    const refreshToken = getStoredRefreshToken();
    if (!refreshToken) {
      return null;
    }
    const response = await axios.post(
      `${defaults.baseURL}${apiEndpoints.refreshToken}`,
      { refreshToken },
      { headers: { "Content-Type": "application/json" } }
    );
    const newToken = response?.data?.data?.accessToken ?? "";
    const newRefreshToken = response?.data?.data?.refreshToken ?? "";
    setAuthToken(newToken);
    setRefreshToken(newRefreshToken);
    return newToken;
  } catch (error) {
    console.error("Failed to refresh token", error);
    if (typeof window !== "undefined") localStorage.clear();
    return null;
  }
};

const getHeaders = async (refreshToken, contentType) => {
  // Try to get accessToken from the same place as AuthService
  let accessToken = null;
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("authToken");
    if (stored) {
      try {
        accessToken = stored || null;
      } catch {}
    }
  }
  // Fallback to old helper if needed
  if (!accessToken) {
    accessToken = getStoredAuthToken();
  }
  const idToken = getStoredIdToken();
  return {
    "Content-Type": contentType || "application/json",
    Authorization: refreshToken
      ? `Bearer ${refreshToken}`
      : accessToken
      ? `Bearer ${accessToken}`
      : undefined,
    // "x-id-token": accessToken ?? undefined,
  };
};

const api = async (method, url, options, baseURL) => {
  let headers = await getHeaders(undefined, options?.contentType);
  try {
    const params = options?.params || {};
    Object.keys(params).forEach(
      (key) => params[key] === undefined && delete params[key]
    );
    const response = await axios({
      url: `${baseURL || defaults.baseURL}${url}`,
      method,
      headers,
      params,
      data: options?.data,
      paramsSerializer: objectToQueryString,
    });
    return response.data;
  } catch (error) {
    console.error("🚀 ~ api ~ error:", error?.response);
    if (axios.isAxiosError(error) && error?.response) {
      if (error.response.status === 401) {
        const newToken = await refreshAccessToken();
        headers = await getHeaders(undefined, options?.contentType);
        const params = options?.params || {};
        Object.keys(params).forEach(
          (key) => params[key] === undefined && delete params[key]
        );
        if (newToken) {
          try {
            const retryResponse = await axios({
              url: `${defaults.baseURL}${url}`,
              method,
              headers,
              params,
              data: options?.data,
              paramsSerializer: objectToQueryString,
            });
            return retryResponse.data;
          } catch (retryError) {
            console.error("Retry failed", retryError);
            throw defaults.error;
          }
        } else {
          if (typeof window !== "undefined") localStorage.clear();
          if (typeof window !== "undefined") window.location.href = "/";
          throw { message: "Session expired. Please log in again." };
        }
      }
      if (error.response.status === 402) {
        console.error("402 - Organization is out of tokens");
      }
      if (
        error?.response?.data?.error &&
        error?.response?.status !== 503 &&
        error?.response?.status !== 401
      ) {
        throw {
          message: error?.response?.data?.error,
          status: error?.response?.status,
        };
      }
    }
    throw defaults.error;
  }
};

export default {
  get: (url, options, baseURL) => api("get", url, options, baseURL),
  post: (url, options, baseURL) => api("post", url, options, baseURL),
  put: (url, options, baseURL) => api("put", url, options, baseURL),
  patch: (url, options, baseURL) => api("patch", url, options, baseURL),
  delete: (url, options, baseURL) => api("delete", url, options, baseURL),
};
