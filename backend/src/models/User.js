import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    userId: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    role: {
      type: String,
      required: true,
      enum: [
        "STUDENT",
        "GUARD",
        "WARDEN",
        "HEAD",
        "MESS",
        "GYM",
        "MAINTENANCE",
        "HOSPITAL",
        "ADMIN",
      ],
    },

    hostel: { type: String, default: "A" },
    floor: { type: Number, default: 1 },

    parentPhone: { type: String, default: "" },
    parentEmail: { type: String, default: "" },

    bloodGroup: { type: String, default: "" },
    height: { type: String, default: "" },
    weight: { type: String, default: "" },
  },
  { timestamps: true },
);

export default mongoose.model("User", userSchema);
