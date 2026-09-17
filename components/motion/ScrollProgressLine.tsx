"use client";

import { motion, useScroll } from "framer-motion";
import { useRef, type ReactNode } from "react";

import { cn } from "@/lib/cn";

/**
 * 왼쪽 세로선이 스크롤한 만큼 로즈핑크로 채워져요.
 * 순서가 있는 목록(작동 방식)에서 "지금 몇 단계쯤 읽고 있는지"를 보여줘요.
 * reduced-motion 에서는 MotionProvider 설정으로 즉시 반영돼요.
 */
export function ScrollProgressLine({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.75", "end 0.6"],
  });

  return (
    <div ref={ref} className={cn("relative pl-5 md:pl-8", className)}>
      <span aria-hidden="true" className="absolute top-0 bottom-0 left-0 w-[3px] rounded-full bg-ink/10" />
      <motion.span
        aria-hidden="true"
        style={{ scaleY: scrollYProgress }}
        className="absolute top-0 bottom-0 left-0 w-[3px] origin-top rounded-full bg-accent"
      />
      {children}
    </div>
  );
}
