export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import { Car } from "@/lib/models/Car";
import { requireAdmin } from "@/lib/auth";

async function findCar(id: string) {
  await dbConnect();
  try {
    return await Car.findById(id);
  } catch {
    return null;
  }
}

// GET /api/cars/:id -> public
export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const car = await findCar(params.id);
  if (!car) return NextResponse.json({ message: "Not found" }, { status: 404 });
  return NextResponse.json(car);
}

// PUT /api/cars/:id -> admin
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    requireAdmin(req);
    await dbConnect();
    const body = await req.json();

    const updates: any = {};
    const fields = ["name", "price", "mileage", "drivetrain", "color", "vin", "location", "description"];
    fields.forEach((f) => {
      if (typeof body?.[f] === "string") updates[f] = body[f];
    });

    if (Array.isArray(body?.highlights)) {
      updates.highlights = body.highlights.filter((h: any) => typeof h === "string" && h.trim().length > 0);
    }

    if (Array.isArray(body?.photos) && body.photos.length > 0) {
      updates.photos = body.photos.filter((p: any) => typeof p === "string" && p.length > 0);
    }

    const car = await Car.findByIdAndUpdate(params.id, updates, { new: true });
    if (!car) return NextResponse.json({ message: "Not found" }, { status: 404 });
    return NextResponse.json(car);
  } catch (e: any) {
    return NextResponse.json({ message: e.message ?? "Unauthorized" }, { status: 401 });
  }
}

// DELETE /api/cars/:id -> admin
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    requireAdmin(req);
    await dbConnect();
    const deleted = await Car.findByIdAndDelete(params.id);
    if (!deleted) return NextResponse.json({ message: "Not found" }, { status: 404 });
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ message: e.message ?? "Unauthorized" }, { status: 401 });
  }
}
