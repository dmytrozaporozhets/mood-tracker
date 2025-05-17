import { useEffect, useState } from 'react';
import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import * as Localization from 'expo-localization';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { LANGUAGE_STORAGE_KEY } from '../constants/storage';
import en from '../utils/i18n/locales/en';
import ua from '../utils/i18n/locales/ua';

const resources = {
  en,
  ua,
};

const getInitialLanguage = async () => {
  try {
    const storedLang = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (storedLang && Object.keys(resources).includes(storedLang)) {
      return storedLang;
    }
  } catch (e) {
    console.warn('Language load failed from storage', e);
  }

  const deviceLang = Localization.getLocales()[0]?.languageCode;
  return Object.keys(resources).includes(deviceLang) ? deviceLang : 'en';
};

export const useLanguage = () => {
  const [isLanguageReady, setIsLanguageReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      const lng = await getInitialLanguage();
      await i18n
        .use(initReactI18next)
        .init({
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
