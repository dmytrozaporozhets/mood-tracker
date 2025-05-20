import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import LanguageSwitcher from '../components/LanguageSwitcher';
import { sg } from '../styling';

const ProfileScreen = () => {
  const insets = useSafeAreaInsets();
  return (
    <View style={[sg.flex, sg.aICenter, sg.jCCenter, { paddingTop: insets.top }]}>
      <LanguageSwitcher />
    </View>
  );
};

export default ProfileScreen;
