import { MoodLabel } from "../components/MoodCard";

export const moods: { label: MoodLabel; emoji: string}[] = [
  { emoji: '😊', label: 'Happy', },
  { emoji: '😌', label: 'Relaxed', },
  { emoji: '😐', label: 'Neutral',  },
  { emoji: '😔', label: 'Sad',  },
  { emoji: '😠', label: 'Angry',  },
];

export type StreakLevel = {
  level: number;
  daysRequired: number;
  label: string;
};

export const STREAK_LEVELS: StreakLevel[] = [
  { level: 0, daysRequired: 0, label: 'Just started' },
  { level: 1, daysRequired: 3, label: 'Getting started' },
  { level: 2, daysRequired: 5, label: 'Staying consistent' },
  { level: 3, daysRequired: 7, label: 'One week streak' },
  { level: 4, daysRequired: 14, label: 'Two weeks in a row' },
  { level: 5, daysRequired: 21, label: 'Three weeks strong' },
  { level: 6, daysRequired: 30, label: 'Month of balance' },
  { level: 7, daysRequired: 50, label: 'Emotional explorer' },
  { level: 8, daysRequired: 75, label: 'Focused & grounded' },
  { level: 9, daysRequired: 100, label: 'Mood master' },
  { level: 10, daysRequired: 200, label: 'Emotional legend' },
];
