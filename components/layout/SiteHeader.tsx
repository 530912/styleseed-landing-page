"use client";

import { useMotionValueEvent, useScroll } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

import { HeaderAuthActions } from "@/components/layout/HeaderAuthActions";
import { Logo } from "@/components/layout/Logo";
import { cn } from "@/lib/cn";
import { mainNav } from "@/lib/site";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 8));

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);
  const solid = scrolled || menuOpen;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter] duration-300",
        solid ? "bg-bg/85 backdrop-blur-md" : "bg-transparent",
      )}
    >
      <div className="flex h-16 items-center justify-between container-page">
        <Logo />

        <nav aria-label="주요 메뉴" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="rounded-full px-3.5 py-2 text-sm font-medium text-ink/70 transition-colors hover:text-ink"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden md:block">
          <HeaderAuthActions />
        </div>

        <button
          type="button"
          className="-mr-2 inline-flex size-11 items-center justify-center rounded-full md:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "메뉴 닫기" : "메뉴 열기"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span aria-hidden="true" className="relative block h-3 w-5">
            <span
              className={cn(
                "absolute left-0 h-[1.5px] w-5 bg-ink transition-transform duration-300",
                menuOpen ? "top-1/2 rotate-45" : "top-0",
              )}
            />
            <span
              className={cn(
                "absolute left-0 h-[1.5px] w-5 bg-ink transition-transform duration-300",
                menuOpen ? "top-1/2 -rotate-45" : "top-full",
              )}
            />
          </span>
        </button>
      </div>

      <div
        id="mobile-menu"
        hidden={!menuOpen}
        className="border-t border-ink/10 bg-bg px-4 pt-4 pb-8 md:hidden"
      >
        <nav aria-label="모바일 메뉴">
          <ul className="flex flex-col">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={closeMenu}
                  className="block py-3 text-[28px] font-extrabold tracking-[-0.04em] text-ink"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-6">
          <HeaderAuthActions layout="stacked" onNavigate={closeMenu} />
        </div>
      </div>
    </header>
  );
}
