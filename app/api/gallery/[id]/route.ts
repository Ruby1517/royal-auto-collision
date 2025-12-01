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

// GET /api/gallery/:id -> public
export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();
  try {
    const doc = await Gallery.findById(params.id);
    if (!doc) return NextResponse.json({ message: "Not found" }, { status: 404 });
    return NextResponse.json(doc);
  } catch {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }
}

// PUT /api/gallery/:id -> admin
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    requireAdmin(req);
    await dbConnect();
    const body = await req.json();
    const updates: any = {};
    if (typeof body?.title === "string") updates.title = body.title;
    if (typeof body?.description === "string") updates.description = body.description;
    if (Array.isArray(body?.beforeMedia)) updates.beforeMedia = body.beforeMedia.filter((s: any) => typeof s === "string" && s.length > 0);
    if (Array.isArray(body?.afterMedia)) updates.afterMedia = body.afterMedia.filter((s: any) => typeof s === "string" && s.length > 0);
    if (Array.isArray(body?.videos)) {
      updates.videos = body.videos
        .filter((v: any) => v && typeof v.url === "string" && v.url.length > 0)
        .map((v: any) => ({ url: v.url, title: typeof v.title === "string" ? v.title : "" }));
    }
    const doc = await Gallery.findByIdAndUpdate(params.id, updates, { new: true });
    if (!doc) return NextResponse.json({ message: "Not found" }, { status: 404 });
    return NextResponse.json(doc);
  } catch (e: any) {
    return NextResponse.json({ message: e.message ?? "Unauthorized" }, { status: 401 });
  }
}

// DELETE /api/gallery/:id -> admin
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    requireAdmin(req);
    await dbConnect();
    const deleted = await Gallery.findByIdAndDelete(params.id);
    if (!deleted) return NextResponse.json({ message: "Not found" }, { status: 404 });
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ message: e.message ?? "Unauthorized" }, { status: 401 });
  }
}
