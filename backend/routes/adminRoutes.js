import express from "express";
import User from "../models/User.js";
import Event from "../models/Event.js";
import MarketplaceItem from "../models/MarketplaceItem.js";
import LostFound from "../models/LostFound.js";

const router = express.Router();

// =============================================================
// GET ADMIN OVERVIEW STATS
// =============================================================
router.get("/overview", async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    const eventCount = await Event.countDocuments();
    const marketplaceCount = await MarketplaceItem.countDocuments();
    const lostFoundCount = await LostFound.countDocuments();

    res.json({
      users: userCount,
      events: eventCount,
      marketplace: marketplaceCount,
      lostfound: lostFoundCount,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching admin stats", error: error.message });
  }
});

export default router;

