import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import BottomTabBar from './BottomTabBar';
import { ONBOARDING_SCREEN, ROOT_TABS } from './RouteNames';
import OnboardingScreen from '../screens/onboarding/OnboardingScreen';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={ONBOARDING_SCREEN} component={OnboardingScreen} />
        <Stack.Screen name={ROOT_TABS} component={BottomTabBar} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
