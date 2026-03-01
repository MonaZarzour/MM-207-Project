// File: server/src/services/user.service.js
import { createUser, deleteUserById } from "../stores/user.store.js";
import { hashPassword } from "./password.service.js";
import { query } from "../db/index.js";

export const UserService = {
  async registerUser({ email, password, displayName, acceptTos }) {
    if (!email || !password) throw new Error("email and password are required");
    if (acceptTos !== true) throw new Error("You must accept the Terms of Service");

    const passwordHash = await hashPassword(String(password));
    const tosAcceptedAt = new Date().toISOString();
    const tosVersion = "1.0";

    return await createUser({
      email,
      displayName,
      passwordHash,
      tosAcceptedAt,
      tosVersion,
    });
  },

  async editUser(user, { displayName }) {
    if (!displayName || typeof displayName !== "string") {
      throw new Error("displayName is required");
    }

    user.displayName = displayName;

    // Also save this update to DB so it persists
    await query("UPDATE users SET display_name = $1 WHERE id = $2", [displayName, user.id]);

    return user;
  },

  async deleteAccount(userId) {
    const ok = await deleteUserById(userId);
    if (!ok) throw new Error("User not found");
    return true;
  },
};
