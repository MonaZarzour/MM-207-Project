// File: client/views/user-create.view.mjs

import { t } from "../utils/i18n.mjs";

export class UserCreateView extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <section class="card">
        <h2>${t("createUser")}</h2>

        <form id="form">
          <label>${t("email")}
            <input name="email" type="email" required />
          </label>

          <label>${t("password")}
            <input name="password" type="password" required />
          </label>

          <label class="row">
            <input name="acceptTos" type="checkbox" required />
            <span>${t("acceptTosPre")}<a href="/terms-of-service.html" target="_blank">${t("acceptTosLink")}</a></span>
          </label>

          <button type="submit">${t("createBtn")}</button>
        </form>

        <p id="msg" class="muted" aria-live="polite" aria-atomic="true"></p>
        <div style="margin-top: 1rem;">
          <button id="switch-to-login" class="text-btn">${t("switchToLogin")}</button>
        </div>
      </section>
    `;

    const form = this.querySelector("#form");
    const msg = this.querySelector("#msg");
    const switchBtn = this.querySelector("#switch-to-login");

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      msg.textContent = t("creating");

      const fd = new FormData(form);
      const payload = {
        email: String(fd.get("email")),
        password: String(fd.get("password")),
        acceptTos: fd.get("acceptTos") === "on",
      };

      this.dispatchEvent(new CustomEvent("USER_CREATE_SUBMIT", {
        detail: { payload, form, msg },
        bubbles: true,
        composed: true
      }));
    });

    switchBtn.addEventListener("click", () => {
      this.dispatchEvent(new CustomEvent("SWITCH_TO_LOGIN", {
        bubbles: true,
        composed: true
      }));
    });
  }
}

customElements.define("user-create", UserCreateView);
