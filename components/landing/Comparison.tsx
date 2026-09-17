import { Reveal } from "@/components/motion/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { comparison } from "@/content/landing";
import { emphasize } from "@/lib/richText";

export function Comparison() {
  const { current, styleseed } = comparison;

  return (
    <Section id="compare" labelledBy="compare-title">
      <SectionHeading id="compare-title" {...comparison.heading} />

      <div className="mt-14 grid gap-4 md:mt-20 md:grid-cols-2 md:gap-5">
        <Reveal as="article" className="flex flex-col rounded-[28px] bg-surface p-7 md:p-10">
          <p className="text-sm font-semibold text-muted">{current.eyebrow}</p>
          <h3 className="mt-2 text-2xl font-bold tracking-[-0.02em] md:text-[28px]">
            {current.title}
          </h3>
          <ul className="mt-10 flex flex-col">
            {current.items.map((item) => (
              <li key={item.action} className="border-t border-ink/10 py-5 last:pb-0">
                <p className="text-lg font-bold">{item.action}</p>
                <p className="mt-1.5 flex gap-2 text-base text-muted">
                  <span aria-hidden="true">→</span>
                  {item.result}
                </p>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal
          as="article"
          delay={0.12}
          className="flex flex-col rounded-[28px] bg-ink p-7 text-surface md:p-10"
        >
          <p className="text-sm font-semibold tracking-label text-surface/60">{styleseed.eyebrow}</p>
          <h3 className="mt-2 text-2xl font-bold tracking-[-0.02em] md:text-[28px]">
            {styleseed.title}
          </h3>
          <dl className="mt-10 flex flex-col">
            {styleseed.items.map((item) => (
              <div key={item.label} className="border-t border-surface/15 py-5">
                <dt className="flex items-center gap-2 text-xs font-semibold tracking-label text-surface/60">
                  <span aria-hidden="true" className="text-accent">
                    ✦
                  </span>
                  {item.label}
                </dt>
                <dd className="mt-1.5 text-lg font-bold">{item.description}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-auto border-t border-surface/15 pt-8 text-2xl leading-snug font-bold tracking-[-0.03em] text-balance md:text-[28px]">
            {emphasize(styleseed.closing)}
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
