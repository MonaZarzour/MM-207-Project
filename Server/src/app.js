//--------------server/src/main.js--------------

import express from "express";
import listRoutes from "./routes/lists.routes.js";

const app = express();
app.use(express.json());

// Example auth placeholder (replace later)
app.use((req, _res, next) => {
  req.user = { id: "demo-user-1" };
  next();
});

app.use("/api", listRoutes);

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
