import { Fragment } from "react";

import { cn } from "@/lib/cn";

/**
 * "**입지 않는 옷**이 쌓여요" 처럼 `**`로 감싼 부분만 강조해요.
 * content 파일에서 문구만 바꿔도 강조 위치가 함께 바뀌어요.
 */
export function emphasize(text: string, className = "text-accent") {
  return text
    .split(/(\*\*[^*]+\*\*)/g)
    .filter(Boolean)
    .map((part, i) =>
      part.startsWith("**") && part.endsWith("**") ? (
        <strong key={i} className={cn("font-[inherit]", className)}>
          {part.slice(2, -2)}
        </strong>
      ) : (
        <Fragment key={i}>{part}</Fragment>
      ),
    );
}
