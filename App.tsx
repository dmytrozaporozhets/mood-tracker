import React from 'react';
import { I18nextProvider } from 'react-i18next';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Spinner from './src/components/Spinner';
import { useLanguage } from './src/hooks/useLanguage';
import Navigation from './src/navigation';

export default function App() {
  const { isLanguageReady, i18n } = useLanguage();

  if (!isLanguageReady) {
    return <Spinner />;
  }

  return (
    <I18nextProvider i18n={i18n}>
      <SafeAreaProvider>
        <Navigation />
      </SafeAreaProvider>
    </I18nextProvider>
  );
}
