import { MatchScoreGauge } from "@/components/landing/MatchScoreGauge";
import { Reveal } from "@/components/motion/Reveal";
import { ScrollProgressLine } from "@/components/motion/ScrollProgressLine";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { how } from "@/content/landing";
import type { HowStep } from "@/content/landing";

export function HowItWorks() {
  return (
    <Section id="how" labelledBy="how-title">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <div className="tall:sticky tall:top-28">
            <SectionHeading id="how-title" {...how.heading} />
          </div>
        </div>

        <ScrollProgressLine className="lg:col-span-7">
          <ol className="flex flex-col gap-3 md:gap-4">
            {how.steps.map((step: HowStep, i) => (
              <Reveal
                as="li"
                key={step.title}
                delay={0.05}
                className="rounded-card bg-surface p-6 md:p-9"
              >
                <div className="grid gap-x-6 gap-y-4 sm:grid-cols-[auto_1fr]">
                  <span
                    aria-hidden="true"
                    className="font-wide text-[40px] leading-[0.85] font-extrabold tracking-[-0.04em] text-ink/15 tabular-nums font-stretch-expanded md:text-[56px]"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-xl font-bold tracking-[-0.03em] md:text-[26px]">
                      {step.title}
                    </h3>
                    <p className="mt-2 max-w-md text-base leading-relaxed text-muted">{step.description}</p>

                    {step.tags && (
                      <ul className="mt-5 flex flex-wrap gap-1.5" aria-label={`${step.title} 항목`}>
                        {step.tags.map((tag) => (
                          <li
                            key={tag}
                            className="rounded-full bg-bg px-3 py-1.5 text-xs font-semibold"
                          >
                            {tag}
                          </li>
                        ))}
                      </ul>
                    )}

                    {step.gauge && (
                      <div className="mt-5 max-w-md">
                        <MatchScoreGauge {...step.gauge} />
                      </div>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </ScrollProgressLine>
      </div>
    </Section>
  );
}
