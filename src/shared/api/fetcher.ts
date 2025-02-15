import { serverUrl } from "src/config/configPaths";

export const get = async (url: string) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${serverUrl}${url}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  try {
    if (response.status >= 400 && response.status < 500) {
      console.error(`Error fetching project with ID ${url}:`, response);
      throw new Error();
    }
    if (response.status >= 500) {
      console.error("Server error", response);
      throw new Error();
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching project with ID ${url}:`, error);
  }
};
export const post = async <D>(url: string, data: D) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${serverUrl}${url}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (response.status == 404) {
    return "404";
  }
  return response.json();
};

export const patch = async <D>(url: string, data: D) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${serverUrl}${url}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (response.status == 404) {
    return "404";
  }
  return response.json();
};
export const del = async (url: string) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${serverUrl}${url}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};
