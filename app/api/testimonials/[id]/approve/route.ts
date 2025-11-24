import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import { Testimonial } from "@/lib/models/Testimonial";
import { requireAdmin } from "@/lib/auth";

type Params = { params: { id: string } };

export async function PATCH(req: NextRequest, { params }: Params) {
  try {
    requireAdmin(req);
    await dbConnect();
    const updated = await Testimonial.findByIdAndUpdate(params.id, { approved: true }, { new: true });
    return NextResponse.json(updated);
  } catch (e: any) {
    return NextResponse.json({ message: e.message || "Unauthorized" }, { status: 401 });
  }
}
