import { cn } from "@/lib/cn";

type Garment = "blazer" | "cardigan" | "shirt" | "loafer";

/** 옷 이미지 파일 이름 → 일러스트 종류 · 색 (이미지가 없을 때만 보여요) */
const garments: Record<Garment, { fill: string; background: string }> = {
  blazer: { fill: "#6e2233", background: "#e7dcd9" },
  cardigan: { fill: "#6b6a3a", background: "#e3e2d3" },
  shirt: { fill: "#ffffff", background: "#f0eee6" },
  loafer: { fill: "#141414", background: "#dcdad3" },
};

export function garmentFromSrc(src: string): Garment | null {
  const name = src.split("/").pop()?.split(".")[0];
  return name && name in garments ? (name as Garment) : null;
}

const INK = "#141414";

function GarmentShape({ garment }: { garment: Garment }) {
  const { fill } = garments[garment];
  const stroke = { stroke: INK, strokeWidth: 2, strokeLinejoin: "round" as const };

  switch (garment) {
    case "blazer":
      return (
        <svg viewBox="0 0 100 120" className="h-full w-full">
          <path d="M30 10 L42 5 L50 32 L58 5 L70 10 L88 24 L93 100 L79 102 L76 58 L75 114 L25 114 L24 58 L21 102 L7 100 L12 24 Z" fill={fill} {...stroke} />
          <path d="M42 5 L39 42 L50 62 L61 42 L58 5" fill="none" {...stroke} />
          <circle cx="50" cy="76" r="2.4" fill={INK} />
          <circle cx="50" cy="90" r="2.4" fill={INK} />
        </svg>
      );
    case "cardigan":
      return (
        <svg viewBox="0 0 100 120" className="h-full w-full">
          <path d="M34 8 Q50 16 66 8 L88 20 L94 98 L80 100 L76 50 L76 114 L24 114 L24 50 L20 100 L6 98 L12 20 Z" fill={fill} {...stroke} />
          <path d="M34 8 L50 46 L66 8 M50 46 L50 114" fill="none" {...stroke} />
          <circle cx="54" cy="60" r="2.2" fill={INK} />
          <circle cx="54" cy="76" r="2.2" fill={INK} />
          <circle cx="54" cy="92" r="2.2" fill={INK} />
        </svg>
      );
    case "shirt":
      return (
        <svg viewBox="0 0 100 120" className="h-full w-full">
          <path d="M36 8 L50 16 L64 8 L86 20 L93 72 L80 74 L76 40 L76 114 L24 114 L24 40 L20 74 L7 72 L14 20 Z" fill={fill} {...stroke} />
          <path d="M36 8 L43 24 L50 16 L57 24 L64 8 M50 16 L50 114" fill="none" {...stroke} />
        </svg>
      );
    case "loafer":
      return (
        <svg viewBox="0 0 120 80" className="h-full w-full">
          <path d="M8 56 Q8 36 30 33 L60 29 Q82 27 98 40 Q116 48 113 58 Q112 66 100 66 L16 66 Q8 66 8 56 Z" fill={fill} {...stroke} />
          <path d="M10 60 L111 60 M50 32 Q64 46 82 34" fill="none" {...stroke} />
        </svg>
      );
  }
}

/** 옷 사진이 준비되기 전까지 쓰는 선화 일러스트 */
export function GarmentPlaceholder({
  garment,
  className,
  framed = true,
}: {
  garment: Garment;
  className?: string;
  /** true면 옷 색에 맞춘 배경을 깔아요 */
  framed?: boolean;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn("absolute inset-0 flex items-center justify-center", className)}
      style={framed ? { backgroundColor: garments[garment].background } : undefined}
    >
      <div className={garment === "loafer" ? "h-[46%] w-[72%]" : "h-[72%] w-[56%]"}>
        <GarmentShape garment={garment} />
      </div>
    </div>
  );
}
