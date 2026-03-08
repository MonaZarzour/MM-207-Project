// File: server/src/stores/list.store.js
import crypto from "crypto";
import { query } from "../db/index.js";

export async function createList(title, ownerId) {
    const id = `lst_${crypto.randomUUID()}`;
    const insertList = await query(
        `INSERT INTO lists (id, title) VALUES ($1, $2) RETURNING *`,
        [id, title]
    );

    await query(
        `INSERT INTO list_members (list_id, user_id, role) VALUES ($1, $2, $3)`,
        [id, ownerId, 'admin']
    );

    return insertList.rows[0];
}

export async function getListsForUser(userId) {
    const result = await query(
        `SELECT l.*, lm.role 
     FROM lists l
     JOIN list_members lm ON l.id = lm.list_id
     WHERE lm.user_id = $1
     ORDER BY l.created_at DESC`,
        [userId]
    );
    return result.rows;
}

export async function getListRole(listId, userId) {
    const result = await query(
        `SELECT role FROM list_members WHERE list_id = $1 AND user_id = $2`,
        [listId, userId]
    );
    if (result.rows.length === 0) return null;
    return result.rows[0].role;
}

export async function addListMember(listId, userId, role = 'viewer') {
    const result = await query(
        `INSERT INTO list_members (list_id, user_id, role) 
     VALUES ($1, $2, $3)
     ON CONFLICT (list_id, user_id) 
     DO UPDATE SET role = EXCLUDED.role
     RETURNING *`,
        [listId, userId, role]
    );
    return result.rows[0];
}

export async function getListItems(listId) {
    const result = await query(
        `SELECT * FROM list_items WHERE list_id = $1 ORDER BY created_at ASC`,
        [listId]
    );
    return result.rows;
}

export async function createListItem(listId, { name, quantity = 1, unit = 'pcs' }) {
    const id = `itm_${crypto.randomUUID()}`;
    const result = await query(
        `INSERT INTO list_items (id, list_id, name, quantity, unit, done) 
     VALUES ($1, $2, $3, $4, $5, false) RETURNING *`,
        [id, listId, name, quantity, unit]
    );
    return result.rows[0];
}

export async function updateListItemStatus(itemId, listId, done) {
    const result = await query(
        `UPDATE list_items SET done = $1 WHERE id = $2 AND list_id = $3 RETURNING *`,
        [done, itemId, listId]
    );
    return result.rows[0];
}

export async function updateListItemQuantity(itemId, listId, quantity) {
    const result = await query(
        `UPDATE list_items SET quantity = $1 WHERE id = $2 AND list_id = $3 RETURNING *`,
        [quantity, itemId, listId]
    );
    return result.rows[0];
}

export async function getListMembers(listId) {
    const result = await query(
        `SELECT lm.user_id, lm.role, u.email, u.display_name
         FROM list_members lm
         JOIN users u ON lm.user_id = u.id
         WHERE lm.list_id = $1
         ORDER BY lm.role ASC`,
        [listId]
    );
    return result.rows;
}

export async function updateMemberRole(listId, userId, role) {
    const result = await query(
        `UPDATE list_members SET role = $1 WHERE list_id = $2 AND user_id = $3 RETURNING *`,
        [role, listId, userId]
    );
    return result.rows[0];
}

export async function removeListMember(listId, userId) {
    const result = await query(
        `DELETE FROM list_members WHERE list_id = $1 AND user_id = $2`,
        [listId, userId]
    );
    return result.rowCount > 0;
}
