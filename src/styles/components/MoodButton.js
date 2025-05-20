import { StyleSheet } from 'react-native';

const MoodButtonStyle = StyleSheet.create({
  moodButton: {
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#eee',
  },
  selectedMood: {
    backgroundColor: '#aee',
  },
  emoji: {
    fontSize: 30,
  },
});

export default MoodButtonStyle;
