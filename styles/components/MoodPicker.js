import { StyleSheet } from 'react-native';

const MoodPickerStyle = StyleSheet.create({
    container: {
        marginTop: 100,
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        marginBottom: 20,
    },
    moodList: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    saveButton: {
        backgroundColor: '#aee',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
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
