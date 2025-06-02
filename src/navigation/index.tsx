import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import BottomTabBar from './BottomTabBar';
import { LOGIN_SCREEN, ONBOARDING_SCREEN, ROOT_TABS } from './RouteNames';
import OnboardingScreen from '../screens/onboarding/OnboardingScreen';
import { ONBOARDING_SHOWN_KEY } from '../constants/storage';
import LoginScreen from '../screens/auth/LoginScreen';

type NavigationProps = {
  showOnboarding: boolean;
  setShowOnboarding: (value: boolean) => void;
};

const Stack = createNativeStackNavigator();

const Navigation: React.FC<NavigationProps> = ({
  showOnboarding,
  setShowOnboarding,
}) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={LOGIN_SCREEN} component={LoginScreen} />
      <Stack.Screen
        name={ONBOARDING_SCREEN}
        children={(props) => (
          <OnboardingScreen
            {...props}
            onFinish={() => {
              AsyncStorage.setItem(ONBOARDING_SHOWN_KEY, 'true');
              setShowOnboarding(false);
            }}
          />
        )}
      />
      <Stack.Screen name={ROOT_TABS} component={BottomTabBar} />
    </Stack.Navigator>
  );
};

export default Navigation;
