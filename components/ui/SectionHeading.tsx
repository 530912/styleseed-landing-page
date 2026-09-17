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

/** 로즈핑크 짧은 선 + 넓은 영문 라벨 */
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
        "flex items-center gap-2.5 font-wide text-[11px] font-bold tracking-label uppercase font-stretch-expanded md:text-xs",
        tone === "light" ? "text-ink" : "text-surface",
        className,
      )}
    >
      <span aria-hidden="true" className="h-0.5 w-7 shrink-0 bg-accent" />
      {children}
    </p>
  );
}

/** 영문 라벨 + 두 줄 제목(`**강조**` 부분만 로즈핑크) + 선택 설명 */
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
          "text-[34px] leading-[1.14] font-extrabold tracking-[-0.05em] md:text-[52px] lg:text-[64px]",
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
