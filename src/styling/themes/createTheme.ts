import ThemedColors from '../ThemedColors';
import { Theme } from '../../types/theme';

export const createTheme = (isDark: boolean): Theme => ({
  dark: isDark,
  colors: {
    primary: isDark ? ThemedColors.primaryDark : ThemedColors.primary,
    primaryDark: ThemedColors.primaryDark,
    secondary: isDark ? ThemedColors.secondaryDark : ThemedColors.secondary,
    secondaryDark: ThemedColors.secondaryDark,
    background: isDark ? ThemedColors.darkBackground : ThemedColors.lightBackground,
    lightBackground: ThemedColors.lightBackground,
    darkBackground: ThemedColors.darkBackground,
    text: isDark ? ThemedColors.textLight : ThemedColors.text,
    textLight: ThemedColors.textLight,
    border: isDark ? ThemedColors.borderDark : ThemedColors.border,
    borderDark: ThemedColors.borderDark,
    card: isDark ? ThemedColors.cardDark : ThemedColors.card,
    cardDark: ThemedColors.cardDark,
    error: isDark ? ThemedColors.errorDark : ThemedColors.error,
    errorDark: ThemedColors.errorDark,
    placeholder: isDark ? ThemedColors.placeholderDark : ThemedColors.placeholder,
    placeholderDark: ThemedColors.placeholderDark,
    inputBackground: isDark ? ThemedColors.inputBackgroundDark : ThemedColors.inputBackground,
    inputBackgroundDark: ThemedColors.inputBackgroundDark,
    bottomBar: isDark ? ThemedColors.bottomBarDark : ThemedColors.bottomBar,
    bottomBarDark: ThemedColors.bottomBarDark,
    notification: ThemedColors.notification,
    spinnerOverlay: isDark ? ThemedColors.spinnerOverlayDark : ThemedColors.spinnerOverlay,
    spinnerOverlayDark: ThemedColors.spinnerOverlayDark,
    spinnerBackground: isDark ? ThemedColors.spinnerBackgroundDark : ThemedColors.spinnerBackground,
    spinnerBackgroundDark: ThemedColors.spinnerBackgroundDark,
    moodEmoji: {
      background: ThemedColors.moodEmoji.background,
      label: ThemedColors.moodEmoji.label,
      date: ThemedColors.moodEmoji.date,
      note: ThemedColors.moodEmoji.note,
    },
  },
  fonts: {
    regular: { fontFamily: 'System', fontWeight: '400' },
    medium: { fontFamily: 'System', fontWeight: '500' },
    light: { fontFamily: 'System', fontWeight: '300' },
    thin: { fontFamily: 'System', fontWeight: '100' },
    bold: { fontFamily: 'System', fontWeight: '700' },
    heavy: { fontFamily: 'System', fontWeight: '900' },
  }
});
