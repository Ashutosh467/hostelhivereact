import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

import authRoutes from "./routes/auth.routes.js";
import outpassRoutes from "./routes/outpass.routes.js";

dotenv.config();

const app = express();

/* ✅ SIMPLE & SAFE CORS (NO DEVICE ISSUE) */
app.use(
  cors({
    origin: "https://superlative-brioche-835217.netlify.app",
    credentials: true,
  }),
);

app.use(express.json());

/* ✅ ROOT CHECK */
app.get("/", (req, res) => {
  res.send("HostelHive Backend Running ✅");
});

/* ✅ API ROOT (VERY IMPORTANT FOR NETLIFY PROXY) */
app.get("/api", (req, res) => {
  res.send("API OK ✅");
});

/* ✅ REAL ROUTES */
app.use("/api/auth", authRoutes);
app.use("/api/outpass", outpassRoutes);

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
});
