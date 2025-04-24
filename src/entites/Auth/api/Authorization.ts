import { serverUrl } from "@/config/configPaths";

const apiUrl = "/api/auth";

export async function login(username: string, password: string) {
  const url = `/login`;
  const response = await fetch(`${serverUrl}${apiUrl}${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
  if (response.status == 404) {
    return "404";
  }
  return response.json();
}

export async function register(username: string, password: string) {
  const url = `/register`;
  const response = await fetch(`${serverUrl}${apiUrl}${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
  if (response.status == 409) {
    return "CONFLICT";
  }
  return "OK";
}
