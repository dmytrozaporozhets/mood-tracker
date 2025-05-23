import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

import { MOOD_LIST_KEY } from '../constants/storage';
import { MoodItem } from '../components/MoodCard';

export default function useMoods() {
  const [moodList, setMoodList] = useState<MoodItem[]>([]);

  const loadMoods = async () => {
    try {
      const stored = await AsyncStorage.getItem(MOOD_LIST_KEY);
      if (stored) {
        const parsed: MoodItem[] = JSON.parse(stored);
        const sortedList = [...parsed].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setMoodList(sortedList);
      }
    } catch (e) {
      console.error('Failed to load moods', e);
    }
  };

  useEffect(() => {
    loadMoods();
  }, []);

  return { moodList, setMoodList, loadMoods };
}
