import React from 'react';
import { View } from "react-native";
import { observer } from "mobx-react-lite";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import LanguageSwitcher from '../components/LanguageSwitcher';
import ThemeToggleSwitch from '../components/ThemeToggleSwitch';
import { sg } from '../styling';

const ProfileScreen = observer(() =>{
  const insets = useSafeAreaInsets();
  return (
    <View style={[sg.flex, sg.aICenter, sg.jCCenter, { paddingTop: insets.top }]}>
      <LanguageSwitcher />
      <ThemeToggleSwitch />
    </View>
  );
});

export default ProfileScreen;
