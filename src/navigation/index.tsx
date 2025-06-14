import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import BottomTabBar from './BottomTabBar';
import {
  LOGIN_SCREEN,
  ONBOARDING_SCREEN,
  RESET_PASSWORD_SCREEN,
  ROOT_TABS,
  SETTINGS_SCREEN,
  REGISTER_SCREEN,
} from './RouteNames';

import OnboardingScreen from '../screens/onboarding/OnboardingScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import ResetPasswordScreen from '../screens/auth/ResetPasswordScreen';
import SettingsScreen from '../screens/SettingsScreen';

import { useStore } from '../store/StoreProvider';
import { observer } from 'mobx-react-lite';

type NavigationProps = {
  showOnboarding: boolean;
  setShowOnboarding: () => void;
};

const Stack = createNativeStackNavigator();

const Navigation: React.FC<NavigationProps> = observer(
  ({ showOnboarding, setShowOnboarding }) => {
    const { authStore } = useStore();

    const Stack = createNativeStackNavigator();

    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!authStore.user ? (
          <>
            <Stack.Screen name={LOGIN_SCREEN} component={LoginScreen} />
            <Stack.Screen name={REGISTER_SCREEN} component={RegisterScreen} />
            <Stack.Screen name={RESET_PASSWORD_SCREEN} component={ResetPasswordScreen} />
          </>
        ) : showOnboarding ? (
          <Stack.Screen
            name={ONBOARDING_SCREEN}
            children={(props) => (
              <OnboardingScreen {...props} onFinish={setShowOnboarding} />
            )}
          />
        ) : (
          <>
            <Stack.Screen name={ROOT_TABS} component={BottomTabBar} />
            <Stack.Screen name={SETTINGS_SCREEN} component={SettingsScreen} />
          </>
        )}
      </Stack.Navigator>
    );
  }
);


export default Navigation;
