import { ImageResponse } from "next/og";

/**
 * OG 이미지 자리 (임시).
 * 실제 이미지가 준비되면 이 파일을 지우고 app/opengraph-image.png (1200×630)를 넣어주세요.
 */
export const alt = "STYLESEED — AI Personal Styling";
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
          justifyContent: "space-between",
          padding: 80,
          background: "#F0EEE6",
          color: "#141414",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, letterSpacing: 8, color: "#6B6B6B" }}>
          AI PERSONAL STYLING
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 120, fontWeight: 800, letterSpacing: 6 }}>
          <svg width="88" height="88" viewBox="0 0 64 64" style={{ marginBottom: 16 }}>
            <path d="M32 4 Q32 32 60 32 Q32 32 32 60 Q32 32 4 32 Q32 32 32 4 Z" fill="#C2456E" />
          </svg>
          STYLESEED
        </div>
      </div>
    ),
    size,
  );
}
