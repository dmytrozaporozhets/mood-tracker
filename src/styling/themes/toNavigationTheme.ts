import type { Theme as NavigationThemeType } from '@react-navigation/native';
import type { Theme as AppTheme } from '../../types/theme';

export const toNavigationTheme = (theme: AppTheme): NavigationThemeType => ({
  dark: theme.dark,
  colors: {
    primary: theme.colors.primary,
    background: theme.colors.background,
    card: theme.colors.card,
    text: theme.colors.text,
    border: theme.colors.border,
    notification: theme.colors.error,
  },
  fonts: theme.fonts,
});