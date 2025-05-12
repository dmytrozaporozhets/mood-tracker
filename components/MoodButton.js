import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import MoodButtonStyle from '../styles/components/MoodButton';

const MoodButton = ({ value, isSelected, ...rest }) => {
  return (
    <TouchableOpacity
      style={[MoodButtonStyle.moodButton, isSelected && MoodButtonStyle.selectedMood]}
      {...rest}
    >
      <Text style={MoodButtonStyle.emoji}>{value.emoji}</Text>
    </TouchableOpacity>
  );
};

export default MoodButton;
