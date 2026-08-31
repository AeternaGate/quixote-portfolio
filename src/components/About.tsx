import { useLang } from '../LangContext';

export default function About() {
  const { t } = useLang();

  return (
    <section id="about" className="section section--right">
      <div className="sec-label">{t.aboutLabel}</div>
      <h2>
        <span>{t.aboutH2a}</span>
        <em>{t.aboutH2b}</em>
      </h2>
      <p className="sec-intro">{t.aboutBody}</p>
      <div className="hero-cta">
        <a href="#work" className="btn solid">
          {t.heroCta1}
        </a>
        <a href="#contact" className="btn">
          {t.heroCta2}
        </a>
      </div>
    </section>
  );
}
