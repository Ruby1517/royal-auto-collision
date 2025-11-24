export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { dbConnect } from "@/lib/mongodb";

const TestimonialSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    text: { type: String, required: true, trim: true, maxlength: 2000 },
    rating: { type: Number, min: 1, max: 5, default: 5 },
    approved: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Testimonial =
  (mongoose.models.Testimonial as mongoose.Model<any>) ||
  mongoose.model("Testimonial", TestimonialSchema);

export async function GET() {
  await dbConnect();
  const items = await Testimonial.find({ approved: true })
    .sort({ createdAt: -1 })
    .limit(100)
    .lean();
  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();
    const name = String(body?.name || "").trim();
    const text = String(body?.text || "").trim();
    let rating = Number(body?.rating || 5);
    if (!name || !text) {
      return NextResponse.json({ message: "Name and feedback are required" }, { status: 400 });
    }
    if (!Number.isFinite(rating)) rating = 5;
    rating = Math.max(1, Math.min(5, Math.round(rating)));

    const autoApprove = String(process.env.AUTO_APPROVE_TESTIMONIALS || "false").toLowerCase() === "true";
    const doc = await Testimonial.create({ name, text, rating, approved: autoApprove });
    return NextResponse.json({ id: doc._id, message: "Thanks for your feedback! Pending review." }, { status: 201 });
  } catch (e: any) {
    console.error("Testimonial POST error:", e);
    return NextResponse.json({ message: e.message || "Failed to submit" }, { status: 500 });
  }
}
