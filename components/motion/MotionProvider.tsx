"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/** 운영체제의 '동작 줄이기' 설정을 Framer Motion 전체에 적용해요. */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
