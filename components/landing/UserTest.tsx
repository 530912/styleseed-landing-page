import { MetricBar } from "@/components/landing/MetricBar";
import { CountUp } from "@/components/motion/CountUp";
import { Reveal } from "@/components/motion/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { userTest } from "@/content/landing";
import { cn } from "@/lib/cn";

export function UserTest() {
  return (
    <Section id="user-test" labelledBy="user-test-title">
      <SectionHeading id="user-test-title" {...userTest.heading} />

      <Reveal className="mt-12 rounded-card bg-ink p-2 text-surface md:mt-16 md:p-3">
        <ul className="grid grid-cols-2 lg:grid-cols-4">
          {userTest.metrics.map((metric, i) => (
            <li
              key={metric.label}
              className={cn(
                "flex flex-col gap-4 border-surface/15 p-4 md:p-8",
                i % 2 === 1 && "border-l",
                i >= 2 && "border-t lg:border-t-0",
                i === 2 && "lg:border-l",
              )}
            >
              <CountUp
                value={metric.value}
                suffix={metric.suffix}
                className="font-wide text-[44px] leading-[0.9] font-extrabold tracking-[-0.05em] font-stretch-expanded md:text-[72px] lg:text-[clamp(56px,5.4vw,80px)]"
                suffixClassName="ml-0.5 text-[0.42em] tracking-normal text-accent"
              />
              <MetricBar value={metric.value} />
              <p className="text-sm leading-snug text-surface/70 md:text-base">{metric.label}</p>
            </li>
          ))}
        </ul>
      </Reveal>

      <p className="mt-5 text-xs text-muted">{userTest.method}</p>

      <Reveal className="mt-12 flex items-start gap-3 border-t border-ink/15 pt-8 md:mt-16">
        <span aria-hidden="true" className="leading-8 text-accent">
          ✦
        </span>
        <p className="text-lg leading-8 font-bold tracking-[-0.02em] md:text-2xl md:leading-9">
          {userTest.partners}
        </p>
      </Reveal>
    </Section>
  );
}
