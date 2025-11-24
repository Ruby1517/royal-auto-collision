import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

const JWT_SECRET = (process.env.JWT_SECRET as string | undefined) || "";

export type JwtPayload = { sub: string; email: string; role: "admin" | "user" };

export function signJwt(payload: JwtPayload, expiresIn = "7d") {
  if (!JWT_SECRET) throw new Error("JWT_SECRET is missing. Set it in your .env file.");
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
}

export function verifyJwt(token: string): JwtPayload | null {
  try {
    if (!JWT_SECRET) throw new Error("JWT_SECRET is missing");
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
  }
  catch { return null; }
}

export function requireAdmin(req: NextRequest): JwtPayload {
  const auth = req.headers.get("authorization") || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : null;
  if (!token) throw new Error("Missing token");
  const payload = verifyJwt(token);
  if (!payload || payload.role !== "admin") throw new Error("Unauthorized");
  return payload;
}
