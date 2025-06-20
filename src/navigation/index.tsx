import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { observer } from 'mobx-react-lite';

import { useStore } from '../store/StoreProvider';
import {
  LOGIN_SCREEN,
  REGISTER_SCREEN,
  RESET_PASSWORD_SCREEN,
  ONBOARDING_SCREEN,
  ROOT_TABS,
  SETTINGS_SCREEN,
  EDIT_PROFILE_SCREEN,
} from './RouteNames';

import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import ResetPasswordScreen from '../screens/auth/ResetPasswordScreen';
import OnboardingScreen from '../screens/onboarding/OnboardingScreen';
import BottomTabBar from './BottomTabBar';
import SettingsScreen from '../screens/profile/SettingsScreen';
import EditProfileScreen from '../screens/profile/EditProfileScreen';

type NavigationProps = {
  onOnboardingFinish: () => void;
};

const Stack = createNativeStackNavigator();

const Navigation: React.FC<NavigationProps> = observer(
  ({ onOnboardingFinish }) => {
    const { authStore } = useStore();

    return (
       <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!authStore.user ? (
          <>
            <Stack.Screen name={LOGIN_SCREEN} component={LoginScreen} />
            <Stack.Screen name={REGISTER_SCREEN} component={RegisterScreen} />
            <Stack.Screen name={RESET_PASSWORD_SCREEN} component={ResetPasswordScreen} />
          </>
        ) : authStore.isNewUser ? (
          <Stack.Screen
            name={ONBOARDING_SCREEN}
            children={(props) => (
              <OnboardingScreen {...props} onFinish={onOnboardingFinish} />
            )}
          />
        ) : (
          <>
            <Stack.Screen name={ROOT_TABS} component={BottomTabBar} />
            <Stack.Screen name={SETTINGS_SCREEN} component={SettingsScreen} />
            <Stack.Screen name={EDIT_PROFILE_SCREEN} component={EditProfileScreen} />
          </>
        )}
      </Stack.Navigator>
    );
  }
);

export default Navigation;
