// File: Client/data/userModel.mjs
import { http } from "../modules/http.mjs";
import { authStore } from "./authStore.mjs";

const USERS = "/api/users";
const ME = "/api/users/me";

export const UserModel = {
  async create({ email, password, acceptTos }) {
    const result = await http.post(USERS, { email, password, acceptTos });

    // Expect { user: {...}, token: "..." }
    if (result?.token) authStore.setToken(result.token);

    return result;
  },

  // Edit current user
  updateMe({ displayName }) {
    return http.put(ME, { displayName });
  },

  // Delete current user account
  deleteAccount() {
    return http.del(ME);
  },
};
