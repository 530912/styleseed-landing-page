"use client";

import { useState } from "react";

import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { pricing, type BillingCycle } from "@/content/landing";
import { cn } from "@/lib/cn";

const cycles: BillingCycle[] = ["monthly", "yearly"];

function FeatureList({ items, tone }: { items: string[]; tone: "light" | "dark" }) {
  return (
    <ul className="flex flex-col gap-3">
      {items.map((feature) => (
        <li key={feature} className="flex gap-3 text-base leading-normal">
          <span
            aria-hidden="true"
            className={cn(
              "mt-2 size-2 shrink-0 rounded-full",
              tone === "light" ? "bg-ink/30" : "bg-accent",
            )}
          />
          {feature}
        </li>
      ))}
    </ul>
  );
}

const planName = "font-wide text-xl font-extrabold tracking-[-0.01em] font-stretch-expanded";
const priceText =
  "font-wide text-[46px] leading-[1.05] font-extrabold tracking-[-0.05em] font-stretch-semi-expanded md:text-[72px] lg:text-[clamp(64px,6.4vw,92px)]";

export function Pricing() {
  const [cycle, setCycle] = useState<BillingCycle>("monthly");
  const { free, plus } = pricing;
  const plusPrice = plus.prices[cycle];

  return (
    <Section id="pricing" labelledBy="pricing-title">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading id="pricing-title" {...pricing.heading} />

        {/* 결제 주기 스위치: 검은 알약이 선택한 쪽으로 미끄러져요 */}
        <div
          role="group"
          aria-label="PLUS 결제 주기"
          className="relative grid w-fit shrink-0 grid-cols-2 rounded-full bg-surface p-1.5"
        >
          <span
            aria-hidden="true"
            className={cn(
              "absolute inset-y-1.5 left-1.5 w-[calc(50%-6px)] rounded-full bg-ink transition-transform duration-400 ease-[cubic-bezier(0.2,0.7,0.1,1)] motion-reduce:transition-none",
              cycle === "yearly" && "translate-x-full",
            )}
          />
          {cycles.map((option) => (
            <button
              key={option}
              type="button"
              aria-pressed={cycle === option}
              onClick={() => setCycle(option)}
              className={cn(
                "relative h-11 min-w-[92px] rounded-full px-5 text-sm font-bold transition-colors duration-300",
                cycle === option ? "text-surface" : "text-muted hover:text-ink",
              )}
            >
              {pricing.cycleLabels[option]}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-12 grid gap-4 md:mt-16 lg:grid-cols-12 lg:gap-6">
        <Reveal as="article" className="flex flex-col rounded-card bg-surface p-6 md:p-10 lg:col-span-5 lg:p-12">
          <h3 className={planName}>{free.name}</h3>
          <p className={cn("mt-6", priceText)}>{free.price}</p>
          <div className="mt-8 border-t border-ink/10 pt-8">
            <FeatureList items={free.features} tone="light" />
          </div>
          <div className="mt-10 lg:mt-auto lg:pt-12">
            <ButtonLink href={free.cta.href} variant="outline" size="lg" className="w-full">
              {free.cta.label}
            </ButtonLink>
          </div>
        </Reveal>

        <Reveal
          as="article"
          delay={0.12}
          className="flex flex-col rounded-card bg-ink p-6 text-surface md:p-10 lg:col-span-7 lg:p-12"
        >
          <h3 className={planName}>
            {plus.name}
            <span aria-hidden="true" className="ml-1.5 text-accent">
              ✦
            </span>
          </h3>

          {/* 가격 오도미터: 월간 ↔ 연간이 위아래로 굴러요 */}
          <p className="mt-6">
            <span className="sr-only" aria-live="polite">
              {plusPrice.amount} / {plusPrice.unit}
            </span>
            <span aria-hidden="true" className={cn("block h-[1.05em] overflow-hidden", priceText)}>
              <span
                className={cn(
                  "flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.2,0.7,0.1,1)] motion-reduce:transition-none",
                  cycle === "yearly" && "-translate-y-1/2",
                )}
              >
                {cycles.map((option) => (
                  <span key={option} className="flex h-[1.05em] items-baseline whitespace-nowrap">
                    {plus.prices[option].amount}
                    <span className="ml-3 font-sans text-base font-medium tracking-normal text-surface/60 md:text-lg">
                      / {plus.prices[option].unit}
                    </span>
                  </span>
                ))}
              </span>
            </span>
          </p>

          <div className="mt-8 border-t border-surface/15 pt-8">
            <FeatureList items={plus.features} tone="dark" />
          </div>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5 lg:mt-auto lg:pt-12">
            <ButtonLink href={plus.cta.href} variant="accent" size="lg" className="w-full sm:w-auto">
              {plus.cta.label}
            </ButtonLink>
            <p className="text-center text-xs text-surface/60 sm:text-left">{plus.note}</p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
