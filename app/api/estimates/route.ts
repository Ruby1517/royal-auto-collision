import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import { Estimate } from "@/lib/models/Estimate";

export async function GET(req: NextRequest) {
  await dbConnect();
  const { searchParams } = new URL(req.url);
  const page  = parseInt(searchParams.get("page")  || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);
  const status = searchParams.get("status");
  const filter: any = {};
  if (status) filter.status = status;

  const [items, totalCount] = await Promise.all([
    Estimate.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit),
    Estimate.countDocuments(filter),
  ]);
  return NextResponse.json({ estimates: items, totalCount });
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();
    const doc = await Estimate.create(body);
    return NextResponse.json(doc, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ message: e.message || "Invalid payload" }, { status: 400 });
  }
}
