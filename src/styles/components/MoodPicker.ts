import { StyleSheet } from 'react-native';
import { Colors } from '../../styling';

const MoodPickerStyle = StyleSheet.create({
  moodList: {
    flexDirection: 'row',
    flexWrap: 'wrap',          
    justifyContent: 'center',  
    gap: 5,  
  },                
  saveButton: {
    backgroundColor: Colors.blueness[400],
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 14,
    alignSelf: 'center',
    shadowColor: Colors.greyness[600],
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 6,
    marginTop:30,
  },
  disabledButton: {
    backgroundColor: Colors.greyness[400],
  },
  saveButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
});

export default MoodPickerStyle;
