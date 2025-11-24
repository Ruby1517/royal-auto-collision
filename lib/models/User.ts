import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["admin", "user"], default: "user" },
  },
  { timestamps: true }
);

// Always reuse existing model if it was compiled already
export const User =
  (mongoose.models.User as mongoose.Model<any>) ||
  mongoose.model("User", UserSchema);

