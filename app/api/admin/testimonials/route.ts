export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { dbConnect } from "@/lib/mongodb";
import { requireAdmin } from "@/lib/auth";

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

// GET /api/admin/testimonials?status=pending|approved|all
export async function GET(req: NextRequest) {
  try {
    requireAdmin(req);
    await dbConnect();
    const status = (req.nextUrl.searchParams.get("status") || "pending") as
      | "pending"
      | "approved"
      | "all";
    const query: any = {};
    if (status !== "all") query.approved = status === "approved";
    const items = await Testimonial.find(query)
      .sort({ createdAt: -1 })
      .limit(200)
      .lean();
    return NextResponse.json({ items });
  } catch (e: any) {
    return NextResponse.json({ message: e.message || "Unauthorized" }, { status: 401 });
  }
}

