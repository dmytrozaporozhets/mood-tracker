import { StyleSheet } from 'react-native';

export const moodColors = {
  Happy: '#D1F5D3',
  Neutral: '#F5F5F5',
  Sad: '#D0E8F2',
  Angry: '#FAD4D4',
  Excited: '#FFF5C3',
};

const MoodCardStyle = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    padding: 16,
    marginVertical: 4,
    marginHorizontal: 12,
    borderRadius: 16,
    backgroundColor: '#fff', // fallback
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  emoji: {
    fontSize: 32,
    marginRight: 12,
  },
  details: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
    color: '#000',
  },
  date: {
    fontSize: 14,
    color: '#444',
  },
  note: {
    marginTop: 6,
    fontSize: 14,
    fontStyle: 'italic',
    color: '#333',
  },
});

export default MoodCardStyle;
