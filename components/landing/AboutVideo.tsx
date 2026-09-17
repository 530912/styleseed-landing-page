import { Reveal } from "@/components/motion/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { maker } from "@/content/landing";

export function AboutVideo() {
  return (
    <Section id="video" labelledBy="video-title">
      <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
        <div className="flex flex-col gap-8 lg:col-span-5">
          <SectionHeading id="video-title" {...maker.heading} />
          <Reveal className="flex max-w-md flex-col gap-3 text-base leading-relaxed text-muted md:text-lg">
            {maker.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </Reveal>
        </div>

        <Reveal delay={0.1} className="lg:col-span-7">
          <div className="relative aspect-video w-full overflow-hidden rounded-[28px] bg-ink shadow-[0_40px_80px_-40px_rgba(20,20,20,0.5)]">
            <iframe
              src={maker.video.embedUrl}
              title={maker.video.title}
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="absolute inset-0 size-full border-0"
            />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
