import StaggeredMenu from './StaggeredMenu';
import { useLang } from '../LangContext';

export default function Nav() {
  const { t } = useLang();

  return (
    <StaggeredMenu
      position="right"
      items={[
        { label: t.navWork, link: '#work', ariaLabel: 'View work' },
        { label: t.navAbout, link: '#about', ariaLabel: 'About me' },
        { label: t.navContact, link: '#contact', ariaLabel: 'Get in touch' },
      ]}
      accentColor="#8b0000"
    />
  );
}
