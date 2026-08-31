import { useEffect, useRef, useMemo, type ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePrefersReducedMotion } from '../usePrefersReducedMotion';

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: string;
  enableBlur?: boolean;
  baseOpacity?: number;
  baseRotation?: number;
  blurStrength?: number;
  className?: string;
}

/**
 * ScrollReveal from ReactBits (adapted): splits text into words that rise from
 * low opacity + blur to full clarity as the element scrolls through the viewport,
 * with a slight de-rotation. Reduced motion shows the text plainly.
 */
export default function ScrollReveal({
  children,
  enableBlur = true,
  baseOpacity = 0.12,
  baseRotation = 3,
  blurStrength = 4,
  className = '',
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  const words = useMemo<ReactNode[]>(() => {
    return children.split(/(\s+)/).map((word, index) => {
      if (word.match(/^\s+$/)) return word;
      return (
        <span className="sr-word" key={index} style={{ display: 'inline-block' }}>
          {word}
        </span>
      );
    });
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || reduced) return;

    const triggers: ScrollTrigger[] = [];

    const rot = gsap.fromTo(
      el,
      { transformOrigin: '0% 50%', rotate: baseRotation },
      {
        ease: 'none',
        rotate: 0,
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom center+=10%',
          scrub: true,
        },
      }
    );
    if (rot.scrollTrigger) triggers.push(rot.scrollTrigger);

    const wordEls = el.querySelectorAll<HTMLElement>('.sr-word');

    const op = gsap.fromTo(
      wordEls,
      { opacity: baseOpacity, willChange: 'opacity, filter' },
      {
        ease: 'none',
        opacity: 1,
        stagger: 0.05,
        scrollTrigger: {
          trigger: el,
          start: 'top bottom-=10%',
          end: 'bottom center+=10%',
          scrub: true,
        },
      }
    );
    if (op.scrollTrigger) triggers.push(op.scrollTrigger);

    if (enableBlur) {
      const bl = gsap.fromTo(
        wordEls,
        { filter: `blur(${blurStrength}px)` },
        {
          ease: 'none',
          filter: 'blur(0px)',
          stagger: 0.05,
          scrollTrigger: {
            trigger: el,
            start: 'top bottom-=10%',
            end: 'bottom center+=10%',
            scrub: true,
          },
        }
      );
      if (bl.scrollTrigger) triggers.push(bl.scrollTrigger);
    }

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, [reduced, enableBlur, baseOpacity, baseRotation, blurStrength]);

  return (
    <div ref={containerRef} className={className}>
      {words}
    </div>
  );
}
