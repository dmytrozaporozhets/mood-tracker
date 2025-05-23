import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Localization from 'expo-localization';
import i18n, { i18n as I18nType } from 'i18next';
import { useEffect, useState } from 'react';
import { initReactI18next } from 'react-i18next';

import { LANGUAGE_STORAGE_KEY } from '../constants/storage';
import en from '../utils/i18n/locales/en';
import ua from '../utils/i18n/locales/ua';

type LanguageCode = 'en' | 'ua';

const resources = {
  en,
  ua,
} as const;

const getInitialLanguage = async (): Promise<LanguageCode> => {
  try {
    const storedLang = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (storedLang && Object.keys(resources).includes(storedLang)) {
      return storedLang as LanguageCode;
    }
  } catch (e) {
    console.warn('Language load failed from storage', e);
  }

  const deviceLang = Localization.getLocales()[0]?.languageCode;
  return Object.keys(resources).includes(deviceLang as LanguageCode)
    ? (deviceLang as LanguageCode)
    : 'en';
};

export const useLanguage = (): { isLanguageReady: boolean; i18n: I18nType } => {
  const [isLanguageReady, setIsLanguageReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      const lng = await getInitialLanguage();
      await i18n.use(initReactI18next).init({
        resources,
        lng,
        fallbackLng: 'en',
        interpolation: { escapeValue: false },
        react: { useSuspense: false },
      });
      setIsLanguageReady(true);
    };

    init();
  }, []);

  return { isLanguageReady, i18n };
};
