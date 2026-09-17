"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

import { CountUp } from "@/components/motion/CountUp";
import { usePrefersReducedMotion } from "@/lib/useMotionPrefs";

type MatchScoreGaugeProps = { value: number; label: string };

/** 화면에 들어오면 원형 게이지가 value%까지 채워져요. */
export function MatchScoreGauge({ value, label }: MatchScoreGaugeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reducedMotion = usePrefersReducedMotion();
  const filled = inView || reducedMotion;

  return (
    <div
      ref={ref}
      role="img"
      aria-label={`${label} ${value}%`}
      className="relative size-36 shrink-0 md:size-40"
    >
      <svg viewBox="0 0 120 120" className="size-full -rotate-90" aria-hidden="true">
        <circle cx="60" cy="60" r="52" fill="none" strokeWidth="9" className="stroke-ink/10" />
        <motion.circle
          cx="60"
          cy="60"
          r="52"
          fill="none"
          strokeWidth="9"
          strokeLinecap="round"
          className="stroke-accent"
          initial={{ pathLength: reducedMotion ? value / 100 : 0 }}
          animate={{ pathLength: filled ? value / 100 : 0 }}
          transition={{ duration: reducedMotion ? 0 : 1.6, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>
      <div aria-hidden="true" className="absolute inset-0 flex flex-col items-center justify-center">
        <CountUp
          value={value}
          suffix="%"
          className="text-4xl font-bold tracking-[-0.04em]"
          suffixClassName="text-lg"
        />
        <span className="mt-0.5 text-[10px] font-semibold tracking-label text-muted uppercase">
          {label}
        </span>
      </div>
    </div>
  );
}
