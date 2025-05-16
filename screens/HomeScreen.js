import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import MoodPicker from '../components/MoodPicker';
import { sg } from '../styling';

const HomeScreen = () => {
  const insets = useSafeAreaInsets();
  return (
    <View style={[sg.flex, sg.aICenter, sg.jCCenter, { paddingTop: insets.top }]}>
      <MoodPicker />
    </View>
  );
};

export default HomeScreen;
