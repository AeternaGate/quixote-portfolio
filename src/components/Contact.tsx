import { useEffect, useRef } from 'react';
import { useLang } from '../LangContext';
import { usePrefersReducedMotion } from '../usePrefersReducedMotion';

export default function Contact() {
  const { t } = useLang();
  const ref = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;

    el.classList.add('scrollblock--right');

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
      { threshold: 0, rootMargin: '-45% 0px -45% 0px' }
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
    <section ref={ref} id="contact"   className="section section--right scrollblock">
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
