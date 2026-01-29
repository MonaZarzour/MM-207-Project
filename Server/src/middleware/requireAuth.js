// File: Server/src/middleware/requireAuth.js
import { getSession } from "../stores/sessions.store.js";
import { getUserById, sanitizeUser } from "../stores/users.store.js";

export function requireAuth(req, res, next) {
  const header = req.headers.authorization || "";
  const [type, token] = header.split(" ");

  if (type !== "Bearer" || !token) {
    return res
      .status(401)
      .json({ error: "Missing or invalid Authorization header" });
  }

  const session = getSession(token);
  if (!session) return res.status(401).json({ error: "Invalid session" });

  const user = getUserById(session.userId);
  if (!user) return res.status(401).json({ error: "User not found" });

  req.user = sanitizeUser(user);
  req.authToken = token;
  next();
}
