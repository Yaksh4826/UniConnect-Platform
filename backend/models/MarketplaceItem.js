import mongoose from "mongoose";

const marketplaceItemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    image: {
      type: String, // image URL (optional)
      default: "",
    },

    /* -------------------------------------------------------
       OLD FIELD (Keep it — used before)
    ------------------------------------------------------- */
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },

    /* -------------------------------------------------------
       NEW FIELD (Required by your controllers)
       The backend expects "postedBy" in:
       - getItems()
       - getItemsByUser()
       - updateItem()
       - getItemById()
    ------------------------------------------------------- */
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false, // keep optional to avoid breaking existing items
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("MarketplaceItem", marketplaceItemSchema);
