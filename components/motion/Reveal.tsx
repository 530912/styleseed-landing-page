"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

import { usePrefersReducedMotion } from "@/lib/useMotionPrefs";

const tags = {
  div: motion.div,
  li: motion.li,
  article: motion.article,
};

type RevealProps = {
  children: ReactNode;
  as?: keyof typeof tags;
  delay?: number;
  className?: string;
};

/** 화면에 들어올 때 fade-up. reduced-motion 이면 짧은 페이드만 남겨요. */
export function Reveal({ children, as = "div", delay = 0, className }: RevealProps) {
  const reducedMotion = usePrefersReducedMotion();
  const Tag = tags[as];

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: reducedMotion ? 0 : 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={
        reducedMotion
          ? { duration: 0.2 }
          : { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }
      }
    >
      {children}
    </Tag>
  );
}
