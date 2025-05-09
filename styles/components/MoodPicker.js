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
    emoji: {
        fontSize: 30,
    },
});

export default MoodPickerStyle;
