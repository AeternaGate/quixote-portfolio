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
    let wobbleAngle = 0;
    let wobbleSpeed = 0;
    let lastMoveTime = Date.now();
    let cursorOpacity = 1;

    const onMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - mouseX;
      const dy = e.clientY - mouseY;
      const speed = Math.sqrt(dx * dx + dy * dy);
      wobbleSpeed = Math.min(speed * 0.015, 0.4);
      mouseX = e.clientX;
      mouseY = e.clientY;
      lastMoveTime = Date.now();
    };
    window.addEventListener('mousemove', onMouseMove);

    const drawDrop = (r: number) => {
      ctx.beginPath();

      ctx.moveTo(0, -r * 1.8);

      ctx.bezierCurveTo(
        r * 0.3, -r * 1.4,
        r * 1.0, -r * 0.4,
        r * 1.0, r * 0.2
      );

      ctx.bezierCurveTo(
        r * 1.0, r * 0.7,
        r * 0.5, r * 1.1,
        0, r * 1.1
      );

      ctx.bezierCurveTo(
        -r * 0.5, r * 1.1,
        -r * 1.0, r * 0.7,
        -r * 1.0, r * 0.2
      );

      ctx.bezierCurveTo(
        -r * 1.0, -r * 0.4,
        -r * 0.3, -r * 1.4,
        0, -r * 1.8
      );

      ctx.closePath();
    };

    let raf: number;
    let time = 0;
    const draw = () => {
      const now = Date.now();
      time = now * 0.003;
      const idle = now - lastMoveTime > IDLE_TIMEOUT;
      const targetOpacity = idle ? 0 : 1;
      cursorOpacity += (targetOpacity - cursorOpacity) * (idle ? FADE_OUT_SPEED : FADE_IN_SPEED);

      dotX += (mouseX - dotX) * DOT_SMOOTH;
      dotY += (mouseY - dotY) * DOT_SMOOTH;

      wobbleAngle += (0 - wobbleAngle) * 0.08;
      wobbleSpeed *= 0.95;
      const wobble = Math.sin(time * 2) * (0.06 + wobbleSpeed);

      ctx.clearRect(0, 0, w, h);
      ctx.globalAlpha = cursorOpacity;

      // tip at mouse, body sways via rotation around tip
      ctx.save();
      ctx.translate(dotX, dotY + DOT_RADIUS * 1.8);
      ctx.rotate(wobble);

      drawDrop(DOT_RADIUS);

      ctx.fillStyle = CRIMSON;
      ctx.shadowColor = CRIMSON;
      ctx.shadowBlur = 15;
      ctx.globalAlpha = cursorOpacity * 0.95;
      ctx.fill();

      ctx.restore();
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
