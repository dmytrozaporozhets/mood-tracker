import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { useTranslation } from 'react-i18next';

import HistoryScreen from '../screens/HistoryScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { CustomBottomBar } from './CustomBottomBar';

const Tab = createBottomTabNavigator();

const BottomTabBar = () => {
  const { t } = useTranslation();
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <CustomBottomBar {...props} />}
    >
      <Tab.Screen name={t('route:home')} component={HomeScreen} />
      <Tab.Screen name={t('route:history')} component={HistoryScreen} />
      <Tab.Screen name={t('route:profile')} component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabBar;
