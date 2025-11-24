export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import { requireAdmin } from "@/lib/auth";
import { Car } from "@/lib/models/Car";

// GET /api/cars -> public list
export async function GET(req: NextRequest) {
  await dbConnect();
  const url = req.nextUrl;
  const limitParam = url.searchParams.get("limit");
  const limit = limitParam ? parseInt(limitParam, 10) : undefined;

  const query = Car.find().sort({ createdAt: -1 });
  if (limit && Number.isFinite(limit) && limit > 0) {
    query.limit(limit);
  }
  const cars = await query;
  return NextResponse.json(cars);
}

// POST /api/cars -> admin only
export async function POST(req: NextRequest) {
  try {
    requireAdmin(req);
    await dbConnect();
    const body = await req.json();

    const name = String(body?.name || "").trim();
    if (!name) return NextResponse.json({ message: "Name is required" }, { status: 400 });

    const photos: string[] = Array.isArray(body?.photos) ? body.photos.filter(Boolean) : [];
    if (photos.length === 0) {
      return NextResponse.json({ message: "At least one photo is required" }, { status: 400 });
    }

    const highlights: string[] = Array.isArray(body?.highlights)
      ? body.highlights.filter((h: any) => typeof h === "string" && h.trim().length > 0)
      : [];

    const doc = await Car.create({
      name,
      price: body?.price || "",
      mileage: body?.mileage || "",
      drivetrain: body?.drivetrain || "",
      color: body?.color || "",
      vin: body?.vin || "",
      location: body?.location || "",
      description: body?.description || "",
      highlights,
      photos,
    });

    return NextResponse.json(doc, { status: 201 });
  } catch (e: any) {
    console.error("Cars POST error:", e);
    return NextResponse.json({ message: e.message ?? "Unauthorized" }, { status: 401 });
  }
}
