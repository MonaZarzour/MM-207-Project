// File: client/views/share-list.view.mjs
import { ListService } from "../services/list.service.mjs";
import { t } from "../utils/i18n.mjs";

export class ShareListView extends HTMLElement {
  static get observedAttributes() {
    return ['list-id'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'list-id' && newValue) {
      this.listId = newValue;
      this.render();
    }
  }

  async render() {
    if (!this.listId) return;

    // Fetch existing members
    let members = [];
    try {
      const res = await ListService.getMembers(this.listId);
      members = res.data || [];
    } catch (e) {
      console.error(e);
    }

    const membersHtml = members.map(m => `
      <div class="member-row row" style="justify-content: space-between; padding: 0.75rem 0; border-bottom: 1px solid var(--surface-border);">
        <div>
          <strong>${m.email}</strong>
          ${m.display_name ? `<span class="muted"> (${m.display_name})</span>` : ''}
        </div>
        <div class="row" style="gap: 0.5rem;">
          <select class="role-select" data-user-id="${m.user_id}" aria-label="${t("role")}" style="padding: 0.4rem; border-radius: 6px;">
            <option value="admin" ${m.role === 'admin' ? 'selected' : ''}>${t("admin")}</option>
            <option value="editor" ${m.role === 'editor' ? 'selected' : ''}>${t("editor")}</option>
            <option value="viewer" ${m.role === 'viewer' ? 'selected' : ''}>${t("viewer")}</option>
          </select>
          <button class="remove-btn danger" data-user-id="${m.user_id}" aria-label="${t("removeMember")}" style="padding: 0.4rem 0.8rem; margin: 0; font-size: 0.85rem;">✕</button>
        </div>
      </div>
    `).join("");

    this.innerHTML = `
      <section class="card">
        <button id="back-btn" class="text-btn">&larr; ${t("backToLists")}</button>
        <h2>${t("manageList")}</h2>
        
        <form id="invite-form">
          <label>${t("emailToInvite")}
            <input name="email" type="email" required />
          </label>
          
          <label>${t("role")}
            <select name="role">
              <option value="viewer">${t("viewer")}</option>
              <option value="editor">${t("editor")}</option>
              <option value="admin">${t("admin")}</option>
            </select>
          </label>
          
          <button type="submit">${t("invite")}</button>
        </form>

        <p id="share-msg" class="muted" aria-live="polite" aria-atomic="true"></p>

        ${members.length > 0 ? `
          <h3 style="margin-top: 2rem;">${t("members")}</h3>
          <div id="members-list">${membersHtml}</div>
        ` : ''}
      </section>
    `;

    // Back button
    this.querySelector("#back-btn").addEventListener("click", () => {
      this.dispatchEvent(new CustomEvent("BACK_TO_ITEMS", { bubbles: true, composed: true }));
    });

    // Invite form
    this.querySelector("#invite-form").addEventListener("submit", async (e) => {
      e.preventDefault();
      const msg = this.querySelector("#share-msg");
      msg.textContent = "...";

      try {
        await ListService.inviteMember(this.listId, e.target.email.value, e.target.role.value);
        msg.textContent = "";
        e.target.reset();
        this.render(); // re-render to show the new member
      } catch (err) {
        msg.textContent = err.message;
      }
    });

    // Role change dropdowns
    this.querySelectorAll(".role-select").forEach(select => {
      select.addEventListener("change", async (e) => {
        const userId = e.target.getAttribute("data-user-id");
        const newRole = e.target.value;
        try {
          await ListService.updateMemberRole(this.listId, userId, newRole);
        } catch (err) {
          alert(err.message);
          this.render(); // revert visual
        }
      });
    });

    // Remove buttons
    this.querySelectorAll(".remove-btn").forEach(btn => {
      btn.addEventListener("click", async () => {
        const userId = btn.getAttribute("data-user-id");
        if (!confirm(t("removeMember"))) return;
        try {
          await ListService.removeMember(this.listId, userId);
          this.render(); // re-render
        } catch (err) {
          alert(err.message);
        }
      });
    });
  }
}

customElements.define("share-list", ShareListView);
