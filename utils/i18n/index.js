import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';

import en from './locales/en.js';
import ua from './locales/ua.js';

const resources = {
  en,
  ua,
};

i18n.use(initReactI18next).init({
  resources,
  lng: Localization.getLocales()[0].languageCode,
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
  react: {
    useSuspense: true,
  },
});

export default i18n;
