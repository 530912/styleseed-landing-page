import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

type SectionProps = {
  id?: string;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  labelledBy?: string;
} & Record<`data-${string}`, string>;

/** 섹션 공통 여백과 최대 너비. 고정 헤더 높이만큼 앵커 위치를 보정해요. */
export function Section({
  id,
  children,
  className,
  containerClassName,
  labelledBy,
  ...rest
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn("relative scroll-mt-16 py-24 md:py-32 lg:py-40", className)}
      {...rest}
    >
      <div
        className={cn(
          "relative mx-auto w-full max-w-6xl px-5 md:px-8",
          containerClassName,
        )}
      >
        {children}
      </div>
    </section>
  );
}
