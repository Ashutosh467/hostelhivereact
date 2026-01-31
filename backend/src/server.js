import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

import authRoutes from "./routes/auth.routes.js";
import outpassRoutes from "./routes/outpass.routes.js";

dotenv.config();

const app = express();

/* 🔥 FIXED CORS (ALL DEVICES) */
app.use(
  cors({
    origin: "https://superlative-brioche-835217.netlify.app",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);

/* 🔥 VERY IMPORTANT: handle preflight */
app.options("*", cors());

app.use(express.json());

app.get("/", (req, res) => res.send("HostelHive Backend Running ✅"));

app.use("/api/auth", authRoutes);
app.use("/api/outpass", outpassRoutes);

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
});
