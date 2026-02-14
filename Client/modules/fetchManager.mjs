// File: Client/modules/fetchManager.mjs
import { authStore } from "../data/authStore.mjs";

export async function request(url, options = {}) {
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  const token = authStore.getToken();
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(url, { ...options, headers });

  const body = await res.json().catch(() => null);

  if (!res.ok) {
    const message = body?.message || `Request failed (${res.status})`;
    throw new Error(message);
  }

  return body;
}
