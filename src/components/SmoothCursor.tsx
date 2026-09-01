import { useEffect, useRef } from 'react';

const CRIMSON = '#dc143c';
const POINTS = 50;
const LINE_WIDTH = 12;
const SPRING = 0.18;
const DAMPING = 0.6;
const TRAIL_BLUR = 28;
const DOT_RADIUS = 7;
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

    const points: { x: number; y: number }[] = [];
    for (let i = 0; i < POINTS; i++) {
      points.push({ x: w / 2, y: h / 2 });
    }

    let mouseX = w / 2;
    let mouseY = h / 2;
    let dotX = w / 2;
    let dotY = h / 2;
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
      ctx.rotate(angle);

      ctx.beginPath();
      ctx.moveTo(0, -r * 1.6);

      ctx.bezierCurveTo(
        r * 0.8, -r * 1.2,
        r * 1.1, -r * 0.1,
        r * 0.9, r * 0.5
      );
      ctx.bezierCurveTo(
        r * 0.7, r * 1.0,
        r * 0.2, r * 1.3,
        0, r * 1.4
      );
      ctx.bezierCurveTo(
        -r * 0.2, r * 1.3,
        -r * 0.7, r * 1.0,
        -r * 0.9, r * 0.5
      );
      ctx.bezierCurveTo(
        -r * 1.1, -r * 0.1,
        -r * 0.8, -r * 1.2,
        0, -r * 1.6
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

      points[0].x += (mouseX - points[0].x) * SPRING;
      points[0].y += (mouseY - points[0].y) * SPRING;

      for (let i = 1; i < POINTS; i++) {
        const prev = points[i - 1];
        const curr = points[i];
        const dx = prev.x - curr.x;
        const dy = prev.y - curr.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const targetDist = 5;
        curr.x += (dx / dist) * (dist - targetDist) * DAMPING;
        curr.y += (dy / dist) * (dist - targetDist) * DAMPING;
      }

      dotX += (mouseX - dotX) * DOT_SMOOTH;
      dotY += (mouseY - dotY) * DOT_SMOOTH;

      ctx.clearRect(0, 0, w, h);
      ctx.globalAlpha = cursorOpacity;

      // thick smeared trail — outer glow
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < POINTS; i++) {
        const prev = points[i - 1];
        const curr = points[i];
        const mx = (prev.x + curr.x) / 2;
        const my = (prev.y + curr.y) / 2;
        ctx.quadraticCurveTo(prev.x, prev.y, mx, my);
      }
      ctx.strokeStyle = CRIMSON;
      ctx.lineWidth = LINE_WIDTH + 6;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.shadowColor = CRIMSON;
      ctx.shadowBlur = TRAIL_BLUR + 10;
      ctx.globalAlpha = cursorOpacity * 0.25;
      ctx.stroke();

      // thick smeared trail — core
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < POINTS; i++) {
        const prev = points[i - 1];
        const curr = points[i];
        const mx = (prev.x + curr.x) / 2;
        const my = (prev.y + curr.y) / 2;
        ctx.quadraticCurveTo(prev.x, prev.y, mx, my);
      }
      ctx.strokeStyle = CRIMSON;
      ctx.lineWidth = LINE_WIDTH;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.shadowColor = CRIMSON;
      ctx.shadowBlur = TRAIL_BLUR;
      ctx.globalAlpha = cursorOpacity * 0.45;
      ctx.stroke();

      // sharp inner trail
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < POINTS; i++) {
        const prev = points[i - 1];
        const curr = points[i];
        const mx = (prev.x + curr.x) / 2;
        const my = (prev.y + curr.y) / 2;
        ctx.quadraticCurveTo(prev.x, prev.y, mx, my);
      }
      ctx.strokeStyle = '#ff2040';
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.shadowColor = '#ff2040';
      ctx.shadowBlur = 4;
      ctx.globalAlpha = cursorOpacity * 0.7;
      ctx.stroke();

      ctx.shadowBlur = 0;

      // cursor drop
      const dx = dotX - mouseX;
      const dy = dotY - mouseY;
      const angle = Math.atan2(dy, dx) + Math.PI / 2;

      drawDrop(dotX, dotY, angle, DOT_RADIUS);

      ctx.fillStyle = CRIMSON;
      ctx.shadowColor = CRIMSON;
      ctx.shadowBlur = 12;
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
