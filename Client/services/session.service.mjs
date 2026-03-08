// File: client/services/session.service.mjs
import { http } from "../modules/http.mjs";

export const SessionService = {
    login(email, password) {
        return http.post("/api/sessions", { email, password });
    }
};
