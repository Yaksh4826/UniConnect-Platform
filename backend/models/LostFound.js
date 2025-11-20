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
    status: {
      type: String,
      enum: ["lost", "found", "claimed"],
      default: "lost",
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
