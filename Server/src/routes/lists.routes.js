import express from "express";
import { requireListMember } from "../middleware/requireListMember.js";

const router = express.Router();

// GET /api/lists/:listId
router.get("/:listId", requireListMember("listId"), async (req, res) => {
  res.json({
    ok: true,
    listId: req.params.listId,
    access: req.listAccess,
    note: "Scaffold response",
  });
});

// POST /api/lists/:listId/items
router.post("/:listId/items", requireListMember("listId"), async (req, res) => {
  res.status(201).json({
    ok: true,
    note: "Item created (scaffold)",
  });
});

export default router;
