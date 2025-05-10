import React, { useState, useEffect,useRef } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import MoodButton from './MoodButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MoodPickerStyle from '../styles/components/MoodPicker';
import { moods } from '../constants/moods';
import MoodCard from '../components/MoodCard'

const STORAGE_KEY = 'mood-list';

const MoodPicker = () => {
    const [selectedMood, setSelectedMood] = useState(null);
    const [moodList, setMoodList] = useState([]);
    const flatListRef = useRef(null);

    const handleSave = async () => {
        if (!selectedMood) return;
        const newItem = { ...selectedMood, date: new Date().toISOString(), id: Date.now(), };
        const updatedList = [...moodList, newItem];
        const sortedList = [...updatedList].sort((a, b) => new Date(b.date) - new Date(a.date));


        try {
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(sortedList));
            setMoodList(sortedList);
            setSelectedMood(null);
            flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
        } catch (e) {
            console.error('Failed to save mood', e);
        }
    };

    const loadMoods = async () => {
        try {
            const stored = await AsyncStorage.getItem(STORAGE_KEY);
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
                    <MoodCard item={item}/>
                )}
                style={{ marginTop: 20 }}
                contentContainerStyle={{ paddingBottom: 100 }}
                ref={flatListRef}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

export default MoodPicker;
