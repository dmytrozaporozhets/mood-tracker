import { MoodItem } from '../components/MoodCard';
import { STREAK_LEVELS } from '../constants/moods';
import { getTodayDate, getDateBefore } from './date';

export function getStreakLevelAndProgress(streakCount: number) {
  let levelIndex = 0;

  for (let i = STREAK_LEVELS.length - 1; i >= 0; i--) {
    if (streakCount >= STREAK_LEVELS[i].daysRequired) {
      levelIndex = i;
      break;
    }
  }

  const current = STREAK_LEVELS[levelIndex];
  const next = STREAK_LEVELS[levelIndex + 1] ?? current;

  const progress = (streakCount - current.daysRequired) / (next.daysRequired - current.daysRequired);

  const daysToNextLevel = next.daysRequired - streakCount > 0 ? next.daysRequired - streakCount : 0;

  return {
    level: current.level,
    levelLabel: current.label,
    progress: Math.min(Math.max(progress, 0), 1),
    daysToNextLevel,
    nextLevel: next.level,
  };
}




export function calculateMoodStreakCount(moodList: MoodItem[]): number {
  if (!moodList.length) return 0;

  const today = getTodayDate();
  const moodDatesSet = new Set(moodList.map(item => item.date.split("T")[0]));

  let streak = 0;
  for (let i = 0; ; i++) {
    const dateToCheck = getDateBefore(today, i);
    if (moodDatesSet.has(dateToCheck)) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
}

