import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import HistoryScreen from '../screens/HistoryScreen';
import { HOME_SCREEN, HISTORY_SCREEN } from './RouteNames';
import { CustomBottomBar } from './CustomBottomBar';

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
