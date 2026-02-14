// File: Server/src/routes/users.routes.js
import express from "express";
import { createUser } from "../stores/users.store.js";
import {
  createSession,
  deleteSessionsForUser,
} from "../stores/sessions.store.js";
import { hashPassword } from "../services/password.service.js";
import { requireAuth } from "../middleware/requireAuth.js";
import { deleteUserById } from "../stores/users.store.js";

const router = express.Router();

// POST /api/users  (sign up)
router.post("/users", async (req, res) => {
  const { email, password, displayName, acceptTos } = req.body || {};

  if (!email || !password)
    return res.status(400).json({ error: "email and password are required" });
  if (acceptTos !== true)
    return res
      .status(400)
      .json({ error: "You must accept the Terms of Service" });

  const passwordHash = await hashPassword(String(password));
  const tosAcceptedAt = new Date().toISOString();
  const tosVersion = "1.0";

  try {
    const user = createUser({
      email,
      displayName,
      passwordHash,
      tosAcceptedAt,
      tosVersion,
    });
    const token = createSession(user.id);
    return res.status(201).json({ user, token });
  } catch (e) {
    const status = e.status || 500;
    return res.status(status).json({ error: e.message || "Server error" });
  }
});

// PUT /api/users  (edit)
router.put("/users/me", requireAuth, (req, res) => {
  const { displayName } = req.body;

  if (!displayName || typeof displayName !== "string") {
    return res.status(400).json({ message: "displayName is required" });
  }
  const user = req.user; // adjust if your project uses a different name
  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  user.displayName = displayName;

  return res.json({
    user: {
      id: user.id,
      email: user.email,
      displayName: user.displayName,
      tosAcceptedAt: user.tosAcceptedAt,
      tosVersion: user.tosVersion,
      createdAt: user.createdAt,
    },
  });
});

// DELETE /api/users/me  (delete account + withdraw consent)
router.delete("/users/me", requireAuth, (req, res) => {
  const userId = req.user.id;

  deleteSessionsForUser(userId);

  const ok = deleteUserById(userId);
  if (!ok) return res.status(404).json({ error: "User not found" });

  return res.json({ ok: true, message: "Account deleted" });
});

export default router;
