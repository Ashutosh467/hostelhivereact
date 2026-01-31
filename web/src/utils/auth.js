const KEY = "hostelhive_session";

export function saveSession(data) {
  localStorage.setItem(KEY, JSON.stringify(data));
}

export function getSession() {
  try {
    return JSON.parse(localStorage.getItem(KEY));
  } catch {
    return null;
  }
}

export function getToken() {
  const s = getSession();
  return s?.token || "";
}

export function logout() {
  localStorage.removeItem(KEY);
}
