// File: client/views/user-edit.view.mjs

import { t } from "../utils/i18n.mjs";

export class UserEditView extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <section class="card">
        <h2>${t("editUser")}</h2>

        <form id="form">
          <label>${t("displayName")}
            <input name="displayName" required />
          </label>

          <button type="submit">${t("updateBtn")}</button>
        </form>

        <p id="msg" class="muted" aria-live="polite" aria-atomic="true"></p>
      </section>
    `;

    const form = this.querySelector("#form");
    const msg = this.querySelector("#msg");

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      msg.textContent = t("updating");

      const fd = new FormData(form);
      const payload = {
        displayName: String(fd.get("displayName")),
      };

      this.dispatchEvent(new CustomEvent("USER_EDIT_SUBMIT", {
        detail: { payload, msg },
        bubbles: true,
        composed: true
      }));
    });
  }
}

customElements.define("user-edit", UserEditView);
