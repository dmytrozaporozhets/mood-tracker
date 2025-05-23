import React from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, Text, View } from 'react-native';

import styles from '../styles/components/Spinner';
import { Colors } from '../styling';

const Spinner: React.FC = () => {
  const { t } = useTranslation();

  return (
    <View style={styles.overlay}>
      <View style={styles.spinnerContainer}>
        <ActivityIndicator size="large" color={Colors.neutrals.white} />
        <Text style={styles.loadingText}>{t('loading')}</Text>
      </View>
    </View>
  );
};

export default Spinner;
