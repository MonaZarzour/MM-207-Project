//--------------------------- server/src/middleware/requireListMember.js
export function requireListMember(paramName = "listId") {
  return async (req, res, next) => {
    const listId = req.params[paramName];
    const userId = req.user?.id; // assumes auth middleware sets req.user

    if (!userId) return res.status(401).json({ error: "Unauthorized" });
    if (!listId) return res.status(400).json({ error: "Missing listId" });

    // TODO: replace with real DB check:
    // const role = await getUserRoleForList(userId, listId);

    const role = "member"; // placeholder role assignment

    if (!role) return res.status(403).json({ error: "Forbidden" });

    req.listAccess = { listId, role };
    next();
  };
}
