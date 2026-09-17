import { Reveal } from "@/components/motion/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { features } from "@/content/landing";
import { cn } from "@/lib/cn";

/** 벤토 그리드: 1280px에서 위 3개 · 아래 2개, 768px에서 2열 + 마지막 카드 전체 너비 */
const spans = [
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-3",
  "md:col-span-2 lg:col-span-3",
];

export function Features() {
  return (
    <Section id="features" labelledBy="features-title">
      <SectionHeading id="features-title" {...features.heading} />

      <ul className="mt-14 grid gap-4 md:mt-20 md:grid-cols-2 md:gap-5 lg:grid-cols-6">
        {features.items.map((item, i) => {
          const dark = "highlight" in item && item.highlight;
          return (
            <Reveal
              as="li"
              key={item.title}
              delay={(i % 3) * 0.08}
              className={cn(
                "flex flex-col justify-between gap-8 md:min-h-[240px] md:gap-10 rounded-[28px] p-7 md:p-9",
                dark ? "bg-ink text-surface" : "bg-surface",
                spans[i],
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  "text-sm font-bold tabular-nums",
                  dark ? "text-surface/50" : "text-muted",
                )}
              >
                {String(i + 1).padStart(2, "0")}
                <span className="ml-2 text-accent">✦</span>
              </span>
              <div>
                <h3 className="text-2xl font-bold tracking-[-0.02em] md:text-[28px]">
                  {item.title}
                </h3>
                <p
                  className={cn(
                    "mt-3 max-w-md text-base leading-relaxed",
                    dark ? "text-surface/70" : "text-muted",
                  )}
                >
                  {item.description}
                </p>
              </div>
            </Reveal>
          );
        })}
      </ul>
    </Section>
  );
}
