import { useLang } from '../LangContext';

export default function Work() {
  const { t } = useLang();

  return (
    <section id="work" className="section">
      <div className="sec-label">{t.workLabel}</div>
      <h2>
        <span>{t.workH2a}</span>
        <em>{t.workH2b}</em>
      </h2>
      <p className="sec-intro">{t.workBody}</p>
    </section>
  );
}
