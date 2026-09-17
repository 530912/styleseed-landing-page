import Link from "next/link";

import { cn } from "@/lib/cn";
import { routes, siteConfig } from "@/lib/site";

export function Logo({
  tone = "light",
  className,
}: {
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <Link
      href={routes.home}
      aria-label={`${siteConfig.name} 홈`}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-sm font-wide text-[17px] font-black tracking-[-0.01em] font-stretch-expanded",
        tone === "light" ? "text-ink" : "text-surface",
        className,
      )}
    >
      <span aria-hidden="true" className="text-accent">
        ✦
      </span>
      {siteConfig.name}
    </Link>
  );
}
