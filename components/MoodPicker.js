import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import MoodButton from './MoodButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MoodPickerStyle from '../styles/components/MoodPicker';
import { moods } from '../constants/moods';

const STORAGE_KEY = 'mood-list';

const MoodPicker = () => {
    const [selectedMood, setSelectedMood] = useState(null);
    const [moodList, setMoodList] = useState([]);

    const loadMoods = async () => {
        try {
            const stored = await AsyncStorage.getItem(STORAGE_KEY);
            if (stored) setMoodList(JSON.parse(stored));
        } catch (e) {
            console.error('Failed to load moods', e);
        }
    };

    useEffect(() => {
        loadMoods();
    }, []);

    const handleSave = async () => {
        if (!selectedMood) return;
        const newList = [...moodList, { ...selectedMood, date: new Date().toISOString() }];

        try {
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newList));
            setMoodList(newList);
            setSelectedMood(null);
        } catch (e) {
            console.error('Failed to save mood', e);
        }
    };

    return (
        <View style={MoodPickerStyle.container}>
            <Text style={MoodPickerStyle.title}>How are you feeling today?</Text>
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
                style={[
                    MoodPickerStyle.saveButton,
                    !selectedMood && MoodPickerStyle.disabledButton,
                ]}
                onPress={handleSave}
                disabled={!selectedMood}
            >
                <Text style={MoodPickerStyle.saveButtonText}>Save</Text>
            </TouchableOpacity>
            <FlatList
                data={moodList}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <Text style={MoodPickerStyle.historyItem}>
                        {item.emoji} - {item.label} - {new Date(item.date).toLocaleString()}
                    </Text>
                )}
                style={{ marginTop: 20 }}
            />
        </View>
    );
};

export default MoodPicker;
