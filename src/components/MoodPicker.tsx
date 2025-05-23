import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, TouchableOpacity, View } from 'react-native';

import { moods } from '../constants/moods';
import { MOOD_LIST_KEY } from '../constants/storage';
import useMoods from '../hooks/useMoods';
import MoodPickerStyle from '../styles/components/MoodPicker';
import { sortByDateDesc } from '../utils/date';
import MoodButton from './MoodButton';
import { MoodItem } from './MoodCard';

const MoodPicker: React.FC = () => {
  const [selectedMood, setSelectedMood] = useState<MoodItem | null>(null);
  const { moodList, setMoodList, loadMoods } = useMoods();
  const { t } = useTranslation();

  const handleSave = async () => {
    if (!selectedMood) return;

    const newItem: MoodItem = {
      ...selectedMood,
      date: new Date().toISOString(),
      id: Date.now(),
    };

    const updatedList = [...moodList, newItem];
    const sortedList = sortByDateDesc(updatedList);

    try {
      await AsyncStorage.setItem(MOOD_LIST_KEY, JSON.stringify(sortedList));
      setMoodList(sortedList);
      setSelectedMood(null);
    } catch (e) {
      console.error('Failed to save mood', e);
    }
  };

  useEffect(() => {
    loadMoods();
  }, [loadMoods]);

  return (
    <View>
      <Text style={MoodPickerStyle.title}>{t('mood:title')}</Text>
      <View style={MoodPickerStyle.moodList}>
        {moods.map((mood) => (
          <MoodButton
            key={mood.label}
            value={mood}
            isSelected={selectedMood?.label === mood.label}
            onPress={() => setSelectedMood(mood as MoodItem)}
          />
        ))}
      </View>
      <TouchableOpacity
        style={[MoodPickerStyle.saveButton, !selectedMood && MoodPickerStyle.disabledButton]}
        onPress={handleSave}
        disabled={!selectedMood}
      >
        <Text style={MoodPickerStyle.saveButtonText}>{t('button:save')}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MoodPicker;
