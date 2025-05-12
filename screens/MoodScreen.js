import { View } from 'react-native';
import layout from "../styles/general/layout";
import MoodPicker from '../components/MoodPicker'
import ScreenView from '../components/ScreenView'

const MoodScreen = () => {
    return (
        <ScreenView>
            <View style={layout.center}>
                <MoodPicker/>
            </View>
        </ScreenView>
    );
};

export default MoodScreen;
