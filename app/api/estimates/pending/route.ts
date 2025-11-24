import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import { Estimate } from "@/lib/models/Estimate";

export async function GET(req: NextRequest) {
  await dbConnect();
  const { searchParams } = new URL(req.url);
  const page  = parseInt(searchParams.get("page")  || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);

  const [items, totalCount] = await Promise.all([
    Estimate.find({ status: "pending" }).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit),
    Estimate.countDocuments({ status: "pending" }),
  ]);
  return NextResponse.json({ estimates: items, totalCount });
}
