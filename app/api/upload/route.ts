export const runtime = "nodejs"; // required: uses fs
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

function sanitize(name: string) {
  return name.replace(/[^a-zA-Z0-9.\-_]/g, "_");
}

export async function POST(req: Request) {
  try {
    const form = await req.formData();

    const beforeFiles = form.getAll("before") as File[];
    const afterFiles = form.getAll("after") as File[];
    const videoFiles = form.getAll("videos") as File[];
    const photoFiles = form.getAll("photos") as File[];

    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    await fs.mkdir(uploadsDir, { recursive: true });

    async function saveFiles(files: File[]) {
      const urls: string[] = [];
      for (const file of files) {
        const bytes = Buffer.from(await file.arrayBuffer());
        const filename = `${Date.now()}-${sanitize(file.name)}`;
        const filepath = path.join(uploadsDir, filename);
        await fs.writeFile(filepath, bytes);
        urls.push(`/uploads/${filename}`); // public URL
      }
      return urls;
    }

    const [beforeUrls, afterUrls, videoUrls, photoUrls] = await Promise.all([
      saveFiles(beforeFiles),
      saveFiles(afterFiles),
      saveFiles(videoFiles),
      saveFiles(photoFiles),
    ]);

    return NextResponse.json({ beforeUrls, afterUrls, videoUrls, photoUrls });
  } catch (e: any) {
    console.error("Upload error:", e);
    return NextResponse.json({ message: e.message || "Upload failed" }, { status: 500 });
  }
}
