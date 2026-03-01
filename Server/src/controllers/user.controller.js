// File: server/src/controllers/user.controller.js
import { UserService } from "../services/user.service.js";
import { createSession, deleteSessionsForUser } from "../stores/session.store.js";

export const UserController = {
    async register(req, res) {
        try {
            const user = await UserService.registerUser(req.body || {});
            const token = createSession(user.id);
            return res.status(201).json({ user, token });
        } catch (e) {
            const status = e.status || 400;
            return res.status(status).json({ error: e.message || "Server error" });
        }
    },

    async editMe(req, res) {
        const user = req.user;
        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        try {
            const updatedUser = await UserService.editUser(user, req.body);
            return res.json({
                user: {
                    id: updatedUser.id,
                    email: updatedUser.email,
                    displayName: updatedUser.displayName,
                    tosAcceptedAt: updatedUser.tosAcceptedAt,
                    tosVersion: updatedUser.tosVersion,
                    createdAt: updatedUser.createdAt,
                },
            });
        } catch (e) {
            return res.status(400).json({ message: e.message });
        }
    },

    async deleteMe(req, res) {
        const userId = req.user.id;

        try {
            deleteSessionsForUser(userId);
            await UserService.deleteAccount(userId);
            return res.json({ ok: true, message: "Account deleted" });
        } catch (e) {
            return res.status(404).json({ error: e.message });
        }
    },
};
