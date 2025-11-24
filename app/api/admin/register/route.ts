export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { dbConnect } from "@/lib/mongodb";
import { User } from "@/lib/models/User";

const SETUP_KEY = process.env.ADMIN_SETUP_KEY as string;

export async function POST(req: NextRequest) {
  try {
    if (!SETUP_KEY) throw new Error("ADMIN_SETUP_KEY is missing");
    const body = await req.json();
    const setupKey = String(body?.setupKey || "");
    const email = String(body?.email || "").toLowerCase().trim();
    const password = String(body?.password || "");
    if (setupKey !== SETUP_KEY) return NextResponse.json({ message: "Invalid setup key" }, { status: 401 });
    if (!email || !password) return NextResponse.json({ message: "Email and password required" }, { status: 400 });
    await dbConnect();
    const exists = await User.findOne({ email }).lean();
    if (exists) return NextResponse.json({ message: "User already exists" }, { status: 400 });
    const passwordHash = await bcrypt.hash(password, 10);
    await User.create({ email, passwordHash, role: "admin" });
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ message: e.message || "Failed" }, { status: 500 });
  }
}

