// File: Server/src/main.js
import express from "express";
import cors from "cors";

import listRoutes from "./routes/lists.routes.js";
import userRoutes from "./routes/users.routes.js";
import sessionRoutes from "./routes/sessions.routes.js";

const app = express();
app.use(cors());
app.use(express.json());


app.use("/api", listRoutes);
app.use("/api", userRoutes);
app.use("/api", sessionRoutes);

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
