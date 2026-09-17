import Link from "next/link";
import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

type Variant = "primary" | "accent" | "outline" | "outlineLight" | "soft" | "ghost";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary: "bg-ink text-surface hover:bg-accent",
  accent: "bg-accent text-surface hover:bg-surface hover:text-ink",
  outline: "text-ink shadow-[inset_0_0_0_1.5px_var(--color-ink)] hover:bg-ink hover:text-surface",
  outlineLight:
    "text-surface shadow-[inset_0_0_0_1.5px_rgb(255_255_255/0.4)] hover:bg-surface hover:text-ink",
  soft: "bg-ink/[0.06] text-ink hover:bg-ink/[0.12]",
  ghost: "text-ink/75 hover:text-ink",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-6 text-[15px]",
  lg: "h-14 px-7 text-[15px]",
};

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  onClick?: () => void;
};

/** 링크형 버튼. `#video` 같은 같은 페이지 앵커는 <a>, 나머지는 Next Link를 써요. */
export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
  onClick,
}: ButtonLinkProps) {
  const classes = cn(
    "inline-flex shrink-0 items-center justify-center gap-2 rounded-full font-bold whitespace-nowrap transition-[background-color,color,transform] duration-200 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-accent",
    variants[variant],
    sizes[size],
    className,
  );

  if (href.startsWith("#")) {
    return (
      <a href={href} className={classes} onClick={onClick}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} onClick={onClick}>
      {children}
    </Link>
  );
}
