import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLang } from '../LangContext';
import { usePrefersReducedMotion } from '../usePrefersReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const { t } = useLang();
  const ref = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;

    const anim = gsap.fromTo(el, {
      opacity: 0,
      scale: 0.92,
      y: 60,
      x: 80,
    }, {
      opacity: 1,
      scale: 1,
      y: 0,
      x: 0,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 150%',
        end: 'top 50%',
        scrub: 0.5,
      },
    });

    return () => {
      anim.scrollTrigger?.kill();
      anim.kill();
    };
  }, [reduced]);

  return (
    <section ref={ref} id="contact" className="section section--right">
      <div className="eyebrow" style={{ marginBottom: 0 }}>
        {t.contactEyebrow}
      </div>
      <h2>
        <span>{t.contactH2a}</span>
        <em>{t.contactH2b}</em>
      </h2>
      <p>{t.contactBody}</p>
      <div className="chips">
        <a className="chip" href="#">
          <svg viewBox="0 0 24 24">
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="m3 7 9 6 9-6" />
          </svg>
          <span>{t.email}</span>
        </a>
        <a className="chip" href="#">
          <svg viewBox="0 0 24 24">
            <path d="m21 4-3.5 16-6.5-5-2 5-1-6 11-9" />
          </svg>
          <span>{t.telegram}</span>
        </a>
        <a className="chip" href="#">
          <svg viewBox="0 0 24 24">
            <path d="M9 17l-4-4 4-4M15 7l4 4-4 4M13 5l-2 14" />
          </svg>
          <span>{t.github}</span>
        </a>
      </div>
    </section>
  );
}
