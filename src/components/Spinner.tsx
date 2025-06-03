import React from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, Text, View } from 'react-native';

import SpinnerStyle from '../styles/components/SpinnerStyle';
import { useStore } from '../store/StoreProvider';

const Spinner: React.FC = () => {
  const { t } = useTranslation();
  const { themeStore } = useStore();
  const { colors, fonts } = themeStore.theme;

  return (
    <View style={[SpinnerStyle.overlay, { backgroundColor: colors.spinnerOverlay }]}>
      <View style={[SpinnerStyle.spinnerContainer, { backgroundColor: colors.spinnerBackground }]}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={[SpinnerStyle.loadingText, { color: colors.text, ...fonts.medium }]}>
          {t('base.loading')}
        </Text>
      </View>
    </View>
  );
};

export default Spinner;
