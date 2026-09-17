"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { pricing, type BillingCycle } from "@/content/landing";
import { cn } from "@/lib/cn";

const cycles: BillingCycle[] = ["monthly", "yearly"];

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className={cn("mt-1 size-4 shrink-0", className)}>
      <path d="M3 8.5 6.5 12 13 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Pricing() {
  const [cycle, setCycle] = useState<BillingCycle>("monthly");
  const { free, plus } = pricing;
  const plusPrice = plus.prices[cycle];

  return (
    <Section id="pricing" labelledBy="pricing-title">
      <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading id="pricing-title" {...pricing.heading} />

        <div
          role="group"
          aria-label="PLUS 결제 주기"
          className="inline-flex w-fit shrink-0 rounded-full bg-surface p-1"
        >
          {cycles.map((option) => (
            <button
              key={option}
              type="button"
              aria-pressed={cycle === option}
              onClick={() => setCycle(option)}
              className={cn(
                "h-10 rounded-full px-5 text-sm font-semibold transition-colors",
                cycle === option ? "bg-ink text-surface" : "text-muted hover:text-ink",
              )}
            >
              {pricing.cycleLabels[option]}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-14 grid gap-4 md:mt-20 md:grid-cols-2 md:gap-5">
        <Reveal as="article" className="flex flex-col rounded-[28px] bg-surface p-7 md:p-10">
          <h3 className="text-sm font-bold tracking-label uppercase">{free.name}</h3>
          <p className="mt-6 flex h-16 items-end">
            <span className="text-5xl font-bold tracking-[-0.04em] md:text-6xl">{free.price}</span>
          </p>
          <ul className="mt-10 flex flex-col gap-3 border-t border-ink/10 pt-8">
            {free.features.map((feature) => (
              <li key={feature} className="flex gap-3 text-base">
                <CheckIcon className="text-muted" />
                {feature}
              </li>
            ))}
          </ul>
          <div className="mt-12 flex flex-col gap-4 md:mt-auto md:pt-12">
            <ButtonLink href={free.cta.href} variant="outline" size="lg" className="w-full">
              {free.cta.label}
            </ButtonLink>
            {/* PLUS 카드의 안내 문구와 버튼 높이를 맞추기 위한 자리 */}
            <p aria-hidden="true" className="invisible hidden text-xs md:block">
              &nbsp;
            </p>
          </div>
        </Reveal>

        <Reveal
          as="article"
          delay={0.12}
          className="flex flex-col rounded-[28px] bg-ink p-7 text-surface md:p-10"
        >
          <h3 className="flex items-center gap-2 text-sm font-bold tracking-label uppercase">
            {plus.name}
            <span aria-hidden="true" className="text-accent">
              ✦
            </span>
          </h3>
          <p className="mt-6 flex h-16 items-end gap-2" aria-live="polite">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={cycle}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="flex items-end gap-2"
              >
                <span className="text-5xl font-bold tracking-[-0.04em] md:text-6xl">
                  {plusPrice.amount}
                </span>
                <span className="pb-1.5 text-base text-surface/60">/ {plusPrice.unit}</span>
              </motion.span>
            </AnimatePresence>
          </p>
          <ul className="mt-10 flex flex-col gap-3 border-t border-surface/15 pt-8">
            {plus.features.map((feature) => (
              <li key={feature} className="flex gap-3 text-base">
                <CheckIcon className="text-accent" />
                {feature}
              </li>
            ))}
          </ul>
          <div className="mt-12 flex flex-col gap-4 md:mt-auto md:pt-12">
            <ButtonLink href={plus.cta.href} variant="accent" size="lg" className="w-full">
              {plus.cta.label}
            </ButtonLink>
            <p className="text-center text-xs text-surface/60">{plus.note}</p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
