import { Reveal } from "@/components/motion/Reveal";
import type { SectionHeadingContent } from "@/content/landing";
import { cn } from "@/lib/cn";
import { emphasize } from "@/lib/richText";

type SectionHeadingProps = SectionHeadingContent & {
  id?: string;
  as?: "h1" | "h2";
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
};

export function SectionLabel({
  children,
  tone = "light",
  className,
}: {
  children: string;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <p
      className={cn(
        "flex items-center gap-2 text-[11px] font-semibold uppercase tracking-label md:text-xs",
        tone === "light" ? "text-muted" : "text-surface/60",
        className,
      )}
    >
      <span aria-hidden="true" className="text-accent">
        ✦
      </span>
      {children}
    </p>
  );
}

/** 영문 대문자 라벨 + 두 줄 제목(`**강조**` 부분만 로즈핑크) + 선택 설명 */
export function SectionHeading({
  id,
  label,
  title,
  description,
  as: Heading = "h2",
  align = "left",
  tone = "light",
  className,
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        "flex flex-col gap-5 md:gap-6",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      <SectionLabel tone={tone} className={align === "center" ? "justify-center" : undefined}>
        {label}
      </SectionLabel>
      <Heading
        id={id}
        className={cn(
          "text-[32px] leading-[1.25] font-bold tracking-[-0.035em] md:text-5xl md:leading-[1.2] lg:text-[56px]",
          tone === "light" ? "text-ink" : "text-surface",
        )}
      >
        {title.map((line, i) => (
          <span key={i} className="block">
            {emphasize(line)}
          </span>
        ))}
      </Heading>
      {description && (
        <p
          className={cn(
            "max-w-xl text-base leading-relaxed md:text-lg",
            tone === "light" ? "text-muted" : "text-surface/70",
          )}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}
