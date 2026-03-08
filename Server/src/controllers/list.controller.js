// File: server/src/controllers/list.controller.js
import { ListService } from "../services/list.service.js";
import { t } from "../utils/i18n.js";

export const ListController = {
    async getLists(req, res) {
        try {
            const data = await ListService.getAllLists(req.user.id);
            res.json({ data });
        } catch (e) {
            res.status(500).json({ error: t(req, "Server error") });
        }
    },

    async createList(req, res) {
        try {
            const data = await ListService.createList(req.body.title, req.user.id);
            res.status(201).json({ data });
        } catch (e) {
            res.status(400).json({ error: t(req, e.message) });
        }
    },

    async getListById(req, res) {
        res.json({
            ok: true,
            listId: req.params.listId,
            access: req.listAccess,
        });
    },

    async getListItems(req, res) {
        try {
            const data = await ListService.getListItems(req.params.listId);
            res.json({
                listId: req.params.listId,
                data
            });
        } catch (e) {
            res.status(500).json({ error: t(req, "Server error") });
        }
    },

    async createListItem(req, res) {
        try {
            // only editor or admin can add items
            if (req.listAccess.role === "viewer") {
                return res.status(403).json({ error: t(req, "Access denied") });
            }
            const data = await ListService.createListItem(req.params.listId, req.body);
            res.status(201).json({
                listId: req.params.listId,
                data
            });
        } catch (e) {
            res.status(400).json({ error: t(req, e.message) });
        }
    },

    async updateListItemStatus(req, res) {
        try {
            if (req.listAccess.role === "viewer") {
                return res.status(403).json({ error: t(req, "Access denied") });
            }
            const data = await ListService.toggleItemDone(req.params.itemId, req.params.listId, req.body.done);
            res.json({ data });
        } catch (e) {
            res.status(400).json({ error: t(req, e.message) });
        }
    },

    async updateListItemQuantity(req, res) {
        try {
            if (req.listAccess.role === "viewer") {
                return res.status(403).json({ error: t(req, "Access denied") });
            }
            const data = await ListService.updateItemQuantity(req.params.itemId, req.params.listId, req.body.quantity);
            res.json({ data });
        } catch (e) {
            res.status(400).json({ error: t(req, e.message) });
        }
    },

    async createListMember(req, res) {
        try {
            if (req.listAccess.role !== "admin") {
                return res.status(403).json({ error: t(req, "Only admins can invite members") });
            }
            const result = await ListService.createListMember(req.params.listId, req.body);
            res.status(201).json(result);
        } catch (e) {
            return res.status(400).json({ error: t(req, e.message) });
        }
    },

    async getMembers(req, res) {
        try {
            if (req.listAccess.role !== "admin") {
                return res.status(403).json({ error: t(req, "Access denied") });
            }
            const data = await ListService.getMembers(req.params.listId);
            res.json({ data });
        } catch (e) {
            res.status(500).json({ error: t(req, "Server error") });
        }
    },

    async updateMemberRole(req, res) {
        try {
            if (req.listAccess.role !== "admin") {
                return res.status(403).json({ error: t(req, "Access denied") });
            }
            const data = await ListService.updateMemberRole(req.params.listId, req.params.userId, req.body.role);
            res.json({ data });
        } catch (e) {
            res.status(400).json({ error: t(req, e.message) });
        }
    },

    async removeMember(req, res) {
        try {
            if (req.listAccess.role !== "admin") {
                return res.status(403).json({ error: t(req, "Access denied") });
            }
            await ListService.removeMember(req.params.listId, req.params.userId);
            res.json({ ok: true });
        } catch (e) {
            res.status(400).json({ error: t(req, e.message) });
        }
    }
};
