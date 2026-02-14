import { ShoppingListView } from "./views/ShoppingList_View.mjs";

function startApp() {
  const app = document.getElementById("app");

  if (!app) {
    console.error("❌ #app not found in Index.html");
    return;
  }

  app.innerHTML = ShoppingListView();
  console.log("✅ App started successfully");
}

startApp();
