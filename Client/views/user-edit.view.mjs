// File: client/views/user-edit.view.mjs

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
