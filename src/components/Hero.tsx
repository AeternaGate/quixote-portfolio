import { useLang } from '../LangContext';

export default function Hero() {
  const { t } = useLang();

  return (
    <header className="hero">
      <div className="eyebrow">{t.heroEyebrow}</div>
      <h1>
        <span>{t.heroH1a}</span>
        <em>{t.heroH1b}</em>
        <span>{t.heroH1c}</span>
      </h1>
      <p className="lede">{t.heroLede}</p>
      <div className="hero-cta">
        <a href="#work" className="btn solid">
          {t.heroCta1}
        </a>
        <a href="#contact" className="btn">
          {t.heroCta2}
        </a>
      </div>
      <div className="scrollhint">{t.scroll}</div>
    </header>
  );
}
