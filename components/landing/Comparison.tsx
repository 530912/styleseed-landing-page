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

      <div className="mt-12 grid gap-4 md:mt-16 lg:grid-cols-12 lg:gap-6">
        <Reveal as="article" className="flex flex-col rounded-card bg-surface p-6 md:p-10 lg:col-span-5">
          <p className="text-sm font-semibold text-muted">{current.eyebrow}</p>
          <h3 className="mt-2 text-2xl font-extrabold tracking-[-0.04em] md:text-[32px]">
            {current.title}
          </h3>
          <ul className="mt-8 flex flex-col md:mt-12">
            {current.items.map((item) => (
              <li key={item.action} className="border-t border-ink/10 py-5 last:pb-0">
                <p className="text-lg font-bold line-through decoration-accent/70 decoration-2">
                  {item.action}
                </p>
                <p className="mt-1.5 text-base leading-relaxed text-muted">{item.result}</p>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal
          as="article"
          delay={0.12}
          className="relative flex flex-col overflow-hidden rounded-card bg-ink p-6 text-surface md:p-10 lg:col-span-7 lg:p-12"
        >
          <p className="font-wide text-sm font-extrabold font-stretch-expanded">
            <span aria-hidden="true" className="mr-1.5 text-accent">
              ✦
            </span>
            {styleseed.eyebrow}
          </p>
          <h3 className="mt-2 text-2xl font-extrabold tracking-[-0.04em] md:text-[32px]">
            {styleseed.title}
          </h3>

          <dl className="mt-8 grid gap-px overflow-hidden rounded-[20px] bg-surface/15 md:mt-12 md:grid-cols-3">
            {styleseed.items.map((item) => (
              <div key={item.label} className="flex flex-col gap-6 bg-ink p-5 md:min-h-[168px] md:justify-between md:p-6">
                <dt className="font-wide text-[11px] font-bold tracking-label text-surface/60 font-stretch-expanded">
                  {item.label}
                </dt>
                <dd className="text-lg leading-snug font-bold tracking-[-0.02em]">{item.description}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-10 text-[28px] leading-[1.15] font-extrabold tracking-[-0.05em] text-balance md:mt-auto md:pt-12 md:text-[44px]">
            {emphasize(styleseed.closing)}
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
