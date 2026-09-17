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

      <Reveal className="mt-14 rounded-[28px] bg-ink p-3 text-surface md:mt-20">
        <ul className="grid grid-cols-2 lg:grid-cols-4">
          {userTest.metrics.map((metric, i) => (
            <li
              key={metric.label}
              className={cn(
                "flex flex-col gap-3 border-surface/15 p-5 md:p-8",
                i % 2 === 1 && "border-l",
                i >= 2 && "border-t lg:border-t-0",
                i === 2 && "lg:border-l",
              )}
            >
              <CountUp
                value={metric.value}
                suffix={metric.suffix}
                className="text-[56px] leading-none font-bold tracking-[-0.05em] md:text-[80px]"
                suffixClassName="ml-0.5 text-[0.5em] tracking-normal text-accent"
              />
              <p className="text-sm leading-snug text-surface/70 md:text-base">{metric.label}</p>
            </li>
          ))}
        </ul>
      </Reveal>

      <p className="mt-5 text-xs text-muted">{userTest.method}</p>

      <Reveal className="mt-14 flex items-start gap-3 border-t border-ink/10 pt-8 md:mt-20">
        <span aria-hidden="true" className="text-accent">
          ✦
        </span>
        <p className="text-lg font-semibold md:text-xl">{userTest.partners}</p>
      </Reveal>
    </Section>
  );
}
