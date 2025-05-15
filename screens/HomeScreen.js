import React from 'react';
import { Text, View } from 'react-native';
import {sg} from '../styling'
import { useSafeAreaInsets } from "react-native-safe-area-context";

const HomeScreen = () => {
  const insets = useSafeAreaInsets();
  return (
    <View style={[sg.flex,sg.aICenter,sg.jCCenter,{paddingTop:insets.top}]} >
      <Text>Home Screen</Text>
    </View>
  );
};

export default HomeScreen;
