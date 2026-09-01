import { useEffect, useState } from 'react';

/** Tracks the user's prefers-reduced-motion setting, updating on change. */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    
    // URL parameter ?force-animations=true overrides reduced motion
    const params = new URLSearchParams(window.location.search);
    if (params.get('force-animations') === 'true') return false;
    
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = (e: MediaQueryListEvent) => {
      // URL parameter still takes precedence
      const params = new URLSearchParams(window.location.search);
      if (params.get('force-animations') === 'true') {
        setReduced(false);
      } else {
        setReduced(e.matches);
      }
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return reduced;
}
