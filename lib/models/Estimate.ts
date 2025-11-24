import mongoose from "mongoose";

const EstimateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  vehicle: { type: String, required: true },
  damage: { type: String, required: true },
  imageUrls: [{ type: String }],
  status: { type: String, enum: ["pending", "completed"], default: "pending" },
}, { timestamps: true });

export const Estimate = (mongoose.models.Estimate as mongoose.Model<any>) || mongoose.model("Estimate", EstimateSchema);
