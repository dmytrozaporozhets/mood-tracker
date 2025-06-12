import React from 'react';
import { View ,Text} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { sg } from '../styling';

const HomeScreen = () => {
  const insets = useSafeAreaInsets();
  return (
    <View style={[sg.flex, sg.aICenter, sg.jCCenter, { paddingTop: insets.top }]}>
      <Text>Home screen</Text>
    </View>
  );
};

export default HomeScreen;
