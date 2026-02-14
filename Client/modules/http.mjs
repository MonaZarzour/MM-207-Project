// File: Client/modules/http.mjs
import { request } from "./fetchManager.mjs";

export const http = {
  post: (url, data) =>
    request(url, { method: "POST", body: JSON.stringify(data) }),
  put: (url, data) =>
    request(url, { method: "PUT", body: JSON.stringify(data) }),
  del: (url) => request(url, { method: "DELETE" }),
};
