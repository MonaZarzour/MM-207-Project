// File: server/src/stores/user.store.js
import crypto from "crypto";
import { query } from "../db/index.js";

export async function createUser({
  email,
  displayName,
  passwordHash,
  tosAcceptedAt,
  tosVersion,
}) {
  const normalizedEmail = String(email).trim().toLowerCase();

  // Check if user exists
  const existingUserResult = await query("SELECT * FROM users WHERE email = $1", [normalizedEmail]);
  if (existingUserResult.rows.length > 0) {
    const err = new Error("Email already in use");
    err.status = 409;
    throw err;
  }

  const id = `usr_${crypto.randomUUID()}`;
  const createdAt = new Date().toISOString();

  const insertResult = await query(
    `INSERT INTO users (id, email, display_name, password_hash, tos_accepted_at, tos_version, created_at)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING *`,
    [id, normalizedEmail, displayName ? String(displayName).trim() : null, passwordHash, tosAcceptedAt, tosVersion, createdAt]
  );

  const dbUser = insertResult.rows[0];
  return sanitizeUser(mapDbUserToAppUser(dbUser));
}

export async function getUserByEmail(email) {
  const normalizedEmail = String(email).trim().toLowerCase();
  const result = await query("SELECT * FROM users WHERE email = $1", [normalizedEmail]);
  if (result.rows.length === 0) return null;
  return mapDbUserToAppUser(result.rows[0]);
}

export async function getUserById(id) {
  const result = await query("SELECT * FROM users WHERE id = $1", [id]);
  if (result.rows.length === 0) return null;
  return mapDbUserToAppUser(result.rows[0]);
}

export async function deleteUserById(id) {
  const result = await query("DELETE FROM users WHERE id = $1", [id]);
  return result.rowCount > 0;
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

function mapDbUserToAppUser(dbUser) {
  return {
    id: dbUser.id,
    email: dbUser.email,
    displayName: dbUser.display_name,
    passwordHash: dbUser.password_hash,
    tosAcceptedAt: dbUser.tos_accepted_at,
    tosVersion: dbUser.tos_version,
    createdAt: dbUser.created_at,
  };
}
