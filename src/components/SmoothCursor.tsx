import { useEffect, useRef } from 'react';

const CRIMSON = '#dc143c';
const DOT_RADIUS = 9;
const DOT_SMOOTH = 0.25;
const IDLE_TIMEOUT = 2500;
const FADE_OUT_SPEED = 0.04;
const FADE_IN_SPEED = 0.08;

export default function SmoothCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mql.matches) return;
    if ('ontouchstart' in window) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = window.innerWidth;
    let h = window.innerHeight;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    ctx.scale(dpr, dpr);

    const onResize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };
    window.addEventListener('resize', onResize);

    let mouseX = w / 2;
    let mouseY = h / 2;
    let dotX = w / 2;
    let dotY = h / 2;
    let prevDotX = w / 2;
    let prevDotY = h / 2;
    let lastMoveTime = Date.now();
    let cursorOpacity = 1;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      lastMoveTime = Date.now();
    };
    window.addEventListener('mousemove', onMouseMove);

    const drawDrop = (cx: number, cy: number, angle: number, r: number) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(angle + Math.PI);

      ctx.beginPath();

      //尖端在上 (translated: tip at top before rotation)
      ctx.moveTo(0, -r * 1.8);

      // right side: from tip down to wide base
      ctx.bezierCurveTo(
        r * 0.3, -r * 1.4,
        r * 1.0, -r * 0.4,
        r * 1.0, r * 0.2
      );

      // right-bottom curve to center bottom
      ctx.bezierCurveTo(
        r * 1.0, r * 0.7,
        r * 0.5, r * 1.1,
        0, r * 1.1
      );

      // left-bottom from center
      ctx.bezierCurveTo(
        -r * 0.5, r * 1.1,
        -r * 1.0, r * 0.7,
        -r * 1.0, r * 0.2
      );

      // left side: from base back to tip
      ctx.bezierCurveTo(
        -r * 1.0, -r * 0.4,
        -r * 0.3, -r * 1.4,
        0, -r * 1.8
      );

      ctx.closePath();
      ctx.restore();
    };

    let raf: number;
    const draw = () => {
      const now = Date.now();
      const idle = now - lastMoveTime > IDLE_TIMEOUT;
      const targetOpacity = idle ? 0 : 1;
      cursorOpacity += (targetOpacity - cursorOpacity) * (idle ? FADE_OUT_SPEED : FADE_IN_SPEED);

      dotX += (mouseX - dotX) * DOT_SMOOTH;
      dotY += (mouseY - dotY) * DOT_SMOOTH;

      const dx = dotX - prevDotX;
      const dy = dotY - prevDotY;
      const angle = Math.atan2(dy, dx);

      prevDotX += (dotX - prevDotX) * 0.3;
      prevDotY += (dotY - prevDotY) * 0.3;

      ctx.clearRect(0, 0, w, h);
      ctx.globalAlpha = cursorOpacity;

      drawDrop(dotX, dotY, angle, DOT_RADIUS);

      ctx.fillStyle = CRIMSON;
      ctx.shadowColor = CRIMSON;
      ctx.shadowBlur = 15;
      ctx.globalAlpha = cursorOpacity * 0.95;
      ctx.fill();

      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 50,
      }}
      aria-hidden="true"
    />
  );
}
