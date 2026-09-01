import { Link } from 'react-router-dom';
import { useLang } from '../LangContext';

export default function Work() {
  const { t } = useLang();

  return (
    <section id="work" className="section section--right">
      <div className="sec-label">{t.workLabel}</div>
      <h2>
        <span>{t.workH2a}</span>
        <em>{t.workH2b}</em>
      </h2>
      <p className="sec-intro">{t.workBody}</p>
      <Link
        to="/projects"
        className="cta-btn cta-btn--ghost"
        style={{ marginTop: '1rem' }}
      >
        {t.workCta}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </Link>
    </section>
  );
}
