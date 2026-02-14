import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import listRoutes from "./routes/lists.routes.js";
import userRoutes from "./routes/users.routes.js";
import sessionRoutes from "./routes/sessions.routes.js";

const app = express();
app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve Client folder
app.use(express.static(path.join(__dirname, "../../Client")));

app.use("/api", userRoutes);
app.use("/api", sessionRoutes);
app.use("/api/lists", listRoutes);

app.get("/api/health", (req, res) =>
  res.json({ ok: true, message: "API is running" }),
);

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
