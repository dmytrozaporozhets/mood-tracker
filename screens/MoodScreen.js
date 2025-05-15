import { View } from 'react-native';

import MoodPicker from '../components/MoodPicker';
import ScreenView from '../components/ScreenView';
import layout from '../styles/general/layout';

const MoodScreen = () => {
  return (
    <ScreenView>
      <View style={layout.center}>
        <MoodPicker />
      </View>
    </ScreenView>
  );
};

export default MoodScreen;
