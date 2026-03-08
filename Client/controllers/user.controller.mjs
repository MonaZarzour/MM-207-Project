// File: client/controllers/user.controller.mjs
import { UserService } from "../services/user.service.mjs";
import { SessionService } from "../services/session.service.mjs";
import { authStore } from "../data/authStore.mjs";

class UserController {
  constructor() {
    this.initListeners();
  }

  initListeners() {
    document.addEventListener("LOGIN_SUBMIT", async (e) => {
      const { payload, form, msg } = e.detail;
      try {
        const result = await SessionService.login(payload.email, payload.password);
        if (result?.token) {
          authStore.setToken(result.token);
          form.reset();
          document.dispatchEvent(new CustomEvent("AUTH_STATE_CHANGED"));
        }
      } catch (err) {
        msg.textContent = err.message;
      }
    });

    document.addEventListener("USER_CREATE_SUBMIT", async (e) => {
      const { payload, form, msg } = e.detail;
      try {
        const result = await UserService.create(payload);
        if (result?.token) {
          authStore.setToken(result.token);
          form.reset();
          document.dispatchEvent(new CustomEvent("AUTH_STATE_CHANGED"));
        } else {
          msg.textContent = `Created user: ${result.user?.email ?? "OK"}`;
        }
      } catch (err) {
        msg.textContent = `Error: ${err.message}`;
      }
    });

    document.addEventListener("USER_EDIT_SUBMIT", async (e) => {
      const { payload, msg } = e.detail;
      try {
        const result = await UserService.updateMe(payload);
        msg.textContent = `Updated displayName: ${result.user?.displayName ?? "OK"}`;
      } catch (err) {
        msg.textContent = `Error: ${err.message}`;
      }
    });

    document.addEventListener("USER_DELETE_SUBMIT", async (e) => {
      const { msg } = e.detail;
      try {
        await UserService.deleteAccount();
        authStore.clearToken();
        document.dispatchEvent(new CustomEvent("AUTH_STATE_CHANGED"));
      } catch (err) {
        msg.textContent = `Error: ${err.message}`;
      }
    });
  }
}

export const userController = new UserController();
