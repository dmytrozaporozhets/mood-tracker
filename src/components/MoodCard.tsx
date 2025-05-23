import React from 'react';
import { Text, View } from 'react-native';

import MoodCardStyle, { moodColors } from '../styles/components/MoodCard';
import { formatDate } from '../utils/date';

export type MoodLabel = keyof typeof moodColors;

export interface MoodItem {
  emoji: string;
  label: MoodLabel;
  date: string;
  note?: string;
  id?: number;
}

interface MoodCardProps {
  item: MoodItem;
}

const MoodCard: React.FC<MoodCardProps> = ({ item }) => {
  const { emoji, label, date, note } = item;
  const backgroundColor = moodColors[label] || '#eee';

  return (
    <View style={[MoodCardStyle.card, { backgroundColor }]}>
      <Text style={MoodCardStyle.emoji}>{emoji}</Text>
      <View style={MoodCardStyle.details}>
        <Text style={MoodCardStyle.label}>{label}</Text>
        <Text style={MoodCardStyle.date}>{formatDate(date)}</Text>
        {note ? <Text style={MoodCardStyle.note}>{note}</Text> : null}
      </View>
    </View>
  );
};

export default MoodCard;
