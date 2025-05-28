import AsyncStorage from '@react-native-async-storage/async-storage';
import { MOOD_LIST_KEY } from '../constants/storage';
import { getTodayDate } from '../utils/date';
import { sortByDateDesc } from '../utils/date';
import { MoodItem } from '../components/MoodCard';

export const saveTodayMoodItem = async (newMood: MoodItem): Promise<MoodItem[]> => {
  try {
    const today = getTodayDate();
    const existing = await AsyncStorage.getItem(MOOD_LIST_KEY);
    const parsed: MoodItem[] = existing ? JSON.parse(existing) : [];

    const filtered = parsed.filter(item => item.date.split('T')[0] !== today);
    const updated = sortByDateDesc([newMood, ...filtered]);

    await AsyncStorage.setItem(MOOD_LIST_KEY, JSON.stringify(updated));
    return updated;
  } catch (error) {
    console.warn('Error saving mood:', error);
    return [];
  }
};

export const getTodayMood = async (): Promise<MoodItem | null> => {
  try {
    const existing = await AsyncStorage.getItem(MOOD_LIST_KEY);
    if (!existing) return null;

    const moodList: MoodItem[] = JSON.parse(existing);
    const today = getTodayDate();

    return moodList.find(item => item.date.split('T')[0] === today) ?? null;
  } catch (error) {
    console.warn('Error loading mood:', error);
    return null;
  }
};