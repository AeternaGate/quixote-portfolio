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

    let lastScrollY = window.scrollY;
    let scrollingDown = true;

    const onScroll = () => {
      const y = window.scrollY;
      scrollingDown = y >= lastScrollY;
      lastScrollY = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    // check if already in viewport on mount
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      el.classList.add('hero--visible');
    }

    // Enter: narrow band — appears later (deep in center)
    const enterObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.remove('hero--top', 'hero--bottom');
          el.classList.add(scrollingDown ? 'hero--bottom' : 'hero--top');
          el.offsetHeight;
          el.classList.add('hero--visible');
        }
      },
      { threshold: 0, rootMargin: '-45% 0px -45% 0px' }
    );

    // Exit: wider band — disappears earlier (before edge)
    const exitObserver = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          el.classList.remove('hero--visible');
          el.classList.remove('hero--top', 'hero--bottom');
          el.offsetHeight;
          el.classList.add(scrollingDown ? 'hero--top' : 'hero--bottom');
        }
      },
      { threshold: 0, rootMargin: '-40% 0px -40% 0px' }
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
