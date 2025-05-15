import React from 'react';
import { Text, View } from 'react-native';
import {sg} from '../styling'
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MoodPicker from '../components/MoodPicker';

const HomeScreen = () => {
  const insets = useSafeAreaInsets();
  return (
    <View style={[sg.flex,sg.aICenter,sg.jCCenter,{paddingTop:insets.top}]} >
      <MoodPicker />
    </View>
  );
};

export default HomeScreen;
