export interface BottomBarColors {
  activeBackground: string;
  inactiveBackground: string;
  activeText: string;
  inactiveText: string;
}

export interface ColorsStyle {
  primary: string;
  primaryDark: string;
  secondary: string;
  secondaryDark: string;
  background: string;
  lightBackground: string;
  darkBackground: string;
  text: string;
  textLight: string;
  border: string;
  borderDark: string;
  card: string;
  cardDark: string;
  error: string;
  errorDark: string;
  placeholder: string;
  placeholderDark: string;
  inputBackground: string;
  inputBackgroundDark: string;
  moodEmoji: { 
    background: typeof MoodColors,
    label: string,
    date: string,
    note: string;
  },
  bottomBar: BottomBarColors;
  bottomBarDark: BottomBarColors;
  notification: string;
  spinnerOverlay:string;
  spinnerOverlayDark:string;
  spinnerBackground:string;
  spinnerBackgroundDark:string;
}

export interface FontStyle {
  fontFamily: string;
  fontWeight: '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900' | 'normal' | 'bold';
}

export interface FontsStyle {
  regular: FontStyle;
  medium: FontStyle;
  light: FontStyle;
  thin: FontStyle;
  bold: FontStyle;
  heavy: FontStyle;
}

export interface Theme {
  dark: boolean;
  colors: ColorsStyle;
  fonts: FontsStyle;
}
