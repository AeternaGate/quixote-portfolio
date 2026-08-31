import { useLang } from '../LangContext';
import Reveal from './Reveal';

export default function About() {
  const { t } = useLang();

  return (
    <section id="about" className="section">
      <Reveal direction="right">
        <div className="sec-label">{t.aboutLabel}</div>
      </Reveal>
      <Reveal direction="right" delay={0.1}>
        <h2>
          <span>{t.aboutH2a}</span>
          <em>{t.aboutH2b}</em>
        </h2>
      </Reveal>
      <Reveal direction="right" delay={0.2}>
        <p className="sec-intro">{t.aboutBody}</p>
      </Reveal>
    </section>
  );
}
