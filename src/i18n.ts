export type Lang = 'en' | 'ru';

export interface Dict {
  navWork: string;
  navAbout: string;
  navContact: string;
  heroH1a: string;
  heroH1b: string;
  heroH1c: string;
  heroLede: string;
  heroCta1: string;
  heroCta2: string;
  workLabel: string;
  workH2a: string;
  workH2b: string;
  workBody: string;
  workCta: string;
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
  projectsTitle: string;
  projectsBack: string;
  projectAutopilot: string;
  projectAutopilotDesc: string;
  projectAiToolbox: string;
  projectAiToolboxDesc: string;
  projectOpenSource: string;
  projectOpenSourceDesc: string;
}

export const I18N: Record<Lang, Dict> = {
  en: {
    navWork: 'Work',
    navAbout: 'About',
    navContact: 'Contact',
    heroH1a: 'Ideas, ',
    heroH1b: 'engineered',
    heroH1c: ' into shipped software.',
    heroLede:
      "I'm Quixote, a developer who turns vague ideas and hard problems into real, working products. From AI-powered automation to useful tools, I build the thing you can actually use.",
    heroCta1: 'See my work',
    heroCta2: "Let's talk",
    workLabel: 'Selected Work',
    workH2a: "Projects I've ",
    workH2b: 'built & shipped',
    workBody:
      'AutoPilot Bot — Telegram bot with AI assistant for auto-posting content. AI Toolbox — a curated site of useful AI tools. Open Source — public experiments and code on GitHub.',
    workCta: 'View all projects',
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
    projectsTitle: 'All Projects',
    projectsBack: 'Back',
    projectAutopilot: 'AutoPilot Bot',
    projectAutopilotDesc: 'Telegram bot with AI assistant for auto-posting content.',
    projectAiToolbox: 'AI Toolbox',
    projectAiToolboxDesc: 'A curated site of useful AI tools.',
    projectOpenSource: 'Open Source',
    projectOpenSourceDesc: 'Public experiments and code on GitHub.',
  },
  ru: {
    navWork: 'Работы',
    navAbout: 'Обо мне',
    navContact: 'Контакты',
    heroH1a: 'Идеи — в ',
    heroH1b: 'работающий',
    heroH1c: ' продукт.',
    heroLede:
      'Я Quixote, разработчик, который превращает расплывчатые идеи и сложные задачи в настоящие, работающие продукты. От AI-автоматизации до полезных инструментов, я создаю то, чем реально можно пользоваться.',
    heroCta1: 'Мои работы',
    heroCta2: 'Обсудить проект',
    workLabel: 'Избранные работы',
    workH2a: 'Проекты, которые я ',
    workH2b: 'создал и запустил',
    workBody:
      'AutoPilot Bot — Telegram-бот с AI-ассистентом для автопубликации контента. AI Toolbox — подборка полезных AI-инструментов в одном месте. Open Source — публичный код и эксперименты на GitHub.',
    workCta: 'Все проекты',
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
    projectsTitle: 'Все проекты',
    projectsBack: 'Назад',
    projectAutopilot: 'AutoPilot Bot',
    projectAutopilotDesc: 'Telegram-бот с AI-ассистентом для автопубликации контента.',
    projectAiToolbox: 'AI Toolbox',
    projectAiToolboxDesc: 'Подборка полезных AI-инструментов.',
    projectOpenSource: 'Open Source',
    projectOpenSourceDesc: 'Публичный код и эксперименты на GitHub.',
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
