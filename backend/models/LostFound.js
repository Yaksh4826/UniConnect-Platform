// backend/models/LostFound.js
import mongoose from "mongoose";

const lostFoundSchema = new mongoose.Schema(
  {
    itemName: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    // New: Photo Upload (URL)
    image: {
      type: String,
      default: "",
    },
    // New: Category
    category: {
      type: String,
      enum: ["electronics", "clothing", "keys", "wallet", "books", "other"],
      default: "other",
    },
    // New: Contact Info
    contactInfo: {
      type: String,
      required: false,
    },
    // Refactored: Type is Lost vs Found
    type: {
      type: String,
      enum: ["lost", "found"],
      required: true,
      default: "lost",
    },
    // Refactored: Status is the workflow state
    status: {
      type: String,
      enum: ["available", "claimed", "resolved"],
      default: "available",
    },
    location: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const LostFound = mongoose.model("LostFound", lostFoundSchema);
export default LostFound;
