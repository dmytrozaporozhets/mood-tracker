import React from 'react';
import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import MoodCardStyle from '../styles/components/MoodCard';
import { formatDate } from '../utils/date';
import { MoodColors } from '../styling/ThemedColors';
import { useStore } from '../store/StoreProvider';

export type MoodLabel = keyof typeof MoodColors;

export interface MoodItem {
  emoji: string;
  label: MoodLabel;
  date: string;
  note?: string;
  id: number;
}

interface MoodCardProps {
  item: MoodItem;
}

const MoodCard: React.FC<MoodCardProps> = ({ item }) => {
  const { t } = useTranslation();
  const { themeStore } = useStore();
  const { colors } = themeStore.theme;

  const { emoji, label, date, note } = item;
  const backgroundColor = MoodColors[label] || '#eee';

  return (
    <View style={[MoodCardStyle.card, { backgroundColor }]}>
      <Text style={MoodCardStyle.emoji}>{emoji}</Text>
      <View style={MoodCardStyle.details}>
        <Text style={[MoodCardStyle.label, { color: colors.moodEmoji.label}]}>{t(`mood.labels.${label}`)}</Text>
        <Text style={[MoodCardStyle.date, { color: colors.moodEmoji.date }]}>{formatDate(date)}</Text>
        {note ? <Text style={[MoodCardStyle.note, { color: colors.moodEmoji.note }]}>{note}</Text> : null}
      </View>
    </View>
  );
};

export default MoodCard;
