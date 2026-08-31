import { useEffect, useRef, type ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePrefersReducedMotion } from '../usePrefersReducedMotion';

gsap.registerPlugin(ScrollTrigger);

interface Props {
  children: ReactNode;
  direction: 'left' | 'right';
  isLast?: boolean;
}

export default function ScrollBlock({ children, direction, isLast = false }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;

    const xFrom = direction === 'left' ? -80 : 80;
    const xTo = direction === 'left' ? 80 : -80;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: 'top top',
        end: '+=100%',
        pin: true,
        scrub: 0.5,
      },
    });

    // enter
    tl.fromTo(el, {
      opacity: 0,
      scale: 0.92,
      y: 60,
      x: xFrom,
    }, {
      opacity: 1,
      scale: 1,
      y: 0,
      x: 0,
      duration: 0.4,
      ease: 'power2.out',
    });

    if (!isLast) {
      // exit to opposite side
      tl.to(el, {
        opacity: 0,
        scale: 0.92,
        y: -60,
        x: xTo,
        duration: 0.4,
        ease: 'power2.in',
      });
    }

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [direction, isLast, reduced]);

  return (
    <div ref={ref} className="scrollblock">
      {children}
    </div>
  );
}
