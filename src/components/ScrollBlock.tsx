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

    // Enter: narrow band — appears later (deep in center)
    const enterObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.remove('scrollblock--top', 'scrollblock--bottom');
          el.classList.add(scrollingDown ? 'scrollblock--bottom' : 'scrollblock--top');
          el.offsetHeight;
          el.classList.add('scrollblock--visible');
        }
      },
      { threshold: 0, rootMargin: '-55% 0px -55% 0px' }
    );

    // Exit: wider band — disappears earlier (before edge)
    const exitObserver = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          el.classList.remove('scrollblock--visible');
          el.classList.remove('scrollblock--top', 'scrollblock--bottom');
          el.offsetHeight;
          el.classList.add(scrollingDown ? 'scrollblock--top' : 'scrollblock--bottom');
        }
      },
      { threshold: 0, rootMargin: '-35% 0px -35% 0px' }
    );

    requestAnimationFrame(() => {
      enterObserver.observe(el);
      exitObserver.observe(el);
    });

    return () => {
      enterObserver.disconnect();
      exitObserver.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, [direction, reduced]);

  return (
    <div ref={ref} className="scrollblock">
      {children}
    </div>
  );
}
