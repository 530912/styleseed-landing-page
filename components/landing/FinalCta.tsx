import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionHeading";
import { finalCta } from "@/content/landing";
import { emphasize } from "@/lib/richText";

export function FinalCta() {
  return (
    <section
      id="start"
      aria-labelledby="start-title"
      className="mx-auto w-full max-w-6xl px-5 pb-24 md:px-8 md:pb-32"
    >
      <Reveal className="relative flex flex-col items-center gap-8 overflow-hidden rounded-[36px] bg-ink px-6 py-20 text-center text-surface md:gap-10 md:py-28">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-10 -bottom-16 text-[200px] leading-none text-accent/15 select-none md:-top-10 md:-right-6 md:bottom-auto md:text-[320px]"
        >
          ✦
        </span>
        <SectionLabel tone="dark" className="justify-center">
          {finalCta.label}
        </SectionLabel>
        <h2
          id="start-title"
          className="relative text-[34px] leading-[1.22] font-bold tracking-[-0.04em] md:text-[56px] lg:text-[64px]"
        >
          {finalCta.title.map((line, i) => (
            <span key={i} className="block">
              {emphasize(line)}
            </span>
          ))}
        </h2>
        <ButtonLink href={finalCta.cta.href} variant="accent" size="lg" className="relative">
          {finalCta.cta.label}
        </ButtonLink>
      </Reveal>
    </section>
  );
}
