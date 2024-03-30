/* eslint-disable react/react-in-jsx-scope */
import { ChatScreen } from '../../screens';
import { RouteNames } from '../RouteNames';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export const ChatStack: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true
      }}
      initialRouteName={RouteNames.Chat}
    >
      <Stack.Screen name={RouteNames.Chat} component={ChatScreen} />
    </Stack.Navigator>
  );
};
