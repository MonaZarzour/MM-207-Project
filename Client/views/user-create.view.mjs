// File: client/views/user-create.view.mjs

export class UserCreateView extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <section class="card">
        <h2>Create User</h2>

        <form id="form">
          <label>Email
            <input name="email" type="email" required />
          </label>

          <label>Password
            <input name="password" type="password" required />
          </label>

          <label class="row">
            <input name="acceptTos" type="checkbox" required />
            <span>I accept the <a href="/terms-of-service.html" target="_blank">Terms of Service</a></span>
          </label>

          <button type="submit">Create</button>
        </form>

        <p id="msg" class="muted"></p>
      </section>
    `;

    const form = this.querySelector("#form");
    const msg = this.querySelector("#msg");

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      msg.textContent = "Creating...";

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
  }
}

customElements.define("user-create", UserCreateView);
