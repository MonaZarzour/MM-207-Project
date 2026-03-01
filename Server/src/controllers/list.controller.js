// File: server/src/controllers/list.controller.js
import { ListService } from "../services/list.service.js";

export const ListController = {
    getLists(req, res) {
        const data = ListService.getAllLists();
        res.json({ data, note: "Scaffold response" });
    },

    createList(req, res) {
        try {
            const data = ListService.createList(req.body.title);
            res.status(201).json({ data, note: "Scaffold response" });
        } catch (e) {
            res.status(400).json({ error: e.message });
        }
    },

    getListById(req, res) {
        res.json({
            ok: true,
            listId: req.params.listId,
            access: req.listAccess,
            note: "Scaffold response",
        });
    },

    getListItems(req, res) {
        const data = ListService.getListItems(req.params.listId);
        res.json({
            listId: req.params.listId,
            data,
            note: "Scaffold response",
        });
    },

    createListItem(req, res) {
        try {
            const data = ListService.createListItem(req.params.listId, req.body);
            res.status(201).json({
                listId: req.params.listId,
                data,
                note: "Scaffold response",
            });
        } catch (e) {
            // Retaining legacy error shape for this route
            res.status(400).json({ error: e.message, message: "Helolo", value: "200$" });
        }
    },

    createListMember(req, res) {
        try {
            const result = ListService.createListMember(req.params.listId, req.body);
            res.status(201).json(result);
        } catch (e) {
            return res.status(400).json({ error: "Client-error!", details: [`${e.message}`] });
        }
    }
};
