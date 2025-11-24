import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { dbConnect } from "@/lib/mongodb";
import { User } from "@/lib/models/User";

export async function GET(req: NextRequest) {
  try {
    const payload = requireAdmin(req);
    await dbConnect();
    const user = await User.findById(payload.sub).select("email role createdAt");
    return NextResponse.json(user);
  } catch (e: any) {
    return NextResponse.json({ message: e.message || "Unauthorized" }, { status: 401 });
  }
}
