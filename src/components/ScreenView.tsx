import React, { ReactNode } from 'react';
import { SafeAreaView, StatusBar, StyleProp, ViewStyle } from 'react-native';

import { isAndroid } from '../utils/device';
import { sg } from '../styling';

interface ScreenViewProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

const ScreenView: React.FC<ScreenViewProps> = ({ children, style }) => {
  const paddingTop = isAndroid ? StatusBar.currentHeight ?? 0 : 0;

  return <SafeAreaView style={[sg.center, { paddingTop }, style]}>{children}</SafeAreaView>;
};

export default ScreenView;
