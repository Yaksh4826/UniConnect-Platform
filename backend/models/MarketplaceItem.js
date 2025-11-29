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
    seller: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("MarketplaceItem", marketplaceItemSchema);
