import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, TouchableOpacity, View } from 'react-native';

import { moods } from '../constants/moods';
import MoodPickerStyle from '../styles/components/MoodPicker';
import MoodButton from './MoodButton';
import { MoodItem } from './MoodCard';
import { useStore } from '../store/StoreProvider';

interface MoodPickerProps {
  onSelectMood?: () => void;
}

const MoodPicker: React.FC<MoodPickerProps> = ({ onSelectMood }) => {
  const [selectedMood, setSelectedMood] = useState<MoodItem | null>(null);
  const { moodStore } = useStore();
  const { t } = useTranslation();

  const handleSave = async () => {
    if (!selectedMood) return;

    const newItem: MoodItem = {
      ...selectedMood,
      date: new Date().toISOString(),
      id: Date.now(),
    };

    await moodStore.saveMood(newItem);
    setSelectedMood(null);
    onSelectMood?.();
  };

  return (
    <View>
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
        style={[
          MoodPickerStyle.saveButton,
          !selectedMood && MoodPickerStyle.disabledButton,
        ]}
        onPress={handleSave}
        disabled={!selectedMood}
      >
        <Text style={MoodPickerStyle.saveButtonText}>{t('button:save')}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MoodPicker;
