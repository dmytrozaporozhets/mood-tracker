import { View } from 'react-native';
import MoodPicker from "./components/MoodPicker";
import layout from "./styles/general/layout";

export default function App() {
  return (
      <View style={layout.container}>
        <MoodPicker/>
      </View>
  );
}
