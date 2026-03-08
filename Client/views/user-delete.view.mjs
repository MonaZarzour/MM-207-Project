// File: client/views/user-delete.view.mjs

import { t } from "../utils/i18n.mjs";

export class UserDeleteView extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <section class="card">
        <h2>${t("deleteAccount")}</h2>

        <button id="btn" class="danger">${t("deleteBtn")}</button>
        <p id="msg" class="muted" aria-live="polite" aria-atomic="true"></p>
      </section>
    `;

    const btn = this.querySelector("#btn");
    const msg = this.querySelector("#msg");

    btn.addEventListener("click", async () => {
      msg.textContent = t("deleting");

      this.dispatchEvent(new CustomEvent("USER_DELETE_SUBMIT", {
        detail: { msg },
        bubbles: true,
        composed: true
      }));
    });
  }
}

customElements.define("user-delete", UserDeleteView);
