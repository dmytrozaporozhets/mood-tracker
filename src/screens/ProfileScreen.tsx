import React from 'react';
import { Button, View } from "react-native";
import { observer } from "mobx-react-lite";
import { useStore } from "../store/StoreProvider";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import LanguageSwitcher from '../components/LanguageSwitcher';
import { sg } from '../styling';

const ProfileScreen = observer(() =>{
  const insets = useSafeAreaInsets();
   const { themeStore } = useStore();
  return (
    <View style={[sg.flex, sg.aICenter, sg.jCCenter, { paddingTop: insets.top }]}>
      <LanguageSwitcher />
      <Button
        title={themeStore.isDark ? "Switch to Light Theme" : "Switch to Dark Theme"}
        onPress={() => themeStore.toggleTheme()}
      />
    </View>
  );
});

export default ProfileScreen;
