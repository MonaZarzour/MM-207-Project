// File: server/src/middleware/requireAuth.js
import { getSession } from "../stores/session.store.js";
import { getUserById, sanitizeUser } from "../stores/user.store.js";

export async function requireAuth(req, res, next) {
  const header = req.headers.authorization || "";
  const [type, token] = header.split(" ");

  if (type !== "Bearer" || !token) {
    return res
      .status(401)
      .json({ error: "Missing or invalid Authorization header" });
  }

  const session = getSession(token);
  if (!session) return res.status(401).json({ error: "Invalid session" });

  try {
    const user = await getUserById(session.userId);
    if (!user) return res.status(401).json({ error: "User not found" });

    req.user = sanitizeUser(user);
    req.authToken = token;
    next();
  } catch (err) {
    return res.status(500).json({ error: "Database error" });
  }
}
