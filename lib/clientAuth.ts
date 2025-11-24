"use client";

export function saveAdminToken(token: string) {
  localStorage.setItem("adminToken", token);
}
export function getAdminToken(): string | null {
  return typeof window === "undefined" ? null : localStorage.getItem("adminToken");
}
export function clearAdminToken() {
  localStorage.removeItem("adminToken");
}
