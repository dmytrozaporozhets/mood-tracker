import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import MoodButton from "./MoodButton";
import MoodPickerStyle from "../styles/components/MoodPicker";

const moods = [
    { emoji: "😊", label: "Happy" },
    { emoji: "😐", label: "Neutral" },
    { emoji: "😔", label: "Sad" },
    { emoji: "😠", label: "Angry" },
];

const MoodPicker = () => {
    const [selectedMood, setSelectedMood] = useState(null);

    return (
        <View style={MoodPickerStyle.container}>
            <Text style={MoodPickerStyle.title}>How are you feeling today?</Text>
            <View style={MoodPickerStyle.moodList}>
                {moods.map((mood) => (
                    <MoodButton
                        value={mood}
                        isSelected={selectedMood?.label === mood.label}
                        key={mood.label}
                        onPress={() => setSelectedMood(mood)}
                    >
                        <Text style={MoodPickerStyle.emoji}>{mood.emoji}</Text>
                    </MoodButton>
                ))}
            </View>
            <Button
                title="Save"
                onPress={() => console.log("Selected mood:", selectedMood)}
                disabled={!selectedMood}
            />
        </View>
    );
};

export default MoodPicker;
