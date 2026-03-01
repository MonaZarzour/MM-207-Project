// File: server/src/routes/users.route.js
import express from "express";
import { UserController } from "../controllers/user.controller.js";
import { requireAuth } from "../middleware/requireAuth.js";

const router = express.Router();

router.post("/users", UserController.register);
router.put("/users/me", requireAuth, UserController.editMe);
router.delete("/users/me", requireAuth, UserController.deleteMe);

export default router;
