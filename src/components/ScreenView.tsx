import React, { ReactNode } from 'react';
import { SafeAreaView, StatusBar, StyleProp, ViewStyle } from 'react-native';

import { isAndroid } from '../utils/device';
import { sg } from '../styling';
import { useStore } from '../store/StoreProvider';

interface ScreenViewProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

const ScreenView: React.FC<ScreenViewProps> = ({ children, style }) => {
  const paddingTop = isAndroid ? StatusBar.currentHeight ?? 0 : 0;

  const { themeStore } = useStore();
  const { colors, dark } = themeStore.theme;

  return (
    <SafeAreaView
      style={[
        sg.center,
        { paddingTop, backgroundColor: colors.background },
        style,
      ]}
    >
      <StatusBar
        barStyle={dark ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background}
      />
      {children}
    </SafeAreaView>
  );
};

export default ScreenView;
