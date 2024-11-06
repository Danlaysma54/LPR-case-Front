const BASE_URL = "http://localhost/";
export const get = async (url: string) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${BASE_URL}${url}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};

export const post = async <D>(url: string, data: D) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${BASE_URL}${url}`, {
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

export const del = async (url: string) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${BASE_URL}${url}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};
