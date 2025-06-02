import { StyleSheet } from 'react-native';

const MoodCardStyle = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    padding: 16,
    marginVertical: 4,
    marginHorizontal: 12,
    borderRadius: 16,
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
  },
  date: {
    fontSize: 14,
  },
  note: {
    marginTop: 6,
    fontSize: 14,
    fontStyle: 'italic',
  },
});

export default MoodCardStyle;
