export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { dbConnect } from "@/lib/mongodb";
import { requireAdmin } from "@/lib/auth";

const TestimonialSchema = new mongoose.Schema(
  {
    name: String,
    text: String,
    rating: Number,
    approved: Boolean,
  },
  { timestamps: true }
);

const Testimonial =
  (mongoose.models.Testimonial as mongoose.Model<any>) ||
  mongoose.model("Testimonial", TestimonialSchema);

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    requireAdmin(req);
    await dbConnect();
    const id = params.id;
    const body = await req.json().catch(() => ({}));
    const approved = Boolean(body?.approved);
    const doc = await Testimonial.findByIdAndUpdate(
      id,
      { $set: { approved } },
      { new: true }
    ).lean();
    if (!doc) return NextResponse.json({ message: "Not found" }, { status: 404 });
    return NextResponse.json({ ok: true, item: doc });
  } catch (e: any) {
    return NextResponse.json({ message: e.message || "Unauthorized" }, { status: 401 });
  }
}

