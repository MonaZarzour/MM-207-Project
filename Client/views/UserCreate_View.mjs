// File: Client/views/UserCreate_View.mjs
import { userController } from "../controllers/userController.mjs";

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
            I accept the Terms of Service
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

      try {
        const created = await userController.createUser({
          email: String(fd.get("email")),
          password: String(fd.get("password")),
          acceptTos: fd.get("acceptTos") === "on",
        });

        msg.textContent = `Created user: ${created.user?.email ?? created.user?.id ?? "OK"}`;
        form.reset();
      } catch (err) {
        msg.textContent = `Error: ${err.message}`;
      }
    });
  }
}

customElements.define("user-create", UserCreateView);
