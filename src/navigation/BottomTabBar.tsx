import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { useTranslation } from 'react-i18next';

import HistoryScreen from '../screens/HistoryScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import { CustomBottomBar } from './CustomBottomBar';
import { HISTORY_SCREEN, HOME_SCREEN, PROFILE_SCREEN } from './RouteNames';

const Tab = createBottomTabNavigator();

const BottomTabBar = () => {
  const { t } = useTranslation();
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <CustomBottomBar {...props} />}
    >
      <Tab.Screen
        name={HOME_SCREEN}
        component={HomeScreen}
        options={{ tabBarLabel: 'home', title: t('route.home') }}
      />
      <Tab.Screen
        name={HISTORY_SCREEN}
        component={HistoryScreen}
        options={{ tabBarLabel: 'history', title: t('route.history') }}
      />
      <Tab.Screen
        name={PROFILE_SCREEN}
        component={ProfileScreen}
        options={{ tabBarLabel: 'profile', title: t('route.profile') }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabBar;
