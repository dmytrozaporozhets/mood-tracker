import { StyleSheet } from 'react-native';

const MoodButtonStyle = StyleSheet.create({
  moodButton: {
    marginHorizontal: 5,
    marginVertical: 5,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  selectedMood: {
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 8,
  },
  emoji: {
    fontSize: 26,
  },
});

export default MoodButtonStyle;
