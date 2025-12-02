export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { requireAdmin } from "@/lib/auth";
import { dbConnect } from "@/lib/mongodb";
import { User } from "@/lib/models/User";

export async function PUT(req: NextRequest) {
  try {
    const payload = requireAdmin(req);
    const body = await req.json();
    const currentPassword = String(body?.currentPassword || "");
    const newPassword = String(body?.newPassword || "");

    if (!currentPassword || !newPassword) {
      return NextResponse.json({ message: "Current and new password are required" }, { status: 400 });
    }
    if (newPassword.length < 8) {
      return NextResponse.json({ message: "Password must be at least 8 characters" }, { status: 400 });
    }

    await dbConnect();
    const user = await User.findById(payload.sub);
    if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 });

    const ok = await bcrypt.compare(currentPassword, user.passwordHash);
    if (!ok) {
      return NextResponse.json({ message: "Current password is incorrect" }, { status: 401 });
    }

    user.passwordHash = await bcrypt.hash(newPassword, 10);
    await user.save();

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    const msg = e?.message || "Failed to update password";
    const status = msg === "Unauthorized" ? 401 : 500;
    return NextResponse.json({ message: msg }, { status });
  }
}
