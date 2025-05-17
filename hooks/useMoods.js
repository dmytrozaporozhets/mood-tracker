import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MOOD_LIST_KEY } from '../constants/storage';

export default function useMoods() {
  const [moodList, setMoodList] = useState([]);

  const loadMoods = async () => {
    try {
      const stored = await AsyncStorage.getItem(MOOD_LIST_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        const sortedList = [...parsed].sort((a, b) => new Date(b.date) - new Date(a.date));
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
