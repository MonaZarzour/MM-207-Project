// File: server/src/services/list.service.js
import {
    createList,
    getListsForUser,
    getListItems,
    createListItem,
    addListMember,
    updateListItemStatus,
    updateListItemQuantity,
    getListMembers,
    updateMemberRole,
    removeListMember
} from "../stores/list.store.js";
import { getUserByEmail } from "../stores/user.store.js";

export const ListService = {
    async getAllLists(userId) {
        return await getListsForUser(userId);
    },

    async createList(title, userId) {
        if (!title) throw new Error("title is required");
        return await createList(title, userId);
    },

    async getListItems(listId) {
        return await getListItems(listId);
    },

    async createListItem(listId, { name, quantity = 1, unit = "pcs" }) {
        if (!name) throw new Error("name is required");
        return await createListItem(listId, { name, quantity, unit });
    },

    async toggleItemDone(itemId, listId, done) {
        return await updateListItemStatus(itemId, listId, done);
    },

    async updateItemQuantity(itemId, listId, quantity) {
        return await updateListItemQuantity(itemId, listId, quantity);
    },

    async createListMember(listId, { email, role = "viewer" }) {
        if (!email) throw new Error("email is required");

        const user = await getUserByEmail(email);
        if (!user) {
            throw new Error("User with that email not found");
        }

        return await addListMember(listId, user.id, role);
    },

    async getMembers(listId) {
        return await getListMembers(listId);
    },

    async updateMemberRole(listId, userId, role) {
        const validRoles = ["admin", "editor", "viewer"];
        if (!validRoles.includes(role)) throw new Error("Invalid role");
        return await updateMemberRole(listId, userId, role);
    },

    async removeMember(listId, userId) {
        return await removeListMember(listId, userId);
    }
};
