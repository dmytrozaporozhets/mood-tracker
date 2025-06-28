import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useStore } from '../store/StoreProvider';
import ProgressBar from './ProgressBar';
import { calculateMoodStreakCount, getStreakLevelAndProgress } from '../utils/mood';
import { sg } from '../styling';

const StreakCard: React.FC<{ title: string }> = ({ title }) => {
  const { t } = useTranslation();
  const { themeStore, moodStore } = useStore();
  const { colors } = themeStore.theme;

  const streakCount = calculateMoodStreakCount(moodStore.moodList);
  const { progress, level, levelLabel, daysToNextLevel, nextLevel } = getStreakLevelAndProgress(streakCount);

  return (
    <View style={[styles.cardBox, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <Text style={[styles.cardTitle, { color: colors.text }]}>{title}</Text>

      <View style={[sg.row, sg.jCSpaceBetween, sg.aICenter,sg.mB10]}>
        <Text style={[styles.levelLabelText, { color: colors.primary }]}>
          {t(`home.streakLevel.${level}`, levelLabel)}
        </Text>
        <Text style={[styles.streakCountText, { color: colors.text }]}>
        {t('home.streakCount', { count: streakCount })}
        </Text>
      </View>

      <ProgressBar
        progress={progress}
        duration={800}
        leftLabel={t('home.level' ,{level:level} )}
        rightLabel={t('home.level' ,{level:nextLevel})}
      />

      {daysToNextLevel > 0 ? (
        <Text style={[styles.motivationText, { color: colors.text }]}>
          {t('home.motivation', {
            count: daysToNextLevel,
            nextLevel,
          })}
        </Text>
      ) : (
        <Text style={[styles.motivationText, { color: colors.text }]}>
          {t('home.motivation', {
            count: 0,
            nextLevel: level,
          })}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  cardBox: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12,
  },
  streakCountText: {
    fontSize: 16,
    fontStyle: 'italic',
  },
  levelLabelText: {
    fontSize: 16,
    fontWeight: '600',
  },
  motivationText: {
    fontSize: 15,
    fontStyle: 'italic',
    marginTop: 10,
    textAlign: 'center',
  },
});

export default StreakCard;
