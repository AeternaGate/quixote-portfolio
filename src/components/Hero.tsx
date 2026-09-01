import { useEffect, useRef } from 'react';
import { useLang } from '../LangContext';
import { usePrefersReducedMotion } from '../usePrefersReducedMotion';

export default function Hero() {
  const { t } = useLang();
  const ref = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('hero--visible');
          el.classList.remove('hero--hidden');
        } else {
          el.classList.add('hero--hidden');
          el.classList.remove('hero--visible');
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
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
