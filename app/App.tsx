import {
  SafeAreaProvider,
  initialWindowMetrics
} from 'react-native-safe-area-context';
import { AppNavigator } from './navigators';
import { useFonts } from 'expo-font';
import { customFontsToLoad } from './theme';

export default function App() {
  const [areFontsLoaded] = useFonts(customFontsToLoad);

  if (!areFontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <AppNavigator />
    </SafeAreaProvider>
  );
}
