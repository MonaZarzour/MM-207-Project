// File: server/src/routes/lists.route.js
import express from "express";
import { requireListMember } from "../middleware/requireListMember.js";
import { ListController } from "../controllers/list.controller.js";

const router = express.Router();

import { requireAuth } from "../middleware/requireAuth.js";

// LISTS
router.get("/", requireAuth, ListController.getLists);
router.post("/", requireAuth, ListController.createList);
router.get("/:listId", requireAuth, requireListMember("listId"), ListController.getListById);

// ITEMS
router.get("/:listId/items", requireAuth, requireListMember("listId"), ListController.getListItems);
router.post("/:listId/items", requireAuth, requireListMember("listId"), ListController.createListItem);
router.put("/:listId/items/:itemId/done", requireAuth, requireListMember("listId"), ListController.updateListItemStatus);
router.put("/:listId/items/:itemId/quantity", requireAuth, requireListMember("listId"), ListController.updateListItemQuantity);

// MEMBERS
router.get("/:listId/members", requireAuth, requireListMember("listId"), ListController.getMembers);
router.post("/:listId/members", requireAuth, requireListMember("listId"), ListController.createListMember);
router.put("/:listId/members/:userId/role", requireAuth, requireListMember("listId"), ListController.updateMemberRole);
router.delete("/:listId/members/:userId", requireAuth, requireListMember("listId"), ListController.removeMember);

export default router;
