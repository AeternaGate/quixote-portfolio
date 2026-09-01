import { useEffect, useRef, useState } from 'react';

const DOT_SMOOTH = 0.25;
const IDLE_TIMEOUT = 2500;
const SWAY_SPEED = 0.8;
const SWAY_AMPLITUDE = 4;

export default function SmoothCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [visible, setVisible] = useState(false);
  const lastMoveTime = useRef(Date.now());
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const swayTime = useRef(0);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const forceAnimations = params.get('force-animations') === 'true';
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!forceAnimations && mql.matches) return;
    if ('ontouchstart' in window) return;

    document.documentElement.classList.add('custom-cursor');

    const onMouseMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
      lastMoveTime.current = Date.now();
      if (!visible) setVisible(true);
    };
    window.addEventListener('mousemove', onMouseMove);

    let raf: number;
    const animate = () => {
      const now = Date.now();
      const idle = now - lastMoveTime.current > IDLE_TIMEOUT;

      pos.current.x += (target.current.x - pos.current.x) * DOT_SMOOTH;
      pos.current.y += (target.current.y - pos.current.y) * DOT_SMOOTH;

      swayTime.current += SWAY_SPEED * 0.016;
      const sway = Math.sin(swayTime.current) * SWAY_AMPLITUDE;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`;
        cursorRef.current.style.opacity = idle ? '0' : '1';
      }
      if (svgRef.current) {
        svgRef.current.style.transform = `rotate(${sway}deg)`;
      }

      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    return () => {
      document.documentElement.classList.remove('custom-cursor');
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      ref={cursorRef}
      className="cursor-drop"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 50,
        willChange: 'transform',
        filter: 'blur(1.5px)',
      }}
      aria-hidden="true"
    >
      <svg
        ref={svgRef}
        width="28"
        height="36"
        viewBox="0 0 28 36"
        fill="none"
        style={{
          transformOrigin: 'center bottom',
          willChange: 'transform',
        }}
      >
        <defs>
          <linearGradient id="dropGrad" x1="0" y1="0" x2="0" y2="36" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#9a1b1b" stopOpacity="1" />
            <stop offset="35%" stopColor="#dc143c" stopOpacity="1" />
            <stop offset="70%" stopColor="#8b0000" stopOpacity="1" />
            <stop offset="100%" stopColor="#4a0a0a" stopOpacity="1" />
          </linearGradient>
          <radialGradient id="dropHighlight" cx="14" cy="10" r="12" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="rgba(255,255,255,0.35)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </radialGradient>
          <radialGradient id="dropInnerShadow" cx="14" cy="28" r="10" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="rgba(0,0,0,0)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.4)" />
          </radialGradient>
        </defs>
        <path
          d="M14 0 C14 0 2 14 2 22 C2 30 6.5 34 14 34 C21.5 34 26 30 26 22 C26 14 14 0 14 0Z"
          fill="url(#dropGrad)"
        />
        <path
          d="M14 3 C14 3 5 16 5 22 C5 27 8.5 30 14 30"
          fill="url(#dropHighlight)"
        />
        <path
          d="M14 22 C14 22 10 28 10 30 C10 31 13.5 32 14 32 C14.5 32 18 31 18 30 C18 28 14 22 14 22Z"
          fill="url(#dropInnerShadow)"
        />
        <ellipse cx="14" cy="10" rx="5" ry="3" fill="rgba(255,255,255,0.15)" />
      </svg>
    </div>
  );
}