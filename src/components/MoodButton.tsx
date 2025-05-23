import React from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';

import MoodButtonStyle from '../styles/components/MoodButton';

interface MoodValue {
  emoji: string;
}

interface MoodButtonProps extends TouchableOpacityProps {
  value: MoodValue;
  isSelected?: boolean;
}

const MoodButton: React.FC<MoodButtonProps> = ({ value, isSelected, ...rest }) => {
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
