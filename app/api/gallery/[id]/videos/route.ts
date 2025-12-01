export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import mongoose from "mongoose";
import { requireAdmin } from "@/lib/auth";

const GallerySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    beforeMedia: [{ type: String, required: true }],
    afterMedia: [{ type: String, required: true }],
    videos: [
      new mongoose.Schema(
        {
          url: { type: String, required: true },
          title: { type: String, default: "" },
        },
        { _id: false }
      ),
    ],
  },
  { timestamps: true }
);

const Gallery = (mongoose.models.Gallery as mongoose.Model<any>) || mongoose.model("Gallery", GallerySchema);

// DELETE /api/gallery/:id/videos -> remove a video URL from item
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    requireAdmin(req);
    await dbConnect();
    const body = await req.json();
    const url = typeof body?.url === "string" ? body.url : "";
    if (!url) return NextResponse.json({ message: "url required" }, { status: 400 });

    const doc = await Gallery.findById(params.id);
    if (!doc) return NextResponse.json({ message: "Not found" }, { status: 404 });
    doc.videos = (doc.videos || []).filter((v: any) => v.url !== url);
    await doc.save();
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ message: e.message ?? "Unauthorized" }, { status: 401 });
  }
}
