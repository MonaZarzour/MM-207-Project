// File: Client/views/UserDelete_View.mjs
import { userController } from "../controllers/userController.mjs";

export class UserDeleteView extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <section class="card">
        <h2>Delete Account (me)</h2>

        <button id="btn" class="danger">Delete my account</button>
        <p id="msg" class="muted"></p>
      </section>
    `;

    const btn = this.querySelector("#btn");
    const msg = this.querySelector("#msg");

    btn.addEventListener("click", async () => {
      msg.textContent = "Deleting...";

      try {
        await userController.deleteAccount();
        msg.textContent = "Deleted account: OK";
      } catch (err) {
        msg.textContent = `Error: ${err.message}`;
      }
    });
  }
}

customElements.define("user-delete", UserDeleteView);
