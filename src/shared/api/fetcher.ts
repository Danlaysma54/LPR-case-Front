import { useAuthStore } from "@/entites/Auth/store/AuthStore";
import { getTokenFromStorage } from "@/lib/get-token-from-storage";
import { serverUrl } from "src/config/configPaths";

const handleError = (response: Response) => {
  if (response.status === 401) {
    useAuthStore.getState().clearToken();
    throw new Error("UNAUTHORIZED");
  }
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response;
};

const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  const token = getTokenFromStorage();
  const headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
  };

  const response = await fetch(`${serverUrl}${url}`, { ...options, headers });
  return handleError(response);
};

export const api = {
  get: async (url: string) => {
    const response = await fetchWithAuth(url, { method: "GET" });
    return response.json();
  },
  post: async <D>(url: string, data: D) => {
    const response = await fetchWithAuth(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    return response.json();
  },
  patch: async <D>(url: string, data: D) => {
    const response = await fetchWithAuth(url, {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    return response.json();
  },
  delete: async (url: string) => {
    await fetchWithAuth(url, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
  },
};
