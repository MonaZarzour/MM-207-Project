// File: Server/src/routes/lists.routes.js
import express from "express";
import { requireListMember } from "../middleware/requireListMember.js";

const router = express.Router();

/**
 * LISTS
 * GET /api/lists
 */
router.get("/", (req, res) => {
  res.json({
    data: [
      { id: "list_1", title: "Weekly groceries", role: "owner" },
      { id: "list_2", title: "Party shopping", role: "member" },
    ],
    note: "Scaffold response",
  });
});

/**
 * LISTS
 * POST /api/lists
 */
router.post("/", (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: "title is required" });

  res.status(201).json({
    data: { id: "list_new", title },
    note: "Scaffold response",
  });
});

/**
 * LISTS
 * GET /api/lists/:listId
 */
router.get("/:listId", requireListMember("listId"), (req, res) => {
  res.json({
    ok: true,
    listId: req.params.listId,
    access: req.listAccess,
    note: "Scaffold response",
  });
});

/**
 * ITEMS
 * GET /api/lists/:listId/items
 */
router.get("/:listId/items", requireListMember("listId"), (req, res) => {
  res.json({
    listId: req.params.listId,
    data: [
      { id: "item_1", name: "Milk", quantity: 2, unit: "pcs", done: false },
      { id: "item_2", name: "Eggs", quantity: 12, unit: "pcs", done: true },
    ],
    note: "Scaffold response",
  });
});

/**
 * ITEMS
 * POST /api/lists/:listId/items
 */
router.post("/:listId/items", requireListMember("listId"), (req, res) => {
  const { name, quantity = 1, unit = "pcs" } = req.body;
  if (!name) return res.status(400).json({ error: "name is required" });

  res.status(201).json({
    listId: req.params.listId,
    data: { id: "item_new", name, quantity, unit, done: false },
    note: "Scaffold response",
  });
});

/**
 * MEMBERS
 * POST /api/lists/:listId/members
 */
router.post("/:listId/members", requireListMember("listId"), (req, res) => {
  const { email, role = "member" } = req.body;
  if (!email) return res.status(400).json({ error: "email is required" });

  res.status(201).json({
    listId: req.params.listId,
    data: { id: "member_new", email, role },
    note: "Scaffold response (invite not implemented)",
  });
});

export default router;
