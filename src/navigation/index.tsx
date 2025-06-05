import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import BottomTabBar from './BottomTabBar';
import { LOGIN_SCREEN, ONBOARDING_SCREEN, RESET_PASSWORD_SCREEN, ROOT_TABS } from './RouteNames';
import OnboardingScreen from '../screens/onboarding/OnboardingScreen';
import { ONBOARDING_SHOWN_KEY } from '../constants/storage';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import { REGISTER_SCREEN } from './RouteNames';
import ResetPasswordScreen from '../screens/auth/ResetPasswordScreen';
import { useStore } from '../store/StoreProvider';
import { observer } from 'mobx-react-lite';

type NavigationProps = {
  showOnboarding: boolean;
  setShowOnboarding: (value: boolean) => void;
};

const Stack = createNativeStackNavigator();

const Navigation: React.FC<NavigationProps> = observer(({ showOnboarding, setShowOnboarding }) => {
  const { authStore } = useStore();
  console.log(authStore)
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!authStore.user ? 
        (<>
          <Stack.Screen name={LOGIN_SCREEN} component={LoginScreen} />
          <Stack.Screen name={REGISTER_SCREEN} component={RegisterScreen} />
          <Stack.Screen name={RESET_PASSWORD_SCREEN} component={ResetPasswordScreen} />
        </> ):(
        <>
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
        </>)}
    </Stack.Navigator>
  );
});

export default Navigation;
