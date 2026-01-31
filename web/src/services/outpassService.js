const API = "http://localhost:5000/api/outpass";

function getToken() {
  const raw = localStorage.getItem("hostelhive_session");
  if (!raw) return "";
  try {
    return JSON.parse(raw)?.token || "";
  } catch {
    return "";
  }
}

async function apiFetch(url, options = {}) {
  const token = getToken();

  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });

  let data;
  try {
    data = await res.json();
  } catch {
    data = {};
  }

  if (!res.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data;
}

// STUDENT
export async function requestOutpass(payload) {
  return apiFetch(`${API}/request`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function getMyOutpasses() {
  return apiFetch(`${API}/my`, { method: "GET" });
}

// WARDEN
export async function getPendingOutpasses() {
  return apiFetch(`${API}/pending`, { method: "GET" });
}

export async function getApprovedOutpasses() {
  return apiFetch(`${API}/approved`, { method: "GET" });
}

export async function getRejectedOutpasses() {
  return apiFetch(`${API}/rejected`, { method: "GET" });
}

export async function approveOutpass(id) {
  return apiFetch(`${API}/${id}/approve`, { method: "POST" });
}

export async function rejectOutpass(id) {
  return apiFetch(`${API}/${id}/reject`, { method: "POST" });
}

// GUARD
export async function scanQR(qrToken) {
  return apiFetch(`${API}/scan`, {
    method: "POST",
    body: JSON.stringify({ qrToken }),
  });
}

export async function verifyByCode(outpassId) {
  return apiFetch(`${API}/verify-code`, {
    method: "POST",
    body: JSON.stringify({ outpassId }),
  });
}
