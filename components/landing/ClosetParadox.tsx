import { ClosetRacks } from "@/components/landing/ClosetRacks";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { paradox } from "@/content/landing";
import { emphasize } from "@/lib/richText";

export function ClosetParadox() {
  return (
    <section
      id="paradox"
      aria-labelledby="paradox-title"
      className="relative scroll-mt-16 pt-20 pb-20 md:pt-28 md:pb-28 lg:pt-32 lg:pb-32"
    >
      <ClosetRacks heading={<SectionHeading id="paradox-title" {...paradox.heading} />} />

      <div className="container-page">
        <Reveal className="mt-4 grid gap-6 rounded-card bg-ink px-6 py-10 text-surface md:px-12 md:py-16 lg:mt-6 lg:grid-cols-12 lg:items-end lg:gap-8 lg:px-16 lg:py-20">
          <blockquote className="lg:col-span-7">
            <p className="text-[36px] leading-[1.1] font-extrabold tracking-[-0.06em] md:text-[60px] lg:text-[clamp(56px,6vw,84px)]">
              {paradox.quote.text}
            </p>
          </blockquote>
          <p className="text-base leading-relaxed text-surface/70 md:text-lg lg:col-span-5 lg:text-xl">
            {emphasize(paradox.quote.body, "font-bold text-accent")}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
