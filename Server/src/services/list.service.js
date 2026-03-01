// File: server/src/services/list.service.js
export class NoteList {
    constructor(listId, data, note) {
        this.listId = listId;
        this.note = note;
        this.data = data;
    }
}

export const ListService = {
    getAllLists() {
        return [
            { id: "list_1", title: "Weekly groceries", role: "owner" },
            { id: "list_2", title: "Party shopping", role: "member" },
        ];
    },

    createList(title) {
        if (!title) throw new Error("title is required");
        return { id: "list_new", title };
    },

    getListItems(listId) {
        return [
            { id: "item_1", name: "Milk", quantity: 2, unit: "pcs", done: false },
            { id: "item_2", name: "Eggs", quantity: 12, unit: "pcs", done: true },
        ];
    },

    createListItem(listId, { name, quantity = 1, unit = "pcs" }) {
        if (!name) throw new Error("name is required");
        return { id: "item_new", name, quantity, unit, done: false };
    },

    createListMember(listId, { email, role = "member" }) {
        if (!email) throw new Error("email is required");
        return new NoteList(listId, { id: "member_new", email, role }, "Scaffold response (invite not implemented)");
    }
};
