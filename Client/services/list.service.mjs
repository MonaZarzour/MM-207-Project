// File: client/services/list.service.mjs
import { request } from "../modules/fetchManager.mjs";

export const ListService = {
    async getLists() {
        return request("/api/lists");
    },

    async createList(title) {
        return request("/api/lists", {
            method: "POST",
            body: JSON.stringify({ title }),
        });
    },

    async getListItems(listId) {
        return request(`/api/lists/${listId}/items`);
    },

    async createListItem(listId, name, quantity, unit) {
        return request(`/api/lists/${listId}/items`, {
            method: "POST",
            body: JSON.stringify({ name, quantity, unit }),
        });
    },

    async toggleItemDone(listId, itemId, done) {
        return request(`/api/lists/${listId}/items/${itemId}/done`, {
            method: "PUT",
            body: JSON.stringify({ done }),
        });
    },

    async updateItemQuantity(listId, itemId, quantity) {
        return request(`/api/lists/${listId}/items/${itemId}/quantity`, {
            method: "PUT",
            body: JSON.stringify({ quantity }),
        });
    },

    async inviteMember(listId, email, role) {
        return request(`/api/lists/${listId}/members`, {
            method: "POST",
            body: JSON.stringify({ email, role }),
        });
    },

    async getMembers(listId) {
        return request(`/api/lists/${listId}/members`);
    },

    async updateMemberRole(listId, userId, role) {
        return request(`/api/lists/${listId}/members/${userId}/role`, {
            method: "PUT",
            body: JSON.stringify({ role }),
        });
    },

    async removeMember(listId, userId) {
        return request(`/api/lists/${listId}/members/${userId}`, {
            method: "DELETE",
        });
    }
};
