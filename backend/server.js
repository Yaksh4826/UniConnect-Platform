import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import { Server as SocketIOServer } from "socket.io";
import { connectDB } from "./config/db.js";

// ROUTES IMPORT
import eventRoutes from "./routes/eventRoutes.js";
import lostFoundRoutes from "./routes/lostFoundRoutes.js";
import marketplaceRoutes from "./routes/marketplaceRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";

dotenv.config();
const app = express();
const server = http.createServer(app);

// Middlewares
app.use(cors());
app.use(express.json());

// ROOT & HEALTH ROUTES
app.get("/", (req, res) => {
  res.send("API is running ✅");
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Server and DB are healthy ✅",
    time: new Date()
  });
});

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
app.use("/api/admin", adminRoutes);
app.use("/api/notifications", notificationRoutes);

// SOCKET.IO SETUP
const io = new SocketIOServer(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Track online users by userId -> socketId
const onlineUsers = new Map();

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  if (userId) {
    onlineUsers.set(userId, socket.id);
  }

  // Receive buy request and forward to seller
  socket.on("buy_request", ({ sellerId, itemTitle, buyerName }) => {
    const targetSocket = onlineUsers.get(sellerId);
    if (targetSocket) {
      io.to(targetSocket).emit("buy_notification", {
        itemTitle,
        buyerName,
      });
    }
  });

  // Simple chat relay: forward messages to a specific user if online
  socket.on("chat_message", ({ toUserId, message, fromName }) => {
    const targetSocket = onlineUsers.get(toUserId);
    if (targetSocket) {
      io.to(targetSocket).emit("chat_message", {
        message,
        fromName: fromName || "User",
        fromUserId: userId,
      });
    }
  });

  socket.on("disconnect", () => {
    if (userId) {
      onlineUsers.delete(userId);
    }
  });
});

const PORT = process.env.PORT || 5000;

// Connect database THEN start server
connectDB().then(() => {
  server.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
});
