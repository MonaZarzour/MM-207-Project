// File: Client/data/authStore.mjs
let token = null;

export const authStore = {
  getToken: () => token,
  setToken: (t) => {
    token = t;
  },
  clearToken: () => {
    token = null;
  },
};
