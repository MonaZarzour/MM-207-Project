import { ListService } from "../services/list.service.mjs";
import { t } from "../utils/i18n.mjs";

export class ShoppingListView extends HTMLElement {
  async connectedCallback() {
    await this.render();
  }

  async render() {
    let lists = [];
    try {
      const res = await ListService.getLists();
      lists = res.data || [];
    } catch (e) {
      console.error(e);
    }

    const listsHtml = lists.map(l => `
      <div class="list-item-card">
        <div>
          <h3>${l.title}</h3>
          <span class="muted">${t("role")}: ${l.role}</span>
        </div>
        <button class="view-btn" data-id="${l.id}" data-role="${l.role}">${t("viewItems")}</button>
      </div>
    `).join("");

    this.innerHTML = `
      <section class="card">
        <h2>${t("myLists")}</h2>
        
        <form id="create-list-form" class="row">
          <input name="title" placeholder="${t("listName")}" required />
          <button type="submit">${t("createList")}</button>
        </form>
        
        <div id="lists-container" class="lists-grid">
          ${listsHtml}
        </div>
        <p id="msg" class="muted" aria-live="polite" aria-atomic="true"></p>
      </section>
    `;

    this.querySelector("#create-list-form").addEventListener("submit", async (e) => {
      e.preventDefault();
      const title = e.target.title.value;
      const msg = this.querySelector("#msg");
      msg.textContent = t("creating");

      try {
        await ListService.createList(title);
        msg.textContent = "";
        this.render(); // re-render
      } catch (err) {
        msg.textContent = err.message;
      }
    });

    this.querySelectorAll(".view-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const listId = btn.getAttribute("data-id");
        const role = btn.getAttribute("data-role");
        this.dispatchEvent(new CustomEvent("VIEW_LIST", {
          detail: { listId, role },
          bubbles: true,
          composed: true
        }));
      });
    });
  }
}

customElements.define("shopping-lists", ShoppingListView);
