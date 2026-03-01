// File: client/views/user-delete.view.mjs

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

      this.dispatchEvent(new CustomEvent("USER_DELETE_SUBMIT", {
        detail: { msg },
        bubbles: true,
        composed: true
      }));
    });
  }
}

customElements.define("user-delete", UserDeleteView);
