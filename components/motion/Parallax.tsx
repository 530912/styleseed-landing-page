"use client";

import {
  motion,
  useMotionValue,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, type ReactNode } from "react";

import { useIsMobile, usePrefersReducedMotion } from "@/lib/useMotionPrefs";

type ParallaxProps = {
  children?: ReactNode;
  /** 클수록 빠르게 움직여요. 음수면 반대 방향. */
  speed?: number;
  /**
   * page: 페이지 스크롤 양에 비례 (히어로처럼 맨 위에 있는 요소)
   * element: 요소가 화면을 지나가는 동안 위아래로 이동 (본문 섹션)
   */
  anchor?: "page" | "element";
  className?: string;
};

const ELEMENT_RANGE = 400;

/** 모바일에서는 이동 폭을 절반으로, reduced-motion 에서는 움직이지 않아요. */
export function Parallax({
  children,
  speed = 0.15,
  anchor = "element",
  className,
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const isMobile = useIsMobile();

  const strength = useMotionValue(1);
  useEffect(() => {
    strength.set(reducedMotion ? 0 : isMobile ? 0.5 : 1);
  }, [strength, reducedMotion, isMobile]);

  const { scrollY } = useScroll();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    [scrollY, scrollYProgress, strength],
    ([pageY, progress, factor]: number[]) =>
      anchor === "page"
        ? -pageY * speed * factor
        : (0.5 - progress) * speed * ELEMENT_RANGE * factor,
  );

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}
