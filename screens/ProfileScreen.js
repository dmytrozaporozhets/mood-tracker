import React from 'react';
import { View} from 'react-native';
import { sg } from '../styling';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LanguageSwitcher from '../components/LanguageSwitcher'

const ProfileScreen = () => {
  const insets = useSafeAreaInsets();
  return (
    <View style={[sg.flex, sg.aICenter, sg.jCCenter, { paddingTop: insets.top }]}>
      <LanguageSwitcher />
    </View>
  );
};

export default ProfileScreen;
