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
      className={cn("relative scroll-mt-16 py-20 md:py-28 lg:py-32", className)}
      {...rest}
    >
      <div className={cn("relative container-page", containerClassName)}>{children}</div>
    </section>
  );
}
