import mongoose from "mongoose";

const scanLogSchema = new mongoose.Schema(
  {
    outpass: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Outpass",
      required: true,
    },
    scannedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: { type: String, enum: ["OUT", "IN", "DENIED"], required: true },
    note: { type: String, default: "" },
  },
  { timestamps: true },
);

export default mongoose.model("ScanLog", scanLogSchema);
