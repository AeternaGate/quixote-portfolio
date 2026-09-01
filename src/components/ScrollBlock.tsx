import { useEffect, useRef, type ReactNode } from 'react';
import { usePrefersReducedMotion } from '../usePrefersReducedMotion';

interface Props {
  children: ReactNode;
  direction: 'left' | 'right';
}

export default function ScrollBlock({ children, direction }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;

    el.classList.add(`scrollblock--${direction}`);

    let lastScrollY = window.scrollY;
    let scrollingDown = true;

    const onScroll = () => {
      const y = window.scrollY;
      scrollingDown = y >= lastScrollY;
      lastScrollY = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // entering viewport
          el.classList.remove('scrollblock--top', 'scrollblock--bottom');
          el.classList.add(scrollingDown ? 'scrollblock--bottom' : 'scrollblock--top');
          el.offsetHeight; // force reflow
          el.classList.add('scrollblock--visible');
        } else {
          // leaving viewport
          el.classList.remove('scrollblock--visible');
          el.classList.remove('scrollblock--top', 'scrollblock--bottom');
          el.offsetHeight; // force reflow
          el.classList.add(scrollingDown ? 'scrollblock--top' : 'scrollblock--bottom');
        }
      },
      { threshold: 0 }
    );

    requestAnimationFrame(() => observer.observe(el));

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, [direction, reduced]);

  return (
    <div ref={ref} className="scrollblock">
      {children}
    </div>
  );
}
