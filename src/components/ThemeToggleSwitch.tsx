import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { observer } from 'mobx-react-lite';
import { useStore } from '../store/StoreProvider';
import { useTranslation } from 'react-i18next';

const ThemeToggleSwitch = observer(() => {
  const { t } = useTranslation();
  const { themeStore } = useStore();
  const { colors, fonts, dark } = themeStore.theme;

  const toggleSwitch = () => themeStore.toggleTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.label, fonts.medium, { color: colors.text }]}>
        {t('settings.theme')}
      </Text>
      <View style={styles.switchContainer}>
        <Text style={[styles.text, { color: colors.text }]}>
          {t('settings.light')}
        </Text>
        <Switch
          trackColor={{
            false: colors.border,
            true: colors.primary,
          }}
          thumbColor={dark ? colors.textLight : colors.text}
          ios_backgroundColor={colors.border}
          onValueChange={toggleSwitch}
          value={dark}
        />
        <Text style={[styles.text, { color: colors.text }]}>
          {t('settings.dark')}
        </Text>
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
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  text: {
    fontSize: 14,
  },
});

export default ThemeToggleSwitch;
