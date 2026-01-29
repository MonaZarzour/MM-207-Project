// File: Server/src/stores/sessions.store.js
import crypto from "crypto";

const sessionsByToken = new Map(); // token -> { userId, createdAt }

export function createSession(userId) {
  const token = crypto.randomBytes(32).toString("hex");
  sessionsByToken.set(token, { userId, createdAt: new Date().toISOString() });
  return token;
}

export function getSession(token) {
  return sessionsByToken.get(token) || null;
}

export function deleteSessionsForUser(userId) {
  for (const [token, session] of sessionsByToken.entries()) {
    if (session.userId === userId) sessionsByToken.delete(token);
  }
}

export function deleteSession(token) {
  sessionsByToken.delete(token);
}
