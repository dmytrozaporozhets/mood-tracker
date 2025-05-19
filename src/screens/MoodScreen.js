import { Text, View } from 'react-native';

import ScreenView from '../components/ScreenView';
import layout from '../styles/general/layout';

const MoodScreen = () => {
  return (
    <ScreenView>
      <View style={layout.center}>
        <Text>Mood Screen</Text>
      </View>
    </ScreenView>
  );
};

export default MoodScreen;
