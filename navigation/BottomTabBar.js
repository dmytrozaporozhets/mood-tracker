import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';

import HistoryScreen from '../screens/HistoryScreen';
import HomeScreen from '../screens/HomeScreen';
import { CustomBottomBar } from './CustomBottomBar';
import { HISTORY_SCREEN, HOME_SCREEN } from './RouteNames';

const Tab = createBottomTabNavigator();

const BottomTabBar = () => {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <CustomBottomBar {...props} />}
    >
      <Tab.Screen name={HOME_SCREEN} component={HomeScreen} />
      <Tab.Screen name={HISTORY_SCREEN} component={HistoryScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabBar;
