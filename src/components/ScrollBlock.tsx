import { useEffect, useRef, type ReactNode } from 'react';
import { usePrefersReducedMotion } from '../usePrefersReducedMotion';

interface Props {
  children: ReactNode;
  direction: 'left' | 'right';
  isLast?: boolean;
}

export default function ScrollBlock({ children, direction }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;

    el.classList.add(`scrollblock--${direction}`);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('scrollblock--visible');
        } else {
          el.classList.remove('scrollblock--visible');
        }
      },
      { threshold: 0 }
    );

    requestAnimationFrame(() => observer.observe(el));
    return () => observer.disconnect();
  }, [direction, reduced]);

  return (
    <div ref={ref} className="scrollblock">
      {children}
    </div>
  );
}
