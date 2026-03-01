// File: server/src/controllers/session.controller.js
import { SessionService } from "../services/session.service.js";

export const SessionController = {
    async login(req, res) {
        const { email, password } = req.body || {};

        try {
            const token = await SessionService.authenticateUser(email, password);
            return res.json({ token });
        } catch (e) {
            const status = e.message === "Invalid credentials" ? 401 : 400;
            return res.status(status).json({ error: e.message });
        }
    }
};
