import express from "express";
import {
  createLostItem,
  getLostItems,
  getLostItemById,
  updateLostItem,
  deleteLostItem
} from "../controllers/lostFoundController.js";

const router = express.Router();

router.post("/", createLostItem);
router.get("/", getLostItems);
router.get("/:id", getLostItemById);
router.put("/:id", updateLostItem);
router.delete("/:id", deleteLostItem);

export default router;
