import AsyncStorage from '@react-native-async-storage/async-storage';
import { MOOD_STORAGE_KEY } from '../constants/storage';
import { getTodayDate } from '../utils/date';


export type MoodValue = 'happy' | 'sad' | 'neutral' | 'angry' | 'excited'; // розширюй як потрібно


export const getTodayMood = async (): Promise<MoodValue | null> => {
  try {
    const data = await AsyncStorage.getItem(MOOD_STORAGE_KEY);
    if (!data) return null;

    const parsed = JSON.parse(data);
    const today = getTodayDate();

    return parsed[today] ?? null;
  } catch (error) {
    console.warn('Error loading mood:', error);
    return null;
  }
};

export const saveTodayMood = async (mood: MoodValue): Promise<void> => {
  try {
    const today = getTodayDate();
    const existing = await AsyncStorage.getItem(MOOD_STORAGE_KEY);
    const parsed = existing ? JSON.parse(existing) : {};
    parsed[today] = mood;
    await AsyncStorage.setItem(MOOD_STORAGE_KEY, JSON.stringify(parsed));
  } catch (error) {
    console.warn('Error saving mood:', error);
  }
};
