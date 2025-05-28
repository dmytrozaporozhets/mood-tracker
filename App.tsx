import React, { useEffect, useState } from 'react';
import { I18nextProvider } from 'react-i18next';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { i18n, initI18n } from './src/utils/i18n/i18n';
import Spinner from './src/components/Spinner';
import AppInitializer from './src/init/AppInitializer';

export default function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const initializeApp = async () => {
      await initI18n();
      setIsReady(true);
    };
    initializeApp();
  }, []);

  return (
    <I18nextProvider i18n={i18n}>
      <SafeAreaProvider>
        {isReady ? <AppInitializer /> : <Spinner />}
      </SafeAreaProvider>
    </I18nextProvider>
  );
}
