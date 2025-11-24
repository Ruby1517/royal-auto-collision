export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { dbConnect } from "@/lib/mongodb";
import { User } from "@/lib/models/User";
import { signJwt } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = String(body?.email || "").toLowerCase().trim();
    const password = String(body?.password || "");
    if (!email || !password) return NextResponse.json({ message: "Email and password required" }, { status: 400 });
    await dbConnect();
    const user = await User.findOne({ email });
    if (!user) return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    const token = signJwt({ sub: String(user._id), email: user.email, role: user.role });
    return NextResponse.json({ token });
  } catch (e: any) {
    return NextResponse.json({ message: e.message || "Failed" }, { status: 500 });
  }
}

