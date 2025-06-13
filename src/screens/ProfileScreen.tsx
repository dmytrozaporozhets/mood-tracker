import React from 'react';
import { View} from "react-native";
import { observer } from "mobx-react-lite";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { sg } from '../styling';
import { useStore } from '../store/StoreProvider';
import AppHeader from '../components/AppHeader';
import ScreenView from '../components/ScreenView';

const ProfileScreen = observer(() => {
  const insets = useSafeAreaInsets();
  const { authStore} = useStore();

  const handleLogout = () => {
    authStore.logout();
  };

  return (
    <ScreenView>
      <View style={sg.flex}>
        <AppHeader showSettings/>
        <View style={[sg.flex, sg.aICenter, sg.jCCenter, { paddingTop: insets.top }]}/>
      </View>
    </ScreenView>
  );
});

export default ProfileScreen;
