import { Parallax } from "@/components/motion/Parallax";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { MaybeImage } from "@/components/ui/MaybeImage";
import { PhoneFrame } from "@/components/ui/PhoneFrame";
import { SectionLabel } from "@/components/ui/SectionHeading";
import { hero } from "@/content/landing";
import { cn } from "@/lib/cn";
import { emphasize } from "@/lib/richText";

/** 떠 있는 옷 카드 위치 · 패럴랙스 속도 (앞의 2개만 모바일에서 보여요) */
const floatingLayout = [
  { position: "left-0 top-[8%]", rotate: "-rotate-6", speed: 0.22, delay: "[animation-delay:0s]" },
  { position: "right-0 bottom-[12%]", rotate: "rotate-6", speed: 0.38, delay: "[animation-delay:-2s]" },
  { position: "hidden md:block right-0 top-[4%]", rotate: "rotate-3", speed: 0.14, delay: "[animation-delay:-4s]" },
  { position: "hidden md:block left-[2%] bottom-[6%]", rotate: "-rotate-3", speed: 0.3, delay: "[animation-delay:-5.5s]" },
];

export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      data-sparkle="strong"
      className="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28 lg:pt-40 lg:pb-32"
    >
      <div className="mx-auto grid w-full max-w-6xl items-center gap-14 px-5 md:px-8 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
        <Reveal className="flex flex-col gap-6 md:gap-8">
          <SectionLabel>{hero.label}</SectionLabel>
          <h1
            id="hero-title"
            className="text-[40px] leading-[1.18] font-bold tracking-[-0.04em] md:text-[64px] lg:text-[72px]"
          >
            {hero.title.map((line, i) => (
              <span key={i} className="block">
                {emphasize(line)}
              </span>
            ))}
          </h1>
          <p className="max-w-md text-base leading-relaxed text-muted md:text-lg">
            {hero.description}
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <ButtonLink href={hero.primaryCta.href} variant="primary" size="lg">
              {hero.primaryCta.label}
            </ButtonLink>
            <ButtonLink href={hero.secondaryCta.href} variant="outline" size="lg">
              <span aria-hidden="true" className="text-accent">
                ▶
              </span>
              {hero.secondaryCta.label}
            </ButtonLink>
          </div>
        </Reveal>

        <div className="relative mx-auto h-[500px] w-full max-w-[400px] md:h-[640px] md:max-w-[600px]">
          <div
            aria-hidden="true"
            className="absolute top-1/2 left-1/2 size-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-surface/70 md:size-[480px]"
          />

          <div className="absolute top-1/2 left-1/2 w-[210px] -translate-x-1/2 -translate-y-1/2 md:w-[260px]">
            <Parallax anchor="page" speed={0.06}>
              <PhoneFrame {...hero.phone} priority />
            </Parallax>
          </div>

          {hero.floatingItems.map((item, i) => {
            const layout = floatingLayout[i % floatingLayout.length];
            return (
              <div key={item.name} className={cn("absolute z-10 w-[128px] md:w-[140px]", layout.position)}>
                <Parallax anchor="page" speed={layout.speed}>
                  <figure
                    className={cn(
                      "rounded-2xl bg-surface p-2 shadow-[0_24px_50px_-24px_rgba(20,20,20,0.35)] motion-safe:animate-float",
                      layout.rotate,
                      layout.delay,
                    )}
                  >
                    <div className="relative aspect-[4/5] overflow-hidden rounded-xl">
                      <MaybeImage src={item.image.src} alt={item.image.alt} sizes="160px" />
                    </div>
                    <figcaption className="px-1 pt-2 pb-1">
                      <span className="block text-[13px] font-semibold">{item.name}</span>
                      <span className="block text-[10px] font-medium tracking-wide whitespace-nowrap text-muted uppercase">
                        {item.tag}
                      </span>
                    </figcaption>
                  </figure>
                </Parallax>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
