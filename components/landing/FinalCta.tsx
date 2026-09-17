import { Parallax } from "@/components/motion/Parallax";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionHeading";
import { finalCta } from "@/content/landing";
import { emphasize } from "@/lib/richText";

export function FinalCta() {
  return (
    <section id="start" aria-labelledby="start-title" className="scroll-mt-16 pb-20 container-page md:pb-28">
      <Reveal className="relative flex min-h-[400px] flex-col justify-between gap-12 overflow-hidden rounded-card bg-ink px-6 pt-10 pb-8 text-surface md:min-h-[560px] md:px-12 md:pt-14 md:pb-12 lg:px-16 lg:pt-16 lg:pb-16">
        {/* 히어로 패널과 같은 세로로 좁은 워드마크로 페이지를 닫아요 */}
        <div aria-hidden="true" className="pointer-events-none absolute -right-[0.04em] -bottom-[0.2em] select-none">
          <Parallax speed={0.1}>
            <span className="block font-wide text-[clamp(120px,20vw,290px)] leading-none font-black tracking-[-0.03em] whitespace-nowrap text-surface/[0.06] font-stretch-[62%]">
              STYLESEED
            </span>
          </Parallax>
        </div>

        <div className="relative">
          <SectionLabel tone="dark">{finalCta.label}</SectionLabel>
          <h2
            id="start-title"
            className="mt-6 text-[44px] leading-[1.08] font-extrabold tracking-[-0.06em] md:text-[72px] lg:text-[clamp(72px,7.6vw,112px)]"
          >
            {finalCta.title.map((line, i) => (
              <span key={i} className="block">
                {emphasize(line)}
              </span>
            ))}
          </h2>
        </div>

        <ButtonLink href={finalCta.cta.href} variant="accent" size="lg" className="relative w-fit">
          {finalCta.cta.label}
        </ButtonLink>
      </Reveal>
    </section>
  );
}
