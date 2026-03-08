// File: server/src/middleware/requireListMember.js
import { getListRole } from "../stores/list.store.js";
import { t } from "../utils/i18n.js";

export function requireListMember(paramName = "listId") {
  return async (req, res, next) => {
    const listId = req.params[paramName];
    const userId = req.user?.id;

    if (!listId) {
      return res.status(400).json({ error: t(req, "Missing listId") });
    }

    if (!userId) {
      return res.status(401).json({ error: t(req, "Unauthorized") });
    }

    try {
      const role = await getListRole(listId, userId);

      if (!role) {
        return res.status(403).json({ error: t(req, "Access denied") });
      }

      req.listAccess = {
        listId,
        role
      };

      next();
    } catch (err) {
      return res.status(500).json({ error: t(req, "Server error") });
    }
  };
}
