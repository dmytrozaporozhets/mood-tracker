import React from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps, ViewStyle, TextStyle } from 'react-native';

import MoodButtonStyle from '../styles/components/MoodButton';
import { useStore } from '../store/StoreProvider';

interface MoodValue {
  emoji: string;
}

interface MoodButtonProps extends TouchableOpacityProps {
  value: MoodValue;
  isSelected?: boolean;
}

const MoodButton: React.FC<MoodButtonProps> = ({ value, isSelected, style, ...rest }) => {
  const { themeStore } = useStore();
  const { colors } = themeStore.theme;

  const backgroundColor = isSelected ? colors.primary : colors.primary + '33';
  const shadowColor = isSelected ? colors.primary : '#000';

  return (
    <TouchableOpacity
      style={[
        MoodButtonStyle.moodButton,
        {
          backgroundColor,
          shadowColor,
          shadowOpacity: isSelected ? 0.35 : 0.06,
          shadowRadius: isSelected ? 12 : 6,
          elevation: isSelected ? 8 : 2,
        },
        isSelected && MoodButtonStyle.selectedMood,
        style,
      ]}
      {...rest}
    >
      <Text style={[MoodButtonStyle.emoji, { color: colors.text }]}>{value.emoji}</Text>
    </TouchableOpacity>
  );
};

export default MoodButton;
