"use client";

import { useEffect, useRef } from "react";

import {
  useHasFinePointer,
  usePrefersReducedMotion,
} from "@/lib/useMotionPrefs";

type Sparkle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rotation: number;
  born: number;
  life: number;
  alpha: number;
};

const MAX_SPARKLES = 60;
const SPAWN_DISTANCE = 16;
const STRONG_ALPHA = 0.95;
const SOFT_ALPHA = 0.3;

/**
 * 커서를 따라 ✦ 반짝임이 생겼다가 0.6초 안에 사라져요.
 * - canvas 하나로 그리고, 반짝임이 없을 때는 requestAnimationFrame을 멈춰요.
 * - [data-sparkle="strong"] 영역(히어로)에서는 선명하게, 나머지는 옅게.
 * - 터치 기기와 prefers-reduced-motion 에서는 렌더링하지 않아요.
 */
export function CursorSparkles() {
  const hasFinePointer = useHasFinePointer();
  const reducedMotion = usePrefersReducedMotion();
  const enabled = hasFinePointer && !reducedMotion;
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!enabled) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const color =
      getComputedStyle(document.documentElement)
        .getPropertyValue("--color-accent")
        .trim() || "#c2456e";

    let dpr = 1;
    let width = 0;
    let height = 0;
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
    };
    resize();

    const sparkles: Sparkle[] = [];
    let frame = 0;
    let lastX = -Infinity;
    let lastY = -Infinity;

    // ✦ : 중심을 제어점으로 한 4갈래 별
    const drawStar = (r: number) => {
      ctx.beginPath();
      ctx.moveTo(0, -r);
      ctx.quadraticCurveTo(0, 0, r, 0);
      ctx.quadraticCurveTo(0, 0, 0, r);
      ctx.quadraticCurveTo(0, 0, -r, 0);
      ctx.quadraticCurveTo(0, 0, 0, -r);
      ctx.fill();
    };

    const tick = (now: number) => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = color;

      for (let i = sparkles.length - 1; i >= 0; i--) {
        const s = sparkles[i];
        const t = (now - s.born) / s.life;
        if (t >= 1) {
          sparkles.splice(i, 1);
          continue;
        }
        const travel = 1 - (1 - t) * (1 - t);
        const scale = t < 0.2 ? t / 0.2 : 1 - ((t - 0.2) / 0.8) * 0.7;

        ctx.globalAlpha = s.alpha * (1 - t);
        ctx.save();
        ctx.translate(s.x + s.vx * travel, s.y + s.vy * travel);
        ctx.rotate(s.rotation * t);
        drawStar(s.size * scale);
        ctx.restore();
      }
      ctx.globalAlpha = 1;

      frame = sparkles.length > 0 ? requestAnimationFrame(tick) : 0;
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const dx = event.clientX - lastX;
      const dy = event.clientY - lastY;
      if (dx * dx + dy * dy < SPAWN_DISTANCE * SPAWN_DISTANCE) return;
      lastX = event.clientX;
      lastY = event.clientY;

      const strong =
        event.target instanceof Element &&
        event.target.closest('[data-sparkle="strong"]') !== null;

      const angle = Math.random() * Math.PI * 2;
      const distance = 10 + Math.random() * 20;
      if (sparkles.length >= MAX_SPARKLES) sparkles.shift();
      sparkles.push({
        x: event.clientX + (Math.random() - 0.5) * 8,
        y: event.clientY + (Math.random() - 0.5) * 8,
        vx: Math.cos(angle) * distance,
        vy: Math.sin(angle) * distance - 8,
        size: (strong ? 6 : 5) + Math.random() * 4,
        rotation: (Math.random() - 0.5) * 1.4,
        born: performance.now(),
        life: 450 + Math.random() * 150,
        alpha: strong ? STRONG_ALPHA : SOFT_ALPHA,
      });

      if (!frame) frame = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(frame);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[70] h-screen w-screen"
    />
  );
}
