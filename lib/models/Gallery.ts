import mongoose from "mongoose";

const GallerySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  beforeMedia: [{ type: String, required: true }], // image/video URLs
  afterMedia:  [{ type: String, required: true }],
}, { timestamps: true });

export const Gallery = (mongoose.models.Gallery as mongoose.Model<any>) || mongoose.model("Gallery", GallerySchema)
