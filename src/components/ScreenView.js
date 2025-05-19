import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';

import layout from '../styles/general/layout';
import { isAndroid } from '../utils/device';

const ScreenView = ({ children, style }) => {
  const paddingTop = isAndroid ? StatusBar.currentHeight : 0;

  return <SafeAreaView style={[layout.container, { paddingTop }, style]}>{children}</SafeAreaView>;
};

export default ScreenView;
