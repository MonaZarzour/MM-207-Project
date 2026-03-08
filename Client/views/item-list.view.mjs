// File: client/views/item-list.view.mjs
import { ListService } from "../services/list.service.mjs";
import { t } from "../utils/i18n.mjs";

export class ItemListView extends HTMLElement {
    static get observedAttributes() {
        return ['list-id', 'role'];
    }

    async attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'list-id' && newValue) {
            this.listId = newValue;
            await this.render();
        }
        if (name === 'role') {
            this.role = newValue;
        }
    }

    async render() {
        if (!this.listId) return;

        let items = [];
        try {
            const res = await ListService.getListItems(this.listId);
            items = res.data || [];
        } catch (e) {
            console.error(e);
        }

        const itemsHtml = items.map(item => `
      <div class="item-card row" style="align-items: center;">
        <input type="checkbox" class="item-done-cb" data-id="${item.id}" ${item.done ? "checked" : ""} ${this.role === 'viewer' ? 'disabled' : ''} />
        <span class="${item.done ? 'item-done' : ''}" style="flex: 1;">${item.name} (${item.quantity} ${item.unit})</span>
      </div>
    `).join("");

        this.innerHTML = `
      <section class="card active-list">
        <button id="back-btn" class="text-btn">&larr; ${t("backToLists")}</button>
        <h2>${t("viewItems")}</h2>
        
        ${this.role !== 'viewer' ? `
        <form id="add-item-form" class="row">
          <input name="name" placeholder="${t("itemName")}" aria-label="${t("itemName")}" required style="flex: 2" />
          <input name="quantity" type="number" min="1" value="1" placeholder="${t("qty")}" aria-label="${t("qty")}" style="flex: 1" />
          <input name="unit" placeholder="pcs" style="flex: 1" />
          <button type="submit">${t("add")}</button>
        </form>
        ` : ''}

        <div class="items-container">
          ${itemsHtml.length ? itemsHtml : `<p class="muted">${t("noItemsYet")}</p>`}
        </div>

        ${this.role === 'admin' ? `
        <div style="margin-top: 2rem; border-top: 1px solid var(--border-color); padding-top: 1rem;">
          <button id="share-btn" class="outline-btn">${t("manageList")}</button>
        </div>
        ` : ''}

        <p id="item-msg" class="muted" aria-live="polite" aria-atomic="true"></p>
      </section>
    `;

        this.querySelector("#back-btn").addEventListener("click", () => {
            this.dispatchEvent(new CustomEvent("BACK_TO_LISTS", { bubbles: true, composed: true }));
        });

        if (this.role !== 'viewer') {
            this.querySelector("#add-item-form")?.addEventListener("submit", async (e) => {
                e.preventDefault();
                const msg = this.querySelector("#item-msg");
                msg.textContent = "...";
                try {
                    await ListService.createListItem(
                        this.listId,
                        e.target.name.value,
                        parseInt(e.target.quantity.value) || 1,
                        e.target.unit.value || "pcs"
                    );
                    msg.textContent = "";
                    this.render();
                } catch (err) {
                    msg.textContent = err.message;
                }
            });

            this.querySelectorAll(".item-done-cb").forEach(cb => {
                cb.addEventListener("change", async (e) => {
                    const itemId = e.target.getAttribute("data-id");
                    const done = e.target.checked;
                    try {
                        await ListService.toggleItemDone(this.listId, itemId, done);
                        this.render();
                    } catch (err) {
                        console.error(err);
                        e.target.checked = !done; // revert
                    }
                });
            });
        }

        const shareBtn = this.querySelector("#share-btn");
        if (shareBtn) {
            shareBtn.addEventListener("click", () => {
                this.dispatchEvent(new CustomEvent("OPEN_SHARE", {
                    detail: { listId: this.listId },
                    bubbles: true,
                    composed: true
                }));
            });
        }
    }
}

customElements.define("item-list", ItemListView);
