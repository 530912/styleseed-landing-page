import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { CursorSparkles } from "@/components/motion/CursorSparkles";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { SmoothScroll } from "@/components/motion/SmoothScroll";

/** 공개 영역 레이아웃: 헤더 · 푸터 · 부드러운 스크롤 · 마우스 파티클 */
export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <MotionProvider>
      <SmoothScroll>
        <a
          href="#main"
          className="sr-only rounded-full bg-ink px-4 py-2 text-sm font-semibold text-surface focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[80]"
        >
          본문으로 건너뛰기
        </a>
        <SiteHeader />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <SiteFooter />
      </SmoothScroll>
      <CursorSparkles />
    </MotionProvider>
  );
}
