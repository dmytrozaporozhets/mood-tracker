import { View } from 'react-native';

import MoodPicker from '../components/MoodPicker';
import layout from '../styles/general/layout';

const MoodScreen = () => {
  return (
    <View style={layout.container}>
      <MoodPicker />
    </View>
  );
};

export default MoodScreen;
