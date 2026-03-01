// File: server/src/routes/sessions.route.js
import express from "express";
import { SessionController } from "../controllers/session.controller.js";

const router = express.Router();

// POST /api/sessions (login)
router.post("/sessions", SessionController.login);

export default router;
