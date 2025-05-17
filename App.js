import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { I18nextProvider } from 'react-i18next';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Navigation from './navigation';
import { sg } from './styling';
import { useLanguage } from './hooks/useLanguage';

export default function App() {
  const { isLanguageReady, i18n } = useLanguage();

  if (!isLanguageReady) {
    return (
      <View style={[sg.flex, sg.center]}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <I18nextProvider i18n={i18n}>
      <SafeAreaProvider>
        <Navigation />
      </SafeAreaProvider>
    </I18nextProvider>
  );
}
