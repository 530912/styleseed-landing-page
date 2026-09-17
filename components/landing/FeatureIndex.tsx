"use client";

import { useMotionValueEvent, useScroll } from "framer-motion";
import { useCallback, useEffect, useRef, type ReactNode } from "react";

import { features } from "@/content/landing";
import { cn } from "@/lib/cn";

/**
 * 기능 인덱스: 화면 가운데(58%)를 지난 항목까지 제목이 진해지고 왼쪽 선이 그려져요.
 * 흐리게 시작하는 연출은 1024px 이상에서만 — 모바일은 처음부터 모두 선명해요.
 */
export function FeatureIndex({ heading }: { heading: ReactNode }) {
  const itemsRef = useRef<Array<HTMLLIElement | null>>([]);
  const counterRef = useRef<HTMLSpanElement>(null);

  const update = useCallback(() => {
    const line = window.innerHeight * 0.58;
    let active = 0;
    itemsRef.current.forEach((item, i) => {
      if (!item) return;
      const on = item.getBoundingClientRect().top < line;
      item.toggleAttribute("data-on", on);
      if (on) active = i;
    });
    if (counterRef.current) counterRef.current.textContent = String(active + 1);
  }, []);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", update);
  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [update]);

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-10">
      <div className="lg:col-span-5">
        <div className="tall:sticky tall:top-28">
          {heading}
          <p
            aria-hidden="true"
            className="mt-10 hidden font-wide text-[15px] font-extrabold text-muted tabular-nums font-stretch-expanded lg:block"
          >
            <span ref={counterRef} className="text-ink">
              1
            </span>{" "}
            / {features.items.length}
          </p>
        </div>
      </div>

      <ul className="lg:col-span-7">
        {features.items.map((item, i) => {
          const decision = "highlight" in item && item.highlight;
          return (
            <li
              key={item.title}
              ref={(node) => {
                itemsRef.current[i] = node;
              }}
              className={cn(
                "group relative",
                decision
                  ? "mt-6 rounded-card bg-ink p-7 text-surface md:p-12"
                  : "border-t border-ink/15 py-7 pl-5 md:py-11 md:pl-8 [&:nth-last-child(2)]:border-b",
              )}
            >
              {!decision && (
                <span
                  aria-hidden="true"
                  className="absolute -top-px bottom-0 left-0 w-[3px] origin-top bg-accent transition-transform duration-500 ease-[cubic-bezier(0.2,0.7,0.1,1)] motion-reduce:transition-none lg:scale-y-0 lg:group-data-on:scale-y-100"
                />
              )}
              <h3
                className={cn(
                  "font-wide text-[30px] leading-[1.05] font-extrabold tracking-[-0.045em] font-stretch-expanded md:text-[44px] lg:text-[clamp(36px,3.6vw,52px)]",
                  !decision &&
                    "transition-colors duration-300 motion-reduce:transition-none lg:text-ink/25 lg:group-data-on:text-ink",
                )}
              >
                {item.title}
                {decision && (
                  <span aria-hidden="true" className="ml-2 align-[0.35em] text-[0.55em] text-accent">
                    ✦
                  </span>
                )}
              </h3>
              <p
                className={cn(
                  "mt-3 leading-relaxed",
                  decision
                    ? "max-w-[36ch] text-lg text-surface/75 md:text-[22px]"
                    : "max-w-[44ch] text-base text-muted md:text-[17px]",
                )}
              >
                {item.description}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
