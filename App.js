import Navigation from './navigation/index'
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
      <SafeAreaProvider>
        <Navigation/>
      </SafeAreaProvider>
  );
}
