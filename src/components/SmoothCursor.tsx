import { useEffect, useRef } from 'react';

const CRIMSON = '#dc143c';
const POINTS = 40;
const LINE_WIDTH = 0.12;
const SPRING = 0.4;
const DAMPING = 0.5;
const BLUR = 6;

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
    canvas.width = w;
    canvas.height = h;

    const onResize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
    };
    window.addEventListener('resize', onResize);

    const points: { x: number; y: number }[] = [];
    for (let i = 0; i < POINTS; i++) {
      points.push({ x: w / 2, y: h / 2 });
    }

    let mouseX = w / 2;
    let mouseY = h / 2;
    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener('mousemove', onMouseMove);

    let raf: number;
    const draw = () => {
      points[0].x += (mouseX - points[0].x) * SPRING;
      points[0].y += (mouseY - points[0].y) * SPRING;

      for (let i = 1; i < POINTS; i++) {
        const prev = points[i - 1];
        const curr = points[i];
        const dx = prev.x - curr.x;
        const dy = prev.y - curr.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const targetDist = 4;
        curr.x += (dx / dist) * (dist - targetDist) * DAMPING;
        curr.y += (dy / dist) * (dist - targetDist) * DAMPING;
      }

      ctx.clearRect(0, 0, w, h);
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
      ctx.shadowBlur = BLUR;
      ctx.globalAlpha = 0.7;
      ctx.stroke();
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
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 50,
      }}
      aria-hidden="true"
    />
  );
}
