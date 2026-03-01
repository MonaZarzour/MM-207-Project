// File: server/src/services/session.service.js
import { getUserByEmail } from "../stores/user.store.js";
import { verifyPassword } from "./password.service.js";
import { createSession } from "../stores/session.store.js";

export const SessionService = {
    async authenticateUser(email, password) {
        if (!email || !password) throw new Error("email and password are required");

        const user = await getUserByEmail(email);
        if (!user) throw new Error("Invalid credentials");

        const ok = await verifyPassword(String(password), user.passwordHash);
        if (!ok) throw new Error("Invalid credentials");

        return createSession(user.id);
    }
};
