// File: client/modules/fetchManager.mjs
import { authStore } from "../data/authStore.mjs";

export async function request(url, options = {}) {
  const headers = {
    "Content-Type": "application/json",
    "Accept-Language": navigator.language || "en",
    ...(options.headers || {}),
  };

  const token = authStore.getToken();
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(url, { ...options, headers });

  const body = await res.json().catch(() => null);

  if (!res.ok) {
    const message = body?.error || body?.message || `Request failed (${res.status})`;
    throw new Error(message);
  }

  return body;
}
