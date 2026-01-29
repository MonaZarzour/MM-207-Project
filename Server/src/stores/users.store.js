// File: Server/src/stores/users.store.js
import crypto from "crypto";

const usersById = new Map();
const usersByEmail = new Map(); 

export function createUser({
  email,
  displayName,
  passwordHash,
  tosAcceptedAt,
  tosVersion,
}) {
  const normalizedEmail = String(email).trim().toLowerCase();

  if (usersByEmail.has(normalizedEmail)) {
    const err = new Error("Email already in use");
    err.status = 409;
    throw err;
  }

  const id = `usr_${crypto.randomUUID()}`;
  const user = {
    id,
    email: normalizedEmail,
    displayName: displayName ? String(displayName).trim() : null,
    passwordHash,
    tosAcceptedAt, 
    tosVersion,
    createdAt: new Date().toISOString(),
  };

  usersById.set(id, user);
  usersByEmail.set(normalizedEmail, id);

  return sanitizeUser(user);
}

export function getUserByEmail(email) {
  const normalizedEmail = String(email).trim().toLowerCase();
  const id = usersByEmail.get(normalizedEmail);
  if (!id) return null;
  return usersById.get(id) || null;
}

export function getUserById(id) {
  return usersById.get(id) || null;
}

export function deleteUserById(id) {
  const user = usersById.get(id);
  if (!user) return false;

  usersById.delete(id);
  usersByEmail.delete(user.email);
  return true;
}

export function sanitizeUser(user) {
  return {
    id: user.id,
    email: user.email,
    displayName: user.displayName,
    tosAcceptedAt: user.tosAcceptedAt,
    tosVersion: user.tosVersion,
    createdAt: user.createdAt,
  };
}
