import { useLang } from '../LangContext';

export default function Footer() {
  const { t } = useLang();
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <span>{t.footer}</span> {year} Quixote.Dev <span>{t.footer2}</span>
    </footer>
  );
}
