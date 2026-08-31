import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { I18N, loadLang, saveLang, type Dict, type Lang } from './i18n';

interface LangContextValue {
  lang: Lang;
  t: Dict;
  setLang: (lang: Lang) => void;
}

const LangContext = createContext<LangContextValue | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => loadLang());

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = I18N[lang].title;
  }, [lang]);

  const setLang = (next: Lang) => {
    setLangState(next);
    saveLang(next);
  };

  return (
    <LangContext.Provider value={{ lang, t: I18N[lang], setLang }}>
      {children}
    </LangContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLang(): LangContextValue {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLang must be used within LangProvider');
  return ctx;
}
