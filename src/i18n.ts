export type Lang = 'en' | 'ru';

export interface Dict {
  navWork: string;
  navAbout: string;
  navContact: string;
  heroEyebrow: string;
  heroH1a: string;
  heroH1b: string;
  heroH1c: string;
  heroLede: string;
  heroCta1: string;
  heroCta2: string;
  scroll: string;
  workLabel: string;
  workH2a: string;
  workH2b: string;
  p1Title: string;
  p1Body: string;
  p1t1: string;
  p1t2: string;
  p1t3: string;
  p2Title: string;
  p2Body: string;
  p2t1: string;
  p2t2: string;
  p2t3: string;
  p3Title: string;
  p3Body: string;
  p3t1: string;
  p3t2: string;
  p3Link: string;
  pLink: string;
  aboutLabel: string;
  aboutH2a: string;
  aboutH2b: string;
  aboutBody: string;
  contactEyebrow: string;
  contactH2a: string;
  contactH2b: string;
  contactBody: string;
  email: string;
  telegram: string;
  github: string;
  footer: string;
  footer2: string;
  langAria: string;
  title: string;
}

export const I18N: Record<Lang, Dict> = {
  en: {
    navWork: 'Work',
    navAbout: 'About',
    navContact: 'Contact',
    heroEyebrow: 'Freelance · AI & Full-stack Development',
    heroH1a: 'Ideas, ',
    heroH1b: 'engineered',
    heroH1c: ' into shipped software.',
    heroLede:
      "I'm Quixote, a developer who turns vague ideas and hard problems into real, working products. From AI-powered automation to useful tools, I build the thing you can actually use.",
    heroCta1: 'See my work',
    heroCta2: "Let's talk",
    scroll: 'Scroll',
    workLabel: 'Selected Work',
    workH2a: "Projects I've ",
    workH2b: 'built & shipped',
    p1Title: 'AutoPilot Bot',
    p1Body:
      'Telegram bot with an integrated AI assistant that schedules and auto-posts content to channels, keeping your audience fed while you sleep.',
    p1t1: 'Telegram',
    p1t2: 'AI',
    p1t3: 'Automation',
    p2Title: 'AI Toolbox',
    p2Body:
      'A curated website of genuinely useful AI tools, gathered in one place so you can find the right instrument for the job, fast.',
    p2t1: 'Web',
    p2t2: 'AI',
    p2t3: 'Tools',
    p3Title: 'Open Source',
    p3Body:
      'Public code and experiments on GitHub, a living record of how I work, what I build, and the craft behind it.',
    p3t1: 'GitHub',
    p3t2: 'Code',
    p3Link: 'View GitHub',
    pLink: 'View project',
    aboutLabel: 'About',
    aboutH2a: 'A partner, ',
    aboutH2b: 'not just a developer',
    aboutBody:
      'You bring the idea or the problem. I bring the ability to turn it into working software, end to end. Clear communication, shipped results, and products that are actually useful from day one.',
    contactEyebrow: 'Get in touch',
    contactH2a: 'Have an idea? ',
    contactH2b: "Let's build it.",
    contactBody:
      "Tell me what you need, a bot, a website, an AI feature, a whole product. I'll reply with a clear plan.",
    email: 'placeholder@email.com',
    telegram: '@quixote_dev',
    github: 'GitHub',
    footer: '©',
    footer2: 'Built with craft. All details are placeholders until real assets are added.',
    langAria: 'Language',
    title: 'Quixote.Dev — Portfolio',
  },
  ru: {
    navWork: 'Работы',
    navAbout: 'Обо мне',
    navContact: 'Контакты',
    heroEyebrow: 'Фриланс · AI и Full-stack разработка',
    heroH1a: 'Идеи — в ',
    heroH1b: 'работающий',
    heroH1c: ' продукт.',
    heroLede:
      'Я Quixote, разработчик, который превращает расплывчатые идеи и сложные задачи в настоящие, работающие продукты. От AI-автоматизации до полезных инструментов, я создаю то, чем реально можно пользоваться.',
    heroCta1: 'Мои работы',
    heroCta2: 'Обсудить проект',
    scroll: 'Листайте',
    workLabel: 'Избранные работы',
    workH2a: 'Проекты, которые я ',
    workH2b: 'создал и запустил',
    p1Title: 'AutoPilot Bot',
    p1Body:
      'Telegram-бот с интегрированным AI-ассистентом, который планирует и автоматически публикует контент в каналах, поддерживая вашу аудиторию, пока вы спите.',
    p1t1: 'Telegram',
    p1t2: 'AI',
    p1t3: 'Автоматизация',
    p2Title: 'AI Toolbox',
    p2Body:
      'Подборка действительно полезных AI-инструментов, собранных в одном месте, чтобы вы быстро нашли нужный, без лишнего поиска.',
    p2t1: 'Web',
    p2t2: 'AI',
    p2t3: 'Инструменты',
    p3Title: 'Open Source',
    p3Body:
      'Публичный код и эксперименты на GitHub, живая история того, как я работаю, что создаю и как выглядит моя работа.',
    p3t1: 'GitHub',
    p3t2: 'Код',
    p3Link: 'Открыть GitHub',
    pLink: 'Смотреть проект',
    aboutLabel: 'Обо мне',
    aboutH2a: 'Партнёр, ',
    aboutH2b: 'а не просто разработчик',
    aboutBody:
      'Вы приносите идею или задачу. Я приношу способность превратить её в работающее ПО, от начала и до конца. Понятная коммуникация, готовые результаты и продукты, полезные с первого дня.',
    contactEyebrow: 'Свяжитесь со мной',
    contactH2a: 'Есть идея? ',
    contactH2b: 'Давайте создадим её.',
    contactBody:
      'Расскажите, что вам нужно: бот, сайт, AI-функция или целый продукт. Я отвечу чётким планом.',
    email: 'placeholder@email.com',
    telegram: '@quixote_dev',
    github: 'GitHub',
    footer: '©',
    footer2: 'Сделано с мастерством. Все данные — заглушки до добавления реальных материалов.',
    langAria: 'Язык',
    title: 'Quixote.Dev — Портфолио',
  },
};

const STORAGE_KEY = 'quixote-lang';

export function loadLang(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'en' || saved === 'ru') return saved;
  } catch {
    /* localStorage unavailable */
  }
  return 'en';
}

export function saveLang(lang: Lang): void {
  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    /* localStorage unavailable */
  }
}
