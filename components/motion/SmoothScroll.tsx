"use client";

import Lenis from "lenis";
import "lenis/dist/lenis.css";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

const LenisContext = createContext<Lenis | null>(null);

/** 모달 등에서 스크롤을 멈추고 싶을 때 lenis.stop() / lenis.start() 로 사용해요. */
export const useLenis = () => useContext(LenisContext);

/**
 * Lenis 부드러운 스크롤 + 같은 페이지 앵커(/#how, #video 등) 클릭 시 부드럽게 이동.
 * prefers-reduced-motion 이면 Lenis가 스스로 즉시 스크롤로 바꿔요.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    const instance = new Lenis({ autoRaf: true, lerp: 0.1 });
    // eslint-disable-next-line react-hooks/set-state-in-effect -- 외부 인스턴스를 컨텍스트로 공유
    setLenis(instance);

    // 다른 페이지에서 /#pricing 으로 들어왔을 때 위치 맞추기
    if (window.location.hash) {
      const target = document.getElementById(
        decodeURIComponent(window.location.hash.slice(1)),
      );
      if (target) instance.scrollTo(target, { immediate: true });
    }

    const onClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const anchor = (event.target as Element | null)?.closest?.("a[href]");
      if (!(anchor instanceof HTMLAnchorElement) || anchor.target === "_blank") {
        return;
      }

      const url = new URL(anchor.href);
      if (
        url.origin !== window.location.origin ||
        url.pathname !== window.location.pathname
      ) {
        return;
      }

      if (!url.hash) {
        event.preventDefault();
        instance.scrollTo(0);
        window.history.replaceState(null, "", url.pathname);
        return;
      }

      const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
      if (!target) return;

      event.preventDefault();
      instance.scrollTo(target);
      window.history.pushState(null, "", url.hash);
      if (target.hasAttribute("tabindex")) target.focus({ preventScroll: true });
    };

    // capture 단계에서 먼저 처리해 Next Link의 기본 이동과 겹치지 않게 해요.
    document.addEventListener("click", onClick, true);

    return () => {
      document.removeEventListener("click", onClick, true);
      instance.destroy();
      setLenis(null);
    };
  }, []);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
