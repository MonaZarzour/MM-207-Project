//-----------------------server/src/routes/lists.routes.js
import express from "express";
import { requireListMember } from "../middleware/requireListMember.js";

const router = express.Router();

router.get("/lists/:listId", requireListMember("listId"), async (req, res) => {
  res.json({ ok: true, listId: req.params.listId, access: req.listAccess });
});

router.post(
  "/lists/:listId/items",
  requireListMember("listId"),
  async (req, res) => {
    res.status(201).json({ ok: true });
  },
);

export default router;
