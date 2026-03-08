import "./views/user-create.view.mjs";
import "./views/login.view.mjs";
import "./views/user-edit.view.mjs";
import "./views/user-delete.view.mjs";
import "./views/shopping-list.view.mjs";
import "./views/item-list.view.mjs";
import "./views/share-list.view.mjs";

import "./controllers/user.controller.mjs";
import { t, getLang } from "./utils/i18n.mjs";
import { authStore } from "./data/authStore.mjs";

document.documentElement.lang = getLang();

const app = document.getElementById("app");
let currentAuthView = "login"; // "login" or "signup"

function renderApp() {
  const token = authStore.getToken();
  if (!token) {
    app.innerHTML = `
      <h1>${t("appTitle")}</h1>
      ${currentAuthView === "login" ? '<login-view></login-view>' : '<user-create></user-create>'}
    `;
  } else {
    // Basic navigation state mechanism
    app.innerHTML = `
      <h1>${t("appTitle")}</h1>
      <div class="user-controls row" style="justify-content: flex-end; margin-bottom: 1rem;">
         <button id="logout-btn" class="outline-btn">${t("logout")}</button>
      </div>
      <div id="view-container">
        <shopping-lists></shopping-lists>
      </div>
      
      <div style="margin-top: 3rem;">
        <details>
           <summary>${t("accountSettings")}</summary>
           <user-edit></user-edit>
           <user-delete></user-delete>
        </details>
      </div>
    `;

    document.getElementById("logout-btn").addEventListener("click", () => {
      authStore.clearToken();
      renderApp();
    });
  }
}

document.addEventListener("AUTH_STATE_CHANGED", () => renderApp());

// Auth view switching
document.addEventListener("SWITCH_TO_LOGIN", () => {
  currentAuthView = "login";
  renderApp();
});

document.addEventListener("SWITCH_TO_SIGNUP", () => {
  currentAuthView = "signup";
  renderApp();
});

// Navigation orchestration
let currentListId = null;
let currentRole = null;

document.addEventListener("VIEW_LIST", (e) => {
  currentListId = e.detail.listId;
  currentRole = e.detail.role;
  const container = document.getElementById("view-container");
  if (container) {
    container.innerHTML = `<item-list list-id="${currentListId}" role="${currentRole}"></item-list>`;
  }
});

document.addEventListener("BACK_TO_LISTS", () => {
  const container = document.getElementById("view-container");
  if (container) {
    container.innerHTML = `<shopping-lists></shopping-lists>`;
  }
});

document.addEventListener("OPEN_SHARE", (e) => {
  const container = document.getElementById("view-container");
  if (container) {
    container.innerHTML = `<share-list list-id="${e.detail.listId}"></share-list>`;
  }
});

document.addEventListener("BACK_TO_ITEMS", () => {
  const container = document.getElementById("view-container");
  if (container) {
    container.innerHTML = `<item-list list-id="${currentListId}" role="${currentRole}"></item-list>`;
  }
});

renderApp();

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").then(
      (registration) => console.log("Service Worker registered"),
      (err) => console.error("Service Worker registration failed:", err)
    );
  });
}
