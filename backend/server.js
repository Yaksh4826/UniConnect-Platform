import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

// ROUTES IMPORT
import eventRoutes from "./routes/eventRoutes.js";
import lostFoundRoutes from "./routes/lostFoundRoutes.js";
import marketplaceRoutes from "./routes/marketplaceRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Test route
app.get("/api/test", (req, res) => {
  res.json({
    message: "Backend working! 🔥",
    time: new Date()
  });
});

// ROUTE MOUNTING
app.use("/api/events", eventRoutes);
app.use("/api/lostfound", lostFoundRoutes);
app.use("/api/marketplace", marketplaceRoutes);
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000;

// Connect database THEN start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
});
