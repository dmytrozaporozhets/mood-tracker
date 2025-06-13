import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { observer } from 'mobx-react-lite';

import { LANGUAGE_STORAGE_KEY } from '../constants/storage';
import { useStore } from '../store/StoreProvider';

const LanguageSwitcher: React.FC = observer(() => {
  const { i18n, t } = useTranslation();
  const { themeStore } = useStore();
  const { colors, fonts} = themeStore.theme;

  const changeLang = async (lng: string) => {
    await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, lng);
    await i18n.changeLanguage(lng);
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.label, fonts.medium, { color: colors.text }]}>
        {t('settings.language')}
      </Text>
      <View style={styles.langContainer}>
        {['en', 'ua'].map((lng) => {
          const isActive = i18n.language === lng;
          return (
            <Pressable
              key={lng}
              onPress={() => changeLang(lng)}
              style={[
                styles.langButton,
                {
                  backgroundColor: isActive ? colors.primary : 'transparent',
                  borderColor: colors.primary,
                },
              ]}
            >
              <Text
                style={[
                  styles.langText,
                  fonts.medium,
                  {
                    color: isActive ? colors.textLight : colors.text,
                  },
                ]}
              >
                {lng.toUpperCase()}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 12,
  },
  langContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  langButton: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderRadius: 8,
  },
  langText: {
    fontSize: 14,
  },
});

export default LanguageSwitcher;
