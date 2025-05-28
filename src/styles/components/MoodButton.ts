import { StyleSheet } from 'react-native';
import { Colors } from '../../styling';

const MoodButtonStyle = StyleSheet.create({
  moodButton: {
    marginHorizontal: 5,
    marginVertical: 5,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 12,
    backgroundColor: Colors.primary[100],
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  selectedMood: {
    backgroundColor: Colors.primary[400],
    shadowColor: '#3478f6',
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 8,
  },
  emoji: {
    fontSize: 26,
  },
});

export default MoodButtonStyle;
