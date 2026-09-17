"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

import { usePrefersReducedMotion } from "@/lib/useMotionPrefs";

/** 숫자 아래 얇은 막대: 화면에 들어오면 value%까지 채워져요. (장식용) */
export function MetricBar({ value }: { value: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.8 });
  const reducedMotion = usePrefersReducedMotion();

  return (
    <div ref={ref} aria-hidden="true" className="h-1.5 overflow-hidden rounded-full bg-surface/15">
      <motion.div
        className="h-full origin-left rounded-full bg-accent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: inView || reducedMotion ? value / 100 : 0 }}
        transition={{ duration: reducedMotion ? 0 : 1.6, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  );
}
