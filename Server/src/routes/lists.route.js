// File: server/src/routes/lists.route.js
import express from "express";
import { requireListMember } from "../middleware/requireListMember.js";
import { ListController } from "../controllers/list.controller.js";

const router = express.Router();

// LISTS
router.get("/", ListController.getLists);
router.post("/", ListController.createList);
router.get("/:listId", requireListMember("listId"), ListController.getListById);

// ITEMS
router.get("/:listId/items", requireListMember("listId"), ListController.getListItems);
router.post("/:listId/items", requireListMember("listId"), ListController.createListItem);

// MEMBERS
router.post("/:listId/members", requireListMember("listId"), ListController.createListMember);

export default router;
