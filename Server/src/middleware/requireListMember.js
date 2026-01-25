export function requireListMember(paramName = "listId") {
  return (req, res, next) => {
    const listId = req.params[paramName];

    if (!listId) {
      return res.status(400).json({ error: "Missing listId" });
    }

    // Scaffold authorization (no DB yet)
    req.listAccess = {
      listId,
      role: "member",
    };

    next();
  };
}
