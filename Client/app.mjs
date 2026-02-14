// File: Client/app.mjs
import "./views/UserCreate_View.mjs";
import "./views/UserEdit_View.mjs";
import "./views/UserDelete_View.mjs";

document.getElementById("app").innerHTML = `
  <h1>Shared Shopping List App</h1>
  <user-create></user-create>
  <user-edit></user-edit>
  <user-delete></user-delete>
`;
