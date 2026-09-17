"use client";

import { useMotionValueEvent, useScroll } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, type ReactNode } from "react";

import { paradox } from "@/content/landing";
import { useMediaQuery, usePrefersReducedMotion } from "@/lib/useMotionPrefs";

type Stat = (typeof paradox.stats)[number];

/** "평균 198벌 보유" → 198 */
function garmentCount(stat: Stat) {
  const match = stat.meta.match(/(\d+)\s*벌/);
  return match ? Number(match[1]) : 100;
}

/** 입지 않은 옷이 옷장 곳곳에 흩어져 켜지도록 고정 시드로 섞어요. (서버·클라이언트 결과가 같아요) */
function shuffledIndexes(total: number) {
  const order = Array.from({ length: total }, (_, i) => i);
  let seed = total;
  for (let i = order.length - 1; i > 0; i--) {
    seed = (seed * 9301 + 49297) % 233280;
    const j = Math.floor((seed / 233280) * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  return order;
}

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

type RackHandle = {
  root: HTMLElement;
  bars: HTMLElement[];
  number: HTMLElement;
};

function Rack({ stat, register }: { stat: Stat; register: (handle: RackHandle | null) => void }) {
  const total = garmentCount(stat);
  const rootRef = useRef<HTMLElement>(null);
  const barsRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!rootRef.current || !barsRef.current || !numberRef.current) return;
    register({
      root: rootRef.current,
      bars: Array.from(barsRef.current.children) as HTMLElement[],
      number: numberRef.current,
    });
    return () => register(null);
  }, [register]);

  return (
    <article ref={rootRef} className="flex flex-col rounded-card bg-surface p-6 md:p-10 lg:p-9">
      <div className="flex items-start justify-between gap-4">
        <p className="font-wide text-[64px] leading-[0.9] font-extrabold tracking-[-0.04em] font-stretch-expanded md:text-[96px] lg:text-[clamp(64px,7.4vw,108px)]">
          <span className="sr-only">
            {stat.value}
            {stat.suffix}
          </span>
          <span aria-hidden="true">
            <span ref={numberRef} className="tabular-nums">
              {stat.value}
            </span>
            <span className="ml-0.5 text-[0.42em] tracking-normal text-accent">{stat.suffix}</span>
          </span>
        </p>
        <p className="pt-2 text-right text-sm font-semibold whitespace-nowrap text-muted">
          {stat.meta}
        </p>
      </div>
      <h3 className="mt-3.5 text-lg font-bold tracking-[-0.02em] md:text-[22px]">{stat.title}</h3>

      {/* 옷걸이: 한 칸이 옷 한 벌 */}
      <div
        ref={barsRef}
        aria-hidden="true"
        className="mt-6 grid grid-cols-[repeat(22,minmax(0,1fr))] gap-x-[3px] gap-y-[7px] border-t-2 border-ink pt-3 md:grid-cols-[repeat(33,minmax(0,1fr))] lg:mt-7"
      >
        {Array.from({ length: total }, (_, i) => (
          <i
            key={i}
            className="block h-3.5 origin-top rounded-b-[2px] bg-ink/80 transition-[background-color,transform] duration-300 data-unworn:scale-y-[0.62] data-unworn:bg-accent motion-reduce:transition-none md:h-5 lg:h-[clamp(14px,1.5vw,20px)]"
          />
        ))}
      </div>

      <p className="mt-auto pt-6 text-xs leading-relaxed text-muted">{stat.source}</p>
    </article>
  );
}

/**
 * 옷장 통계 두 개를 "옷걸이 랙"으로 보여줘요.
 * - 넓고 높은 화면: 섹션이 화면에 고정된 채, 스크롤한 만큼 입지 않은 옷이 켜지고 숫자가 올라가요.
 * - 모바일: 각 랙이 화면을 지나가는 만큼 켜져요.
 * - reduced-motion: 처음부터 최종 상태.
 */
export function ClosetRacks({ heading }: { heading: ReactNode }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const handles = useRef<Array<RackHandle | null>>([]);
  const lit = useRef<number[]>([]);
  const sticky = useMediaQuery("(min-width: 1024px) and (min-height: 760px)");
  const reducedMotion = usePrefersReducedMotion();
  const orders = useMemo(() => paradox.stats.map((stat) => shuffledIndexes(garmentCount(stat))), []);

  const paint = useCallback(() => {
    const viewport = window.innerHeight;
    const scroller = scrollerRef.current?.getBoundingClientRect();

    handles.current.forEach((handle, i) => {
      if (!handle) return;
      const stat = paradox.stats[i];
      let progress = 1;
      if (!reducedMotion) {
        if (sticky && scroller) {
          progress = clamp01((-scroller.top / (scroller.height - viewport)) * 1.25);
        } else {
          const rect = handle.root.getBoundingClientRect();
          progress = clamp01((viewport * 0.85 - rect.top) / (rect.height * 0.8));
        }
      }

      const unwornTotal = Math.round(handle.bars.length * (stat.value / 100));
      const count = Math.round(unwornTotal * progress);
      if (lit.current[i] === count) return;
      lit.current[i] = count;

      orders[i].slice(0, unwornTotal).forEach((barIndex, order) => {
        handle.bars[barIndex]?.toggleAttribute("data-unworn", order < count);
      });
      handle.number.textContent = String(Math.round(stat.value * progress));
    });
  }, [orders, reducedMotion, sticky]);

  const registers = useMemo(
    () =>
      paradox.stats.map((_, i) => (handle: RackHandle | null) => {
        handles.current[i] = handle;
        lit.current[i] = -1;
      }),
    [],
  );

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", paint);
  useEffect(() => {
    lit.current = lit.current.map(() => -1);
    paint();
    window.addEventListener("resize", paint);
    return () => window.removeEventListener("resize", paint);
  }, [paint]);

  return (
    <div ref={scrollerRef} className="relative tall:h-[230vh]">
      <div className="tall:sticky tall:top-16 tall:flex tall:min-h-[calc(100vh-4rem)] tall:flex-col tall:justify-center tall:py-8">
        <div className="container-page">
          {heading}
          <div className="mt-10 grid gap-4 md:mt-12 lg:grid-cols-2 lg:gap-6">
            {paradox.stats.map((stat, i) => (
              <Rack key={stat.source} stat={stat} register={registers[i]} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
