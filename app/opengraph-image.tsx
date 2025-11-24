import { ImageResponse } from "next/server";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BG = "#0b0f19";         // modern black/charcoal
const RED = "#dc2626";        // brand red (tailwind brand-600)
const LIGHT = "#f8fafc";      // near-white

export default function Image() {
  const site = process.env.NEXT_PUBLIC_BASE_URL || "";
  let host = "";
  try { host = site ? new URL(site).host : ""; } catch {}

  const title = "Royal Auto Collision";
  const tagline = "Premium Collision Repair • Factory Finish";

  return new ImageResponse(
    (
      <div
        style={{
          width: size.width,
          height: size.height,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: BG,
          color: LIGHT,
          position: "relative",
          padding: 48,
        }}
      >
        {/* red diagonal accent */}
        <div
          style={{
            position: "absolute",
            right: -120,
            top: -120,
            width: 520,
            height: 520,
            transform: "rotate(35deg)",
            background: `linear-gradient(135deg, ${RED}, #ef4444)`,
            filter: "blur(2px)",
            opacity: 0.9,
            borderRadius: 24,
          }}
        />

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontSize: 24, letterSpacing: 4, color: "#ffffffcc", textTransform: "uppercase" }}>
            Since 2015 • Fresno, CA
          </div>
          <div style={{ fontSize: 84, fontWeight: 800, lineHeight: 1.05 }}>
            {title}
          </div>
          <div style={{ fontSize: 36, color: "#fffb", fontWeight: 500 }}>
            {tagline}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ height: 10, width: 320, background: RED, borderRadius: 999 }} />
          <div style={{ fontSize: 28, color: "#ffffffcc" }}>{host}</div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

