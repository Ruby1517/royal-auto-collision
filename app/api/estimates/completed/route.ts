import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import { Estimate } from "@/lib/models/Estimate";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const revalidate = 0;

const MONGODB_URI = process.env.MONGODB_URI;

export async function GET(req: NextRequest) {
  if (!MONGODB_URI) {
    // Allow static exports/builds to succeed without a database connection.
    return NextResponse.json({ estimates: [], totalCount: 0 });
  }

  await dbConnect();
  const { searchParams } = new URL(req.url);
  const page  = parseInt(searchParams.get("page")  || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);

  const [items, totalCount] = await Promise.all([
    Estimate.find({ status: "completed" }).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit),
    Estimate.countDocuments({ status: "completed" }),
  ]);
  return NextResponse.json({ estimates: items, totalCount });
}
