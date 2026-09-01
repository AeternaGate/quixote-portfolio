import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLang } from '../LangContext';
import { usePrefersReducedMotion } from '../usePrefersReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const { t } = useLang();
  const ref = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;

    // enter from left on load
    gsap.set(el, { opacity: 0, x: -80 });
    gsap.to(el, {
      opacity: 1,
      x: 0,
      duration: 1,
      ease: 'power3.out',
    });

    // exit to right on scroll
    const anim = gsap.to(el, {
      opacity: 0,
      x: 80,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });

    return () => {
      anim.scrollTrigger?.kill();
      anim.kill();
    };
  }, [reduced]);

  return (
    <header ref={ref} className="hero">
      <h1>
        <span>{t.heroH1a}</span>
        <em>{t.heroH1b}</em>
        <span>{t.heroH1c}</span>
      </h1>
      <p className="lede">{t.heroLede}</p>
    </header>
  );
}
