import { View } from 'react-native';
import layout from "../styles/general/layout";
import MoodPicker from '../components/MoodPicker'

const MoodScreen = () => {
    return (
        <View style={layout.container}>
            <MoodPicker/>
        </View>
    );
};

export default MoodScreen;
