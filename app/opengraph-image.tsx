import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "MoneySense AI — Make money make sense.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #195035 0%, #0f2e20 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              display: "flex",
              width: 56,
              height: 56,
              borderRadius: 28,
              background: "#ffffff",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
            }}
          >
            🌱
          </div>
          <div style={{ display: "flex", color: "#e2efe2", fontSize: 32, fontWeight: 600 }}>
            MoneySense AI
          </div>
        </div>
        <div
          style={{
            display: "flex",
            color: "#ffffff",
            fontSize: 72,
            fontWeight: 700,
            marginTop: 40,
            lineHeight: 1.1,
          }}
        >
          Make money make sense.
        </div>
        <div style={{ display: "flex", color: "#c8e0c9", fontSize: 30, marginTop: 24 }}>
          Understand money. Explore your choices. Learn before you decide.
        </div>
      </div>
    ),
    { ...size }
  );
}
