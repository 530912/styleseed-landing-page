"use client";

import { animate, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

import { usePrefersReducedMotion } from "@/lib/useMotionPrefs";

type CountUpProps = {
  value: number;
  suffix?: string;
  duration?: number;
  className?: string;
  suffixClassName?: string;
};

/** 화면에 들어오면 0부터 숫자가 올라가요. 스크린리더에는 최종 값만 읽혀요. */
export function CountUp({
  value,
  suffix = "",
  duration = 1.6,
  className,
  suffixClassName,
}: CountUpProps) {
  const numberRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(numberRef, { once: true, amount: 0.6 });
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const node = numberRef.current;
    if (!node) return;

    if (reducedMotion) {
      node.textContent = String(value);
      return;
    }
    if (!inView) {
      node.textContent = "0";
      return;
    }

    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        node.textContent = String(Math.round(latest));
      },
    });
    return () => controls.stop();
  }, [inView, reducedMotion, value, duration]);

  return (
    <span className={className}>
      <span className="sr-only">
        {value}
        {suffix}
      </span>
      <span aria-hidden="true">
        <span ref={numberRef} className="tabular-nums">
          {value}
        </span>
        {suffix && <span className={suffixClassName}>{suffix}</span>}
      </span>
    </span>
  );
}
