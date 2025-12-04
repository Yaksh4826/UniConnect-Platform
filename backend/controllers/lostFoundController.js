import LostFound from "../models/LostFound.js";
import Notification from "../models/Notification.js";

/* ============================================================
   HELPER: Automatic Matching Logic
   ============================================================ */
const findMatchesAndNotify = async (newItem) => {
  try {
    // If I lost something, look for "found" items.
    // If I found something, look for "lost" items.
    const targetType = newItem.type === "lost" ? "found" : "lost";

    // Find potential candidates
    const candidates = await LostFound.find({
      type: targetType,
      status: "available",
      // Exclude my own items
      createdBy: { $ne: newItem.createdBy },
    });

    for (const candidate of candidates) {
      let score = 0;

      // 1. Name Match (Fuzzy - Case Insensitive)
      const nameRegex = new RegExp(newItem.itemName.split(" ").join("|"), "i");
      if (nameRegex.test(candidate.itemName)) score += 40;

      // 2. Location Match (Fuzzy)
      if (
        candidate.location &&
        newItem.location &&
        candidate.location.toLowerCase().includes(newItem.location.toLowerCase())
      ) {
        score += 30;
      }

      // 3. Category Match
      if (candidate.category === newItem.category) score += 20;

      // 4. Date Proximity (within 7 days)
      const dayDiff = Math.abs(new Date(newItem.date) - new Date(candidate.date)) / (1000 * 60 * 60 * 24);
      if (dayDiff <= 7) score += 10;

      // MATCH FOUND
      if (score >= 50) {
        // Notify the owner of the CANDIDATE item that a NEW item matches theirs
        await Notification.create({
          user: candidate.createdBy,
          message: `Potential match found for your ${candidate.itemName}! Check the new ${newItem.type} item: "${newItem.itemName}".`,
          type: "match",
          relatedItem: newItem._id,
        });
        console.log(`Match found! Score: ${score}. Notified user ${candidate.createdBy}`);
      }
    }
  } catch (error) {
    console.error("Matching Error:", error);
  }
};

/* ============================================================
   CREATE Lost & Found Item
   POST /api/lostfound
   ============================================================ */
export const createLostItem = async (req, res) => {
  try {
    const payload = {
      ...req.body,
      createdBy: req.body.createdBy || req.user?.id || req.user?._id,
    };

    if (!payload.createdBy) {
      return res.status(400).json({ message: "createdBy is required" });
    }

    // Default logic for migration safety (if frontend sends old 'status' field)
    if (!payload.type) {
      // Try to infer from status if sent
      if (payload.status === "lost") payload.type = "lost";
      else if (payload.status === "found") payload.type = "found";
    }

    // Ensure status is valid for new schema
    payload.status = "available"; 

    const item = await LostFound.create(payload);

    // Trigger Matching Async
    findMatchesAndNotify(item);

    res.status(201).json(item);
  } catch (error) {
    console.error("Create LostFound Error:", error);
    res.status(400).json({ message: error.message });
  }
};

/* ============================================================
   GET ALL Lost & Found Items (Filtered)
   GET /api/lostfound?type=lost&search=keys&category=electronics
   ============================================================ */
export const getLostItems = async (req, res) => {
  try {
    const { type, search, category, location } = req.query;

    let query = {};

    // Filter by Type
    if (type) query.type = type;

    // Filter by Category
    if (category && category !== "all") query.category = category;

    // Search (Name or Description or Location)
    if (search) {
      const regex = new RegExp(search, "i");
      query.$or = [
        { itemName: regex },
        { description: regex },
        { location: regex },
      ];
    }
    
    // Strict Location Filter
    if (location) {
      query.location = new RegExp(location, "i");
    }

    const items = await LostFound.find(query)
      .populate("createdBy", "fullName email role")
      .sort({ createdAt: -1 });

    res.json(items);
  } catch (error) {
    console.error("Fetch Lost Items Error:", error);
    res.status(500).json({ message: error.message });
  }
};

/* ============================================================
   GET Lost & Found Item by ID
   ============================================================ */
export const getLostItemById = async (req, res) => {
  try {
    const item = await LostFound.findById(req.params.id)
      .populate("createdBy", "fullName email role");

    if (!item) return res.status(404).json({ message: "Item not found" });

    res.json(item);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/* ============================================================
   UPDATE Lost & Found Item
   ============================================================ */
export const updateLostItem = async (req, res) => {
  try {
    const item = await LostFound.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate("createdBy", "fullName email role");

    if (!item) return res.status(404).json({ message: "Item not found" });

    res.json(item);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/* ============================================================
   DELETE Lost & Found Item
   ============================================================ */
export const deleteLostItem = async (req, res) => {
  try {
    const item = await LostFound.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.json({ message: "Item deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/* ============================================================
   RESOLVE / CLAIM ITEM
   PUT /api/lostfound/:id/claim
   ============================================================ */
export const claimItem = async (req, res) => {
  try {
    const item = await LostFound.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });

    if (item.status !== "available") {
      return res.status(400).json({ message: "Item is already claimed or resolved" });
    }

    // Logic: Only owner or finder can mark resolved? 
    // For now, let's allow the logged-in user to "Claim" it if it's a Found item.
    // Or if it's their own Lost item, they mark it resolved.

    item.status = "claimed";
    await item.save();

    res.json({ message: "Item status updated to claimed", item });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
