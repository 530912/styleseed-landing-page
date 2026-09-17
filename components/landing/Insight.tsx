import { Parallax } from "@/components/motion/Parallax";
import { Reveal } from "@/components/motion/Reveal";
import { MaybeImage } from "@/components/ui/MaybeImage";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { insight } from "@/content/landing";

/** Core 무드 이미지가 없을 때: 그 무드의 대표 색을 세로 띠로 */
function SwatchBands({ swatches }: { swatches: string[] }) {
  return (
    <div aria-hidden="true" className="flex h-full">
      {swatches.map((swatch) => (
        <span key={swatch} className="flex-1" style={{ backgroundColor: swatch }} />
      ))}
    </div>
  );
}

export function Insight() {
  return (
    <Section id="insight" labelledBy="insight-title" className="overflow-hidden">
      {/* 배경 레이어: 본문보다 느리게 이동 */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-[42%] md:top-[36%]">
        <Parallax speed={0.3}>
          <p className="text-outline text-right font-wide text-[28vw] leading-[0.8] font-black tracking-[-0.03em] whitespace-nowrap select-none font-stretch-[62%] lg:text-[300px]">
            {insight.backgroundWord}
          </p>
        </Parallax>
      </div>

      <div className="relative">
        <SectionHeading id="insight-title" {...insight.heading} />

        <ul className="-mx-[clamp(16px,4vw,48px)] mt-12 flex snap-x snap-mandatory gap-3 overflow-x-auto rail-inset scrollbar-none md:mt-16 md:gap-5 lg:mx-0 lg:grid lg:grid-cols-4 lg:overflow-visible lg:px-0">
          {insight.cores.map((core, i) => (
            <Reveal
              as="li"
              key={core.name}
              delay={i * 0.08}
              className="w-[76vw] shrink-0 snap-start sm:w-[46vw] lg:w-auto"
            >
              <article className="flex h-full flex-col rounded-card bg-surface p-3">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[18px]">
                  <MaybeImage
                    src={core.image.src}
                    alt={core.image.alt}
                    sizes="(min-width: 1024px) 300px, 76vw"
                    placeholder={<SwatchBands swatches={core.swatches} />}
                  />
                </div>
                <div className="flex flex-1 flex-col px-3 pt-5 pb-3">
                  <h3 className="font-wide text-[22px] leading-none font-extrabold tracking-[-0.02em] font-stretch-expanded">
                    {core.name}
                  </h3>
                  <p className="mt-2.5 mb-5 text-sm text-muted">{core.mood}</p>
                  <dl className="mt-auto grid grid-cols-[3.5rem_1fr] gap-x-2 gap-y-2 border-t border-ink/10 pt-4 text-sm">
                    <dt className="text-muted">컬러</dt>
                    <dd className="font-semibold">{core.colors}</dd>
                    <dt className="text-muted">소재</dt>
                    <dd className="font-semibold">{core.materials}</dd>
                    <dt className="text-muted">아이템</dt>
                    <dd className="font-semibold">{core.items}</dd>
                  </dl>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>

        <p className="mt-6 text-xs text-muted md:mt-8">{insight.source}</p>
      </div>
    </Section>
  );
}
