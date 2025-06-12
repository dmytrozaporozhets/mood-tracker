import AsyncStorage from '@react-native-async-storage/async-storage';
import { getTodayDate, sortByDateDesc } from '../utils/date';
import { MoodItem } from '../components/MoodCard';
import { MOOD_LIST_KEY } from '../constants/storage';

export const getMoodKey = (uid: string) => `${MOOD_LIST_KEY}-${uid}`;

export const saveTodayMoodItem = async (
  uid: string,
  newMood: MoodItem
): Promise<MoodItem[]> => {
  try {
    const key = getMoodKey(uid);
    const today = getTodayDate();
    const existing = await AsyncStorage.getItem(key);
    const parsed: MoodItem[] = existing ? JSON.parse(existing) : [];

    const filtered = parsed.filter((item) => item.date.split('T')[0] !== today);
    const updated = sortByDateDesc([newMood, ...filtered]);

    await AsyncStorage.setItem(key, JSON.stringify(updated));
    return updated;
  } catch (error) {
    console.warn('Error saving mood:', error);
    return [];
  }
};

export const getTodayMood = async (uid: string): Promise<MoodItem | null> => {
  try {
    const key = getMoodKey(uid);
    const existing = await AsyncStorage.getItem(key);
    if (!existing) return null;

    const moodList: MoodItem[] = JSON.parse(existing);
    const today = getTodayDate();

    return moodList.find((item) => item.date.split('T')[0] === today) ?? null;
  } catch (error) {
    console.warn('Error loading mood:', error);
    return null;
  }
};

export const loadUserMoods = async (uid: string): Promise<MoodItem[]> => {
  try {
    const key = getMoodKey(uid);
    const stored = await AsyncStorage.getItem(key);
    if (stored) {
      const parsed: MoodItem[] = JSON.parse(stored);
      return sortByDateDesc(parsed);
    }
    return [];
  } catch (e) {
    console.error('Failed to load moods', e);
    return [];
  }
};

export const clearUserMoods = async (uid: string) => {
  try {
    const key = getMoodKey(uid);
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.warn('Failed to clear moods', e);
  }
};
