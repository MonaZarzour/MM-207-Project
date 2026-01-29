// File: Server/src/routes/sessions.routes.js
import express from "express";
import { getUserByEmail } from "../stores/users.store.js";
import { verifyPassword } from "../services/password.service.js";
import { createSession } from "../stores/sessions.store.js";

const router = express.Router();

// POST /api/sessions (login)
router.post("/sessions", async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password)
    return res.status(400).json({ error: "email and password are required" });

  const user = getUserByEmail(email);
  if (!user) return res.status(401).json({ error: "Invalid credentials" });

  const ok = await verifyPassword(String(password), user.passwordHash);
  if (!ok) return res.status(401).json({ error: "Invalid credentials" });

  const token = createSession(user.id);
  return res.json({ token });
});

export default router;
