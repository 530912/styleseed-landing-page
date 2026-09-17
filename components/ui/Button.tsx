import Link from "next/link";
import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

type Variant = "primary" | "accent" | "outline" | "outlineLight" | "ghost";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary: "bg-ink text-surface hover:bg-ink/85",
  accent: "bg-accent text-surface hover:brightness-110",
  outline: "border border-ink/20 text-ink hover:border-ink hover:bg-ink/5",
  outlineLight:
    "border border-surface/25 text-surface hover:border-surface hover:bg-surface/10",
  ghost: "text-ink hover:bg-ink/5",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-6 text-[15px]",
  lg: "h-14 px-7 text-base",
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
    "inline-flex shrink-0 items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition-[background-color,border-color,filter,transform] duration-200 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-accent",
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
