import { StyleSheet } from 'react-native';

const MoodPickerStyle = StyleSheet.create({
  title: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  moodList: {
    flexDirection: 'row',
    marginBottom: 20,
    alignSelf: 'center',
  },
  saveButton: {
    backgroundColor: '#aee',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignSelf: 'center',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  saveButtonText: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
  },
});

export default MoodPickerStyle;
