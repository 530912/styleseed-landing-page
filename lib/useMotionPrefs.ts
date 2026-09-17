"use client";

import { useCallback, useSyncExternalStore } from "react";

export function useMediaQuery(query: string, serverValue = false) {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const media = window.matchMedia(query);
      media.addEventListener("change", onChange);
      return () => media.removeEventListener("change", onChange);
    },
    [query],
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => serverValue,
  );
}

export const usePrefersReducedMotion = () =>
  useMediaQuery("(prefers-reduced-motion: reduce)");

/** 마우스처럼 정밀한 포인터가 있는 기기 (터치 기기는 false) */
export const useHasFinePointer = () =>
  useMediaQuery("(hover: hover) and (pointer: fine)");

export const useIsMobile = () => useMediaQuery("(max-width: 767px)");
