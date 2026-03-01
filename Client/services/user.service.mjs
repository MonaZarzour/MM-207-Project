// File: client/services/user.service.mjs
import { http } from "../modules/http.mjs";

const USERS = "/api/users";
const ME = "/api/users/me";

export const UserService = {
    create({ email, password, acceptTos }) {
        return http.post(USERS, { email, password, acceptTos });
    },

    updateMe({ displayName }) {
        return http.put(ME, { displayName });
    },

    deleteAccount() {
        return http.del(ME);
    },
};
