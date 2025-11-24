import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import { Estimate } from "@/lib/models/Estimate";
import { requireAdmin } from "@/lib/auth";

type Params = { params: { id: string } };

export async function PUT(req: NextRequest, { params }: Params) {
  try {
    requireAdmin(req);
    await dbConnect();
    const { status } = await req.json();
    if (!["pending", "completed"].includes(status)) {
      return NextResponse.json({ message: "Invalid status" }, { status: 400 });
    }
    const updated = await Estimate.findByIdAndUpdate(params.id, { status }, { new: true });
    return NextResponse.json(updated);
  } catch (e: any) {
    return NextResponse.json({ message: e.message || "Unauthorized" }, { status: 401 });
  }
}
