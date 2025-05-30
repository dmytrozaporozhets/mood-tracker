import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';

import { useStore } from '../store/StoreProvider';
import DarkTheme from '../styling/themes/DarkTheme';
import LightTheme from '../styling/themes/LightTheme';
import AppInitializer from './AppInitializer';
import Spinner from '../components/Spinner';

const AppShell = observer(() => {
  const { themeStore } = useStore();

  if (!themeStore.initialized) {
    return <Spinner/>
  }

  const currentTheme = themeStore.isDark ? DarkTheme : LightTheme;


  return (
    <NavigationContainer theme={currentTheme}>
      <AppInitializer />
    </NavigationContainer>
  );
});

export default AppShell;
