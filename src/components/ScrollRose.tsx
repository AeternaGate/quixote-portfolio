import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import roseVideo from '../../assets/rose-scroll.mp4';
import rosePoster from '../../assets/rose-wilting-poster-hq.png';

gsap.registerPlugin(ScrollTrigger);

/**
 * Fixed rose backdrop whose playback is scrubbed by page scroll:
 * scrolling the whole page from top to bottom plays the wilting video
 * frame by frame. Requires an all-intra (every-frame-keyframe) source so
 * currentTime seeking is smooth — see assets/rose-scroll.mp4.
 */
export default function ScrollRose() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const state = { t: 0 };
    let trigger: ScrollTrigger | null = null;

    const setup = () => {
      const duration = video.duration;
      if (!duration || !isFinite(duration)) return;

      trigger = ScrollTrigger.create({
        trigger: document.documentElement,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.5,
        onUpdate: (self) => {
          gsap.to(state, {
            t: self.progress * duration,
            duration: 0.2,
            overwrite: true,
            onUpdate: () => {
              if (video.readyState >= 2) {
                video.currentTime = Math.min(state.t, duration - 0.001);
              }
            },
          });
        },
      });
    };

    if (video.readyState >= 1) {
      setup();
    } else {
      video.addEventListener('loadedmetadata', setup, { once: true });
    }

    return () => {
      trigger?.kill();
      video.removeEventListener('loadedmetadata', setup);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      className="rose-video"
      aria-hidden="true"
      muted
      playsInline
      preload="auto"
      poster={rosePoster}
    >
      <source src={roseVideo} type="video/mp4" />
    </video>
  );
}
