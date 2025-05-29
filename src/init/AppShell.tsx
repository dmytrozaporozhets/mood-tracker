import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';

import { useStore } from '../store/StoreProvider';
import DarkTheme from '../styling/themes/DarkTheme';
import LightTheme from '../styling/themes/LightTheme';
import AppInitializer from './AppInitializer';

const AppShell = observer(() => {
  const { themeStore } = useStore();
  const currentTheme = themeStore.isDark ? DarkTheme : LightTheme;


  return (
    <NavigationContainer theme={currentTheme}>
      <AppInitializer />
    </NavigationContainer>
  );
});

export default AppShell;
