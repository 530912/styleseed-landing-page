import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

/** 빌드 시점에 public 폴더에 파일이 있는지 확인해요. (서버 컴포넌트 전용) */
function publicFileExists(src: string) {
  if (!src.startsWith("/")) return true; // 외부 URL은 있다고 가정
  return fs.existsSync(
    path.join(/* turbopackIgnore: true */ process.cwd(), "public", src),
  );
}

type MaybeImageProps = {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  priority?: boolean;
  /** 플레이스홀더 안에 넣을 장식 요소 */
  placeholder?: ReactNode;
};

/** 이미지가 있으면 next/image(fill), 없으면 회색 플레이스홀더를 보여줘요. 부모는 relative여야 해요. */
export function MaybeImage({
  src,
  alt,
  sizes,
  className,
  priority,
  placeholder,
}: MaybeImageProps) {
  if (publicFileExists(src)) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={cn("object-cover", className)}
      />
    );
  }

  return (
    <div
      role="img"
      aria-label={alt}
      className={cn("absolute inset-0 bg-placeholder", className)}
    >
      {placeholder}
    </div>
  );
}
