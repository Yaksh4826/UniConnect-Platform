import MarketplaceItem from "../models/MarketplaceItem.js";

/* ============================================================
   CREATE Marketplace Item
   POST /api/marketplace
   ============================================================ */
export const createItem = async (req, res) => {
  try {
    const item = await MarketplaceItem.create(req.body);
    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/* ============================================================
   GET ALL Marketplace Items
   GET /api/marketplace
   ============================================================ */
export const getItems = async (req, res) => {
  try {
    const items = await MarketplaceItem.find()
      .populate("postedBy", "fullName email role")
      .sort({ createdAt: -1 });

    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ============================================================
   GET Marketplace Items BY USER    <-- NEW
   GET /api/marketplace/user/:id
   Used in Student Dashboard → My Marketplace Posts
   ============================================================ */
export const getItemsByUser = async (req, res) => {
  try {
    const items = await MarketplaceItem.find({ postedBy: req.params.id })
      .populate("postedBy", "fullName email role")
      .sort({ createdAt: -1 });

    res.json(items);
  } catch (error) {
    console.error("Error fetching user's marketplace items:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ============================================================
   GET Marketplace Item by ID
   GET /api/marketplace/:id
   ============================================================ */
export const getItemById = async (req, res) => {
  try {
    const item = await MarketplaceItem.findById(req.params.id)
      .populate("postedBy", "fullName email role");

    if (!item) return res.status(404).json({ message: "Item not found" });
    res.json(item);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/* ============================================================
   UPDATE Marketplace Item
   PUT /api/marketplace/:id
   ============================================================ */
export const updateItem = async (req, res) => {
  try {
    const item = await MarketplaceItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate("postedBy", "fullName email role");

    if (!item) return res.status(404).json({ message: "Item not found" });

    res.json(item);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/* ============================================================
   DELETE Marketplace Item
   DELETE /api/marketplace/:id
   ============================================================ */
export const deleteItem = async (req, res) => {
  try {
    const item = await MarketplaceItem.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });

    res.json({ message: "Item deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
