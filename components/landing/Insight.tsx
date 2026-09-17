import { Parallax } from "@/components/motion/Parallax";
import { Reveal } from "@/components/motion/Reveal";
import { MaybeImage } from "@/components/ui/MaybeImage";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { insight } from "@/content/landing";

export function Insight() {
  return (
    <Section id="insight" labelledBy="insight-title" className="overflow-hidden">
      {/* 배경 레이어: 서로 다른 속도로 천천히 이동 */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <Parallax speed={0.5} className="absolute top-[18%] -right-[10%] md:right-[2%]">
          <div className="size-[320px] rounded-full bg-accent/10 blur-3xl md:size-[520px]" />
        </Parallax>
        <Parallax speed={0.25} className="absolute top-0 left-0 w-full">
          <p className="text-outline text-[22vw] leading-none font-black tracking-[-0.05em] whitespace-nowrap select-none lg:text-[200px]">
            {insight.backgroundWord}
          </p>
        </Parallax>
      </div>

      <div className="relative">
        <SectionHeading id="insight-title" {...insight.heading} />

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 md:mt-20 md:gap-5 lg:grid-cols-4">
          {insight.cores.map((core, i) => (
            <Reveal as="li" key={core.name} delay={i * 0.08}>
              <article className="group h-full rounded-[28px] bg-surface p-3 transition-transform duration-500 ease-out hover:scale-[1.03] motion-reduce:transition-none motion-reduce:hover:scale-100">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[20px]">
                  <MaybeImage
                    src={core.image.src}
                    alt={core.image.alt}
                    sizes="(min-width: 1024px) 270px, (min-width: 640px) 50vw, 100vw"
                  />
                  <div className="absolute bottom-3 left-3 flex gap-1.5" aria-hidden="true">
                    {core.swatches.map((swatch) => (
                      <span
                        key={swatch}
                        className="size-4 rounded-full ring-2 ring-surface"
                        style={{ backgroundColor: swatch }}
                      />
                    ))}
                  </div>
                </div>
                <div className="px-3 pt-5 pb-3">
                  <h3 className="text-xl font-extrabold tracking-[0.08em]">{core.name}</h3>
                  <p className="mt-1.5 text-sm text-muted">{core.mood}</p>
                  <dl className="mt-5 grid grid-cols-[3.5rem_1fr] gap-x-2 gap-y-2 border-t border-ink/10 pt-4 text-sm">
                    <dt className="text-muted">컬러</dt>
                    <dd className="font-medium">{core.colors}</dd>
                    <dt className="text-muted">소재</dt>
                    <dd className="font-medium">{core.materials}</dd>
                    <dt className="text-muted">아이템</dt>
                    <dd className="font-medium">{core.items}</dd>
                  </dl>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>

        <p className="mt-8 text-xs text-muted">{insight.source}</p>
      </div>
    </Section>
  );
}
