Shared Shopping List App:

Pages: 
-	LoginPage
-	SignUpPage
-	ShoppingListsPage
-	ItemsList
-	ShareListPage
-	ListSettingsPage

Models:
-	User (Sign up, Log in, Log out, Auth)
-	List (Create, View, Edit, Delete)
-	Item {Add (name, Qty, Note), Edit, Delete, Mark (purshaced or not) }
-	Member (Add, Edit, Roles, Permissions)

Services:
-	Api_service
-	Error_handler
-	Message_handler
-	Error_handler
Requirements:
-	Client: Frontend, UI
-	Server: Backend (Auth, Lists, Items, Sharing)
-	API Rest’ish
-	PWA: Offline with Sync when online, Local Storage and caching
