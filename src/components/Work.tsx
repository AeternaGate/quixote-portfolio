import { useLang } from '../LangContext';
import Reveal from './Reveal';

export default function Work() {
  const { t } = useLang();

  return (
    <section id="work" className="section">
      <Reveal direction="left">
        <div className="sec-label">{t.workLabel}</div>
      </Reveal>
      <Reveal direction="left" delay={0.1}>
        <h2>
          <span>{t.workH2a}</span>
          <em>{t.workH2b}</em>
        </h2>
      </Reveal>

      <div className="projects">
        <Reveal as="article" className="card" direction="left" delay={0}>
          <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 3v3M4 10h16M6 10c0 5 2 8 6 8s6-3 6-8" />
            <path d="M9 21h.01M15 21h.01M12 18v3" />
          </svg>
          <h3>{t.p1Title}</h3>
          <p>{t.p1Body}</p>
          <div className="tags">
            <span className="tag">{t.p1t1}</span>
            <span className="tag">{t.p1t2}</span>
            <span className="tag">{t.p1t3}</span>
          </div>
          <a className="link" href="#">
            {t.pLink}
          </a>
        </Reveal>

        <Reveal as="article" className="card" direction="right" delay={0.1}>
          <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M9 3h6M10 3v4l-2 3v11h8V10l-2-3V3" />
            <path d="M8.5 14h.01M11 14v.01M16 14v.01" />
          </svg>
          <h3>{t.p2Title}</h3>
          <p>{t.p2Body}</p>
          <div className="tags">
            <span className="tag">{t.p2t1}</span>
            <span className="tag">{t.p2t2}</span>
            <span className="tag">{t.p2t3}</span>
          </div>
          <a className="link" href="#">
            {t.pLink}
          </a>
        </Reveal>

        <Reveal as="article" className="card" direction="left" delay={0.2}>
          <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M9 17l-4-4 4-4M15 7l4 4-4 4M13 5l-2 14" />
          </svg>
          <h3>{t.p3Title}</h3>
          <p>{t.p3Body}</p>
          <div className="tags">
            <span className="tag">{t.p3t1}</span>
            <span className="tag">{t.p3t2}</span>
          </div>
          <a className="link" href="#">
            {t.p3Link}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
