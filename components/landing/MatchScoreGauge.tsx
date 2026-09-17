"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

import { CountUp } from "@/components/motion/CountUp";
import { usePrefersReducedMotion } from "@/lib/useMotionPrefs";

type MatchScoreGaugeProps = { value: number; label: string };

/** 화면에 들어오면 막대가 value%까지 채워지고 숫자가 올라가요. */
export function MatchScoreGauge({ value, label }: MatchScoreGaugeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reducedMotion = usePrefersReducedMotion();
  const filled = inView || reducedMotion;

  return (
    <div ref={ref} className="rounded-[20px] bg-bg p-5 md:p-6">
      <div className="flex items-end justify-between gap-4">
        <p className="font-wide text-xs font-bold tracking-label uppercase font-stretch-expanded">
          {label}
        </p>
        <CountUp
          value={value}
          suffix="%"
          className="font-wide text-5xl leading-[0.9] font-extrabold tracking-[-0.04em] font-stretch-expanded md:text-6xl"
          suffixClassName="ml-0.5 text-[0.42em] tracking-normal text-accent"
        />
      </div>
      <div aria-hidden="true" className="mt-5 h-2.5 overflow-hidden rounded-full bg-ink/10">
        <motion.div
          className="h-full origin-left rounded-full bg-accent"
          initial={{ scaleX: reducedMotion ? value / 100 : 0 }}
          animate={{ scaleX: filled ? value / 100 : 0 }}
          transition={{ duration: reducedMotion ? 0 : 1.6, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  );
}
