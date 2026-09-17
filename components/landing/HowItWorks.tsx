import { MatchScoreGauge } from "@/components/landing/MatchScoreGauge";
import { Reveal } from "@/components/motion/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { how } from "@/content/landing";
import type { HowStep } from "@/content/landing";

export function HowItWorks() {
  return (
    <Section id="how" labelledBy="how-title">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <SectionHeading id="how-title" {...how.heading} />
          </div>
        </div>

        <ol className="flex flex-col gap-4 md:gap-5 lg:col-span-7">
          {how.steps.map((step: HowStep, i) => (
            <Reveal
              as="li"
              key={step.title}
              className="rounded-[28px] bg-surface p-7 md:p-9"
            >
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-col gap-3">
                  <span className="text-sm font-bold text-accent tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-xl font-bold tracking-[-0.02em] md:text-2xl">{step.title}</h3>
                  <p className="max-w-md text-base leading-relaxed text-muted">{step.description}</p>
                </div>
                {step.gauge && <MatchScoreGauge {...step.gauge} />}
              </div>

              {step.tags && (
                <ul className="mt-6 flex flex-wrap gap-2" aria-label={`${step.title} 항목`}>
                  {step.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-ink/10 bg-bg px-3 py-1.5 text-xs font-medium"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              )}
            </Reveal>
          ))}
        </ol>
      </div>
    </Section>
  );
}
