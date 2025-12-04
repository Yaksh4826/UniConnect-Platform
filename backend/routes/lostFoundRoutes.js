import express from "express";
import {
  createLostItem,
  getLostItems,
  getLostItemById,
  updateLostItem,
  deleteLostItem,
  claimItem
} from "../controllers/lostFoundController.js";

const router = express.Router();

/* ============================================================
   LOST & FOUND ROUTES
   ============================================================ */

/**
 * @route   POST /api/lostfound
 * @desc    Create new Lost & Found item
 */
router.post("/", createLostItem);

/**
 * @route   GET /api/lostfound
 * @desc    Get all Lost & Found items (Filtered)
 */
router.get("/", getLostItems);

/**
 * @route   GET /api/lostfound/:id
 * @desc    Get single Lost & Found item by ID
 */
router.get("/:id", getLostItemById);

/**
 * @route   PUT /api/lostfound/:id
 * @desc    Update Lost & Found item
 */
router.put("/:id", updateLostItem);

/**
 * @route   PUT /api/lostfound/:id/claim
 * @desc    Mark item as claimed/resolved
 */
router.put("/:id/claim", claimItem);

/**
 * @route   DELETE /api/lostfound/:id
 * @desc    Delete Lost & Found item
 */
router.delete("/:id", deleteLostItem);

export default router;
