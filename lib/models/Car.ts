import mongoose from "mongoose";

const CarSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: String, default: "" },
    mileage: { type: String, default: "" },
    drivetrain: { type: String, default: "" },
    color: { type: String, default: "" },
    vin: { type: String, default: "" },
    location: { type: String, default: "" },
    description: { type: String, default: "" },
    highlights: [{ type: String }],
    photos: [{ type: String, required: true }],
  },
  { timestamps: true }
);

export const Car = (mongoose.models.Car as mongoose.Model<any>) || mongoose.model("Car", CarSchema);
