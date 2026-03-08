import { t } from "../utils/i18n.mjs";

export class LoginView extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
      <section class="card">
        <h2>${t("logIn")}</h2>

        <form id="form">
          <label>${t("email")}
            <input name="email" type="email" required />
          </label>

          <label>${t("password")}
            <input name="password" type="password" required />
          </label>

          <button type="submit">${t("logIn")}</button>
        </form>

        <p id="msg" class="muted" aria-live="polite" aria-atomic="true"></p>
        <div style="margin-top: 1rem;">
          <button id="switch-to-signup" class="text-btn">${t("switchToSignup")}</button>
        </div>
      </section>
    `;

        const form = this.querySelector("#form");
        const msg = this.querySelector("#msg");
        const switchBtn = this.querySelector("#switch-to-signup");

        form.addEventListener("submit", async (e) => {
            e.preventDefault();
            msg.textContent = t("loggingIn");

            const fd = new FormData(form);
            const payload = {
                email: String(fd.get("email")),
                password: String(fd.get("password")),
            };

            this.dispatchEvent(new CustomEvent("LOGIN_SUBMIT", {
                detail: { payload, form, msg },
                bubbles: true,
                composed: true
            }));
        });

        switchBtn.addEventListener("click", () => {
            this.dispatchEvent(new CustomEvent("SWITCH_TO_SIGNUP", {
                bubbles: true,
                composed: true
            }));
        });
    }
}

customElements.define("login-view", LoginView);
