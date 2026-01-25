import express from "express";
import cors from "cors";
import listsRoutes from "./routes/lists.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ ok: true, message: "API is running" });
});

// Mount lists router
app.use("/api/lists", listsRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
