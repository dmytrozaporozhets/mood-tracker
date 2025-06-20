import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useStore } from '../store/StoreProvider';
import { moods } from '../constants/moods';
import { MoodColors } from '../styling/Colors';
import { MoodLabel } from './MoodCard';
import { observer } from 'mobx-react-lite';
import Button from './Button';
import { SMALL } from '../constants/types';
import { sg } from '../styling';

interface MoodSelectedCardProps {
  isSelected: boolean;
  emoji?: string;
  label?: string;
  onSelectMood: () => void;
}

const MoodSelectedCard: React.FC<MoodSelectedCardProps> = observer(
  ({ isSelected, emoji, label, onSelectMood }) => {
  const { t } = useTranslation();
  const { themeStore } = useStore();
  const { colors } = themeStore.theme;

  const selectedLabel: MoodLabel = moods.find(m => m.label === label)?.label ?? 'Neutral';
  const backgroundColor = MoodColors[selectedLabel] || '#eee';


  return (
    <View style={[styles.card, { backgroundColor }]}>
      {isSelected && emoji && label ? (
        <>
          <Text style={styles.emoji}>{emoji}</Text>
          <Text style={[styles.label, { color: colors.moodEmoji.label }]}>
            {t(`mood.labels.${label}`)}
          </Text>
          <Button title={t('mood.editMood')} onPress={onSelectMood} size={SMALL} style={sg.mT20} />
        </>
      ) : (
        <TouchableOpacity onPress={onSelectMood}>
          <Text style={[styles.selectMoodText, { color: colors.text }]}>
            {t('mood.selectMood')}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
})

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    alignItems: 'center',
  },
  emoji: { fontSize: 48, marginBottom: 12 },
  label: { fontSize: 22, fontWeight: '600' },
  editButton: {
    marginTop: 12,
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
  },
  editButtonText: { fontWeight: '600' },
  selectMoodText: { fontSize: 18, fontWeight: '500', textAlign: 'center' },
});

export default MoodSelectedCard;
