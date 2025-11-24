// app/api/gallery/route.ts
export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import { requireAdmin } from "@/lib/auth";
import mongoose from "mongoose";

const GallerySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    beforeMedia: [{ type: String, required: true }],
    afterMedia: [{ type: String, required: true }],
    // Optional videos attached to this item
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

// Reuse model across hot reloads
const Gallery =
  (mongoose.models.Gallery as mongoose.Model<any>) ||
  mongoose.model("Gallery", GallerySchema);

// GET /api/gallery  -> public list
export async function GET(req: NextRequest) {
  await dbConnect();
  const url = req.nextUrl;
  const limitParam = url.searchParams.get("limit");
  const limit = limitParam ? parseInt(limitParam, 10) : undefined;

  const query = Gallery.find().sort({ createdAt: -1 });
  if (limit && Number.isFinite(limit) && limit > 0) {
    query.limit(limit);
  }
  const items = await query;
  return NextResponse.json(items);
}

// POST /api/gallery -> admin only (expects {title, description, beforeMedia[], afterMedia[]})
export async function POST(req: NextRequest) {
  try {
    requireAdmin(req);
    await dbConnect();
    const body = await req.json();

    if (!body?.title) {
      return NextResponse.json({ message: "Title is required" }, { status: 400 });
    }

    const beforeArr: string[] = Array.isArray(body?.beforeMedia) ? body.beforeMedia : [];
    const afterArr: string[] = Array.isArray(body?.afterMedia) ? body.afterMedia : [];

    // Normalize optional videos array
    let videos: Array<{ url: string; title?: string }> = [];
    if (Array.isArray(body?.videos)) {
      videos = body.videos
        .filter((v: any) => v && typeof v.url === "string" && v.url.length > 0)
        .map((v: any) => ({ url: v.url, title: typeof v.title === "string" ? v.title : "" }));
    }

    // Require at least one media item (image or video)
    if (beforeArr.length + afterArr.length + videos.length === 0) {
      return NextResponse.json(
        { message: "Include at least one image or video" },
        { status: 400 }
      );
    }

    const doc = await Gallery.create({
      title: body.title,
      description: body.description ?? "",
      beforeMedia: beforeArr,
      afterMedia: afterArr,
      videos,
    });

    return NextResponse.json(doc, { status: 201 });
  } catch (e: any) {
    console.error("Gallery POST error:", e);
    return NextResponse.json({ message: e.message ?? "Unauthorized" }, { status: 401 });
  }
}
