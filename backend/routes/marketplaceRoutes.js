import express from "express";
import {
  createItem,
  getItems,
  getItemById,
  updateItem,
  deleteItem,
  getItemsByUser // ✅ NEW CONTROLLER
} from "../controllers/marketplaceController.js";

const router = express.Router();

/* ============================================================
   📌 Create Marketplace Item
   POST /api/marketplace
   ============================================================ */
router.post("/", createItem);

/* ============================================================
   📌 Get ALL Marketplace Items
   GET /api/marketplace
   ============================================================ */
router.get("/", getItems);

/* ============================================================
   📌 Get ALL items posted BY a specific user   <-- NEW
   GET /api/marketplace/user/:id
   Used in: Student Dashboard → My Marketplace Posts
   ============================================================ */
router.get("/user/:id", getItemsByUser); // ⭐ ADDED

/* ============================================================
   📌 Get Single Marketplace Item by ID
   GET /api/marketplace/:id
   ============================================================ */
router.get("/:id", getItemById);

/* ============================================================
   📌 Update Marketplace Item
   PUT /api/marketplace/:id
   ============================================================ */
router.put("/:id", updateItem);

/* ============================================================
   📌 Delete Marketplace Item
   DELETE /api/marketplace/:id
   ============================================================ */
router.delete("/:id", deleteItem);

export default router;
