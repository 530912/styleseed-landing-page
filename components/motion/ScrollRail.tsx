"use client";

import { motion, useMotionValue, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, type ReactNode } from "react";

import { cn } from "@/lib/cn";
import { useMediaQuery, usePrefersReducedMotion } from "@/lib/useMotionPrefs";

/**
 * 가로로 늘어선 카드 레일.
 * - 데스크톱(1024px~): 세로 스크롤만큼 레일이 옆으로 흘러가요.
 * - 모바일 · reduced-motion: 손가락으로 넘기는 가로 스크롤 + 스냅.
 */
export function ScrollRail({
  children,
  className,
  label,
}: {
  children: ReactNode;
  className?: string;
  label: string;
}) {
  const railRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const reducedMotion = usePrefersReducedMotion();
  const linked = isDesktop && !reducedMotion;

  const overflow = useMotionValue(0);
  const strength = useMotionValue(0);
  useEffect(() => {
    strength.set(linked ? 1 : 0);
  }, [strength, linked]);

  useEffect(() => {
    const rail = railRef.current;
    const track = trackRef.current;
    if (!rail || !track) return;
    const measure = () => {
      const style = getComputedStyle(rail);
      const inset = parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
      overflow.set(Math.max(0, track.scrollWidth + inset - rail.clientWidth));
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(rail);
    observer.observe(track);
    return () => observer.disconnect();
  }, [overflow]);

  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ["start end", "end start"],
  });
  const x = useTransform(
    [scrollYProgress, overflow, strength],
    ([progress, distance, factor]: number[]) => -progress * distance * factor,
  );

  return (
    <div
      ref={railRef}
      className={cn(
        "rail-inset",
        linked ? "overflow-hidden" : "snap-x snap-mandatory overflow-x-auto scrollbar-none",
        className,
      )}
    >
      <motion.ul
        ref={trackRef}
        aria-label={label}
        style={{ x }}
        className="flex w-max gap-3 md:gap-5"
      >
        {children}
      </motion.ul>
    </div>
  );
}
