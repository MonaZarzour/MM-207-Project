// File: client/app.mjs
import "./views/user-create.view.mjs";
import "./views/user-edit.view.mjs";
import "./views/user-delete.view.mjs";
import "./controllers/user.controller.mjs";

document.getElementById("app").innerHTML = `
  <h1>Shared Shopping List App</h1>
  <user-create></user-create>
  <user-edit></user-edit>
  <user-delete></user-delete>
`;
