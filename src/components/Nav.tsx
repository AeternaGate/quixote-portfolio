import { useLang } from '../LangContext';
import type { Lang } from '../i18n';

export default function Nav() {
  const { lang, t, setLang } = useLang();

  const pick = (next: Lang) => () => setLang(next);

  return (
    <nav className="nav">
      <div className="brand">
        Quixote<span>.Dev</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.6rem' }}>
        <ul className="navlinks">
          <li className="hide-m">
            <a href="#work">{t.navWork}</a>
          </li>
          <li className="hide-m">
            <a href="#about">{t.navAbout}</a>
          </li>
          <li>
            <a href="#contact" className="btn">
              {t.navContact}
            </a>
          </li>
        </ul>
        <div className="langtoggle" role="group" aria-label={t.langAria}>
          <button
            type="button"
            className={lang === 'en' ? 'active' : ''}
            aria-pressed={lang === 'en'}
            onClick={pick('en')}
          >
            EN
          </button>
          <button
            type="button"
            className={lang === 'ru' ? 'active' : ''}
            aria-pressed={lang === 'ru'}
            onClick={pick('ru')}
          >
            RU
          </button>
        </div>
      </div>
    </nav>
  );
}
