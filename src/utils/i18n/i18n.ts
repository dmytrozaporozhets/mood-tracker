import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Localization from 'expo-localization';

import en from './locales/en';
import uk from './locales/uk';
import { LANGUAGE_STORAGE_KEY } from '../../constants/storage';

const resources = {
  en: { translation: en },
  uk: { translation: uk },
};

const getInitialLanguage = async (): Promise<string> => {
  try {
    const storedLang = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (storedLang && Object.keys(resources).includes(storedLang)) {
      return storedLang;
    }
  } catch {
    // ignore error
  }

  const deviceLang = Localization.getLocales()[0]?.languageCode ?? 'en';

  return Object.keys(resources).includes(deviceLang) ? deviceLang : 'en';
};

let initPromise: Promise<void> | null = null;

export const initI18n = (): Promise<void> => {
  if (!initPromise) {
    initPromise = getInitialLanguage().then((lng) =>
      i18n
        .use(initReactI18next)
        .init({
          resources,
          lng,
          fallbackLng: 'en',
          defaultNS: 'translation',
          interpolation: { escapeValue: false },
          react: { useSuspense: false },
          pluralSeparator: '_',
        })
        .then(() => undefined) 
    );
  }
  return initPromise;
};

export { i18n };
