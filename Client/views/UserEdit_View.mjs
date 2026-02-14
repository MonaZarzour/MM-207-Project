// File: Client/views/UserEdit_View.mjs
import { userController } from "../controllers/userController.mjs";

export class UserEditView extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <section class="card">
        <h2>Edit User (me)</h2>

        <form id="form">
          <label>Display Name
            <input name="displayName" required />
          </label>

          <button type="submit">Update</button>
        </form>

        <p id="msg" class="muted"></p>
      </section>
    `;

    const form = this.querySelector("#form");
    const msg = this.querySelector("#msg");

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      msg.textContent = "Updating...";

      const fd = new FormData(form);

      try {
        const result = await userController.editMe({
          displayName: String(fd.get("displayName")),
        });
        msg.textContent = `Updated displayName: ${result.user?.displayName ?? "OK"}`;
      } catch (err) {
        msg.textContent = `Error: ${err.message}`;
      }
    });
  }
}

customElements.define("user-edit", UserEditView);
