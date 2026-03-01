import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import listRoutes from "./routes/lists.route.js";
import userRoutes from "./routes/users.route.js";
import sessionRoutes from "./routes/sessions.route.js";
import { initDb } from "./db/index.js";

const app = express();
app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve Client folder
app.use(express.static(path.join(__dirname, "../../client")));

app.use("/api", userRoutes);
app.use("/api", sessionRoutes);
app.use("/api/lists", listRoutes);

app.get("/api/health", (req, res) =>
  res.json({ ok: true, message: "API is running" }),
);

const PORT = process.env.PORT || 3000;

// Initialize db before starting the server
initDb()
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error("Failed to initialize database:", err);
    process.exit(1);
  });
