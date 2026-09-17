import { Parallax } from "@/components/motion/Parallax";
import { Reveal } from "@/components/motion/Reveal";
import { ScrollRail } from "@/components/motion/ScrollRail";
import { ButtonLink } from "@/components/ui/Button";
import { GarmentPlaceholder, garmentFromSrc } from "@/components/ui/GarmentPlaceholder";
import { MaybeImage } from "@/components/ui/MaybeImage";
import { PhoneFrame } from "@/components/ui/PhoneFrame";
import { SectionLabel } from "@/components/ui/SectionHeading";
import { hero, type ImageContent } from "@/content/landing";
import { cn } from "@/lib/cn";
import { emphasize } from "@/lib/richText";

/** 블랙 패널 안에 떠 있는 옷 태그 위치 · 패럴랙스 속도 (앞의 2개만 사용) */
const tagLayout = [
  { position: "left-[6%] top-[12%]", speed: 0.14 },
  { position: "right-[5%] bottom-[18%]", speed: 0.26 },
];

function GarmentImage({ image, sizes }: { image: ImageContent; sizes: string }) {
  const garment = garmentFromSrc(image.src);
  return (
    <MaybeImage
      src={image.src}
      alt={image.alt}
      sizes={sizes}
      placeholder={garment ? <GarmentPlaceholder garment={garment} /> : undefined}
    />
  );
}

export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      data-sparkle="strong"
      className="relative pt-20 md:pt-24"
    >
      <div className="container-page">
        <div className="grid gap-4 lg:min-h-[min(660px,calc(100svh-150px))] lg:grid-cols-12 lg:gap-6">
          <Reveal className="flex flex-col justify-between gap-10 py-4 lg:col-span-7 lg:py-6">
            <div>
              <SectionLabel>{hero.label}</SectionLabel>
              <h1
                id="hero-title"
                className="mt-6 text-[46px] leading-[1.04] font-extrabold tracking-[-0.065em] sm:text-[68px] lg:mt-7 lg:text-[clamp(64px,7.6vw,112px)]"
              >
                {hero.title.map((line, i) => (
                  <span key={i} className="block">
                    {emphasize(line)}
                  </span>
                ))}
              </h1>
            </div>

            <div className="flex flex-col gap-7 xl:flex-row xl:items-end xl:justify-between">
              <p className="max-w-[30ch] text-base leading-relaxed text-muted md:text-lg">
                {hero.description}
              </p>
              <div className="flex flex-wrap gap-2.5">
                <ButtonLink href={hero.primaryCta.href} variant="primary" size="lg">
                  {hero.primaryCta.label}
                </ButtonLink>
                <ButtonLink href={hero.secondaryCta.href} variant="soft" size="lg">
                  <span aria-hidden="true" className="text-xs text-accent">
                    ▶
                  </span>
                  {hero.secondaryCta.label}
                </ButtonLink>
              </div>
            </div>
          </Reveal>

          <div className="relative h-[clamp(440px,112vw,600px)] overflow-hidden rounded-card bg-ink lg:col-span-5 lg:h-auto">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-[0.16em] -left-[0.04em] font-wide text-[clamp(120px,15vw,230px)] leading-none font-black tracking-[-0.03em] whitespace-nowrap text-surface/[0.06] select-none font-stretch-[62%]"
            >
              STYLESEED
            </span>

            <div className="absolute top-1/2 left-1/2 w-[clamp(180px,17vw,250px)] -translate-x-1/2 -translate-y-1/2">
              <Parallax anchor="page" speed={-0.06}>
                <PhoneFrame {...hero.phone} priority />
              </Parallax>
            </div>

            {hero.floatingItems.slice(0, tagLayout.length).map((item, i) => (
              <div key={item.name} aria-hidden="true" className={cn("absolute z-10", tagLayout[i].position)}>
                <Parallax anchor="page" speed={tagLayout[i].speed}>
                  <div className="flex items-center gap-2.5 rounded-full bg-surface py-2 pr-4 pl-2 text-ink shadow-[0_18px_40px_-20px_rgba(0,0,0,0.6)]">
                    <span className="relative size-7 shrink-0 overflow-hidden rounded-full">
                      <GarmentImage image={item.image} sizes="28px" />
                    </span>
                    <span className="text-[13px] font-bold whitespace-nowrap">{item.name}</span>
                    <span className="hidden font-wide text-[11px] whitespace-nowrap text-muted font-stretch-semi-expanded sm:inline">
                      {item.tag}
                    </span>
                  </div>
                </Parallax>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ScrollRail label="옷장 속 옷" className="mt-4 lg:mt-6">
        {hero.floatingItems.map((item) => (
          <li
            key={item.name}
            className="w-[72vw] shrink-0 snap-start rounded-card bg-surface p-3 sm:w-[44vw] lg:w-[clamp(280px,31vw,440px)]"
          >
            <figure>
              <div className="relative aspect-[5/4] overflow-hidden rounded-[18px]">
                <GarmentImage image={item.image} sizes="(min-width: 1024px) 440px, 72vw" />
              </div>
              <figcaption className="flex items-baseline justify-between gap-3 px-2 pt-4 pb-1.5">
                <span className="text-lg font-bold tracking-[-0.02em]">{item.name}</span>
                <span className="font-wide text-xs font-semibold whitespace-nowrap text-muted font-stretch-expanded">
                  {item.tag}
                </span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ScrollRail>
    </section>
  );
}
