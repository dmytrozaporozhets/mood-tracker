import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';

import { useStore } from '../store/StoreProvider';
import DarkTheme from '../styling/themes/DarkTheme';
import LightTheme from '../styling/themes/LightTheme';
import AppInitializer from './AppInitializer';
import Spinner from '../components/Spinner';
import { toNavigationTheme } from '../styling/themes/toNavigationTheme';

const AppShell = observer(() => {
  const { themeStore, authStore } = useStore();

  if (!themeStore.initialized || !authStore.initialized || authStore.loading) {
    return <Spinner />;
  }

  const currentTheme = themeStore.isDark ? DarkTheme : LightTheme;
  const navigationTheme = toNavigationTheme(currentTheme);

  return (
    <NavigationContainer theme={navigationTheme}>
      <AppInitializer />
    </NavigationContainer>
  );
});

export default AppShell;
