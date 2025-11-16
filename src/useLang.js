import { create } from 'zustand';
import i18n from '../src/i18n';

export const useLang = create((set) => ({
  lang: i18n.language || 'en',
  setLang: (newLang) => {
    i18n.changeLanguage(newLang);
    set({ lang: newLang });
  },
}));
