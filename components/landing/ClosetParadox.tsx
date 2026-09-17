import { CountUp } from "@/components/motion/CountUp";
import { Reveal } from "@/components/motion/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { paradox } from "@/content/landing";
import { emphasize } from "@/lib/richText";

export function ClosetParadox() {
  return (
    <Section id="paradox" labelledBy="paradox-title">
      <SectionHeading id="paradox-title" {...paradox.heading} />

      <div className="mt-14 grid gap-4 md:mt-20 md:grid-cols-2 md:gap-5 lg:grid-cols-3">
        {paradox.stats.map((stat, i) => (
          <Reveal
            key={stat.source}
            as="article"
            delay={i * 0.1}
            className="flex flex-col justify-between rounded-[28px] bg-surface md:min-h-[320px] p-7 md:p-9"
          >
            <div>
              <CountUp
                value={stat.value}
                suffix={stat.suffix}
                className="block text-[88px] leading-none font-bold tracking-[-0.05em] md:text-[104px]"
                suffixClassName="ml-1 text-[0.45em] tracking-normal text-accent"
              />
              <h3 className="mt-6 text-lg font-bold md:text-xl">{stat.title}</h3>
              <p className="mt-1 text-base text-muted">{stat.meta}</p>
            </div>
            <p className="mt-8 border-t border-ink/10 pt-4 text-xs leading-relaxed text-muted">
              {stat.source}
            </p>
          </Reveal>
        ))}

        <Reveal
          delay={0.2}
          className="flex flex-col justify-between gap-6 rounded-[28px] bg-ink md:min-h-[320px] md:gap-10 p-7 text-surface md:col-span-2 md:p-9 lg:col-span-1"
        >
          <blockquote>
            <p className="text-[28px] leading-snug font-bold tracking-[-0.03em] md:text-[32px]">
              {paradox.quote.text}
            </p>
          </blockquote>
          <p className="text-lg leading-relaxed text-surface/70 md:text-xl">
            {emphasize(paradox.quote.body, "font-bold text-accent")}
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
