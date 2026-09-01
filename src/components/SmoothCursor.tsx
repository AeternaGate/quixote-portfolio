import { useEffect, useRef, useState } from 'react';

const CRIMSON = '#dc143c';
const DOT_SMOOTH = 0.25;
const IDLE_TIMEOUT = 2500;

export default function SmoothCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const lastMoveTime = useRef(Date.now());
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

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

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`;
        cursorRef.current.style.opacity = idle ? '0' : '1';
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
      }}
      aria-hidden="true"
    >
      <svg width="20" height="28" viewBox="0 0 20 28" fill="none">
        <path
          d="M10 0 C10 0 2 12 2 18 C2 22.4 5.6 26 10 26 C14.4 26 18 22.4 18 18 C18 12 10 0 10 0Z"
          fill={CRIMSON}
        />
      </svg>
    </div>
  );
}
