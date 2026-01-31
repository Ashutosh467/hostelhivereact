import mongoose from "mongoose";

const outpassSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    reason: { type: String, required: true },
    destination: { type: String, required: true },

    fromTime: { type: Date, required: true },
    toTime: { type: Date, required: true },

    status: {
      type: String,
      enum: ["PENDING", "APPROVED", "REJECTED", "OUT", "IN", "EXPIRED"],
      default: "PENDING",
    },

    approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    qrToken: { type: String, default: "" },

    // ✅ NEW: QR IMAGE store (base64)
    qrImage: { type: String, default: "" },

    scanCountAllowed: { type: Number, default: 2 },
    scanCountUsed: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export default mongoose.model("Outpass", outpassSchema);
