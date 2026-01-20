Shared Shopping List App:

Pages:

- LoginPage
- SignUpPage
- ShoppingListsPage
- ItemsList
- ShareListPage
- ListSettingsPage

Models:

- User (Sign up, Log in, Log out, Auth)
- List (Create, View, Edit, Delete)
- Item {Add (name, Qty, Note), Edit, Delete, Mark (purshaced or not) }
- Member (Add, Edit, Roles, Permissions)

Services:

- Api_service
- Error_handler
- Message_handler
- Error_handler

Requirements:

- Client: Frontend, UI
- Server: Backend (Auth, Lists, Items, Sharing)
- API Rest’ish
- PWA: Offline with Sync when online, Local Storage and caching

Middleware documentation:
Need: In a shared shopping list app, lists are shared between users. The server must prevent a user from reading/updating a list they are not a member of. Without this, someone could guess a listId and access another person’s list.

Solution: Build an Express middleware that runs before route handlers and checks that the current user is a member of listId. If yes → next(). If no → 403 Forbidden
• Define authorization rules (member vs owner permissions)
• Design middleware interface (where listId comes from, what it adds to req)
• Add DB query for list membership + role
• Implement requireListMember middleware
• Implement optional requireListOwner middleware
• Add tests (unit/integration) for allowed/forbidden cases
• Integrate middleware into list and item routes
• Write documentation + examples
• Code review / refactor / cleanup
