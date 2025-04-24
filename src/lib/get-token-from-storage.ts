export function getTokenFromStorage() {
  return localStorage.getItem("token") ?? sessionStorage.getItem("token");
}

export function removeTokenFromStorage() {
  localStorage.removeItem("token");
  sessionStorage.removeItem("token");
}
