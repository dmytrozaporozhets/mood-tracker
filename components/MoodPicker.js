import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import useMoods from '../hooks/useMoods'

import { moods } from '../constants/moods';
import { MOOD_LIST_KEY } from '../constants/storage';
import MoodPickerStyle from '../styles/components/MoodPicker';
import MoodButton from './MoodButton';

const MoodPicker = () => {
  const [selectedMood, setSelectedMood] = useState(null);
  const { moodList,setMoodList, loadMoods } = useMoods();
  const { t } = useTranslation();

  const handleSave = async () => {
    if (!selectedMood) return;
    const newItem = { ...selectedMood, date: new Date().toISOString(), id: Date.now() };
    const updatedList = [...moodList, newItem];
    const sortedList = [...updatedList].sort((a, b) => new Date(b.date) - new Date(a.date));

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
  }, []);

  return (
    <View>
      <Text style={MoodPickerStyle.title}>{t('mood:title')}</Text>
      <View style={MoodPickerStyle.moodList}>
        {moods.map((mood) => (
          <MoodButton
            key={mood.label}
            value={mood}
            isSelected={selectedMood?.label === mood.label}
            onPress={() => setSelectedMood(mood)}
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
