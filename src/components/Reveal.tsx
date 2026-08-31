import { useEffect, useRef, type ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePrefersReducedMotion } from '../usePrefersReducedMotion';

gsap.registerPlugin(ScrollTrigger);

type Direction = 'left' | 'right' | 'up';

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: 'div' | 'section' | 'article';
  id?: string;
  direction?: Direction;
}

const FROM: Record<Direction, gsap.TweenVars> = {
  left:  { opacity: 0, x: -120 },
  right: { opacity: 0, x: 120 },
  up:    { opacity: 0, y: 40 },
};

const TO: gsap.TweenVars = {
  opacity: 1,
  x: 0,
  y: 0,
};

export default function Reveal({
  children,
  delay = 0,
  className = '',
  as = 'div',
  id,
  direction = 'up',
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;

    const anim = gsap.fromTo(el, FROM[direction], {
      ...TO,
      duration: 0.9,
      delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top bottom-=80',
        toggleActions: 'play none none none',
      },
    });

    return () => {
      anim.scrollTrigger?.kill();
      anim.kill();
    };
  }, [delay, reduced, direction]);

  const Tag = as;
  return (
    <Tag
      ref={ref as never}
      id={id}
      className={`reveal reveal-${direction} ${className}`}
    >
      {children}
    </Tag>
  );
}
