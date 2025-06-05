// src/screens/ProfileScreen.tsx

import React from 'react';
import { View, TouchableOpacity, Text } from "react-native";
import { observer } from "mobx-react-lite";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import LanguageSwitcher from '../components/LanguageSwitcher';
import ThemeToggleSwitch from '../components/ThemeToggleSwitch';
import { sg } from '../styling';
import { useStore } from '../store/StoreProvider';
import { useNavigation } from '@react-navigation/native';
import { LOGIN_SCREEN } from '../navigation/RouteNames';

const ProfileScreen = observer(() => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { authStore, themeStore } = useStore();
  const { colors, fonts } = themeStore.theme;

  const handleLogout = () => {
    authStore.logout();
  };

  return (
    <View style={[sg.flex, sg.aICenter, sg.jCCenter, { paddingTop: insets.top }]}>
      <LanguageSwitcher />
      <ThemeToggleSwitch />

      <TouchableOpacity
        onPress={handleLogout}
        style={{
          marginTop: 32,
          paddingVertical: 12,
          paddingHorizontal: 24,
          backgroundColor: colors.primary,
          borderRadius: 8,
        }}
      >
        <Text style={{ color: '#fff', ...fonts.medium }}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
});

export default ProfileScreen;
