import LostFound from "../models/LostFound.js";

/* ============================================================
   CREATE Lost & Found Item
   POST /api/lostfound
   ============================================================ */
export const createLostItem = async (req, res) => {
  try {
    // ⭐ Safer backend-side enforcement of createdBy
    const payload = {
      ...req.body,
      createdBy:
        req.body.createdBy || req.user?.id || req.user?._id,
    };

    if (!payload.createdBy) {
      return res.status(400).json({ message: "createdBy is required" });
    }

    const item = await LostFound.create(payload);

    res.status(201).json(item);
  } catch (error) {
    console.error("Create LostFound Error:", error);
    res.status(400).json({ message: error.message });
  }
};

/* ============================================================
   GET ALL Lost & Found Items
   GET /api/lostfound
   ============================================================ */
export const getLostItems = async (req, res) => {
  try {
    const items = await LostFound.find()
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
   GET /api/lostfound/:id
   ============================================================ */
export const getLostItemById = async (req, res) => {
  try {
    const item = await LostFound.findById(req.params.id)
      .populate("createdBy", "fullName email role");

    if (!item)
      return res.status(404).json({ message: "Item not found" });

    res.json(item);
  } catch (error) {
    console.error("Get Item by ID Error:", error);
    res.status(400).json({ message: error.message });
  }
};

/* ============================================================
   UPDATE Lost & Found Item
   PUT /api/lostfound/:id
   ============================================================ */
export const updateLostItem = async (req, res) => {
  try {
    const item = await LostFound.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate("createdBy", "fullName email role");

    if (!item)
      return res.status(404).json({ message: "Item not found" });

    res.json(item);
  } catch (error) {
    console.error("Update Lost Item Error:", error);
    res.status(400).json({ message: error.message });
  }
};

/* ============================================================
   DELETE Lost & Found Item
   DELETE /api/lostfound/:id
   ============================================================ */
export const deleteLostItem = async (req, res) => {
  try {
    const item = await LostFound.findByIdAndDelete(req.params.id);

    if (!item)
      return res.status(404).json({ message: "Item not found" });

    res.json({ message: "Item deleted" });
  } catch (error) {
    console.error("Delete Lost Item Error:", error);
    res.status(400).json({ message: error.message });
  }
};
