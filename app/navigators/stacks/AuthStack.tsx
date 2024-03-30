import { LoginScreen } from '../../screens/login';
import { RouteNames } from '../RouteNames';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export const AuthStack: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: true,
        headerShown: false
      }}
      initialRouteName={RouteNames.Login}
    >
      <Stack.Screen name={RouteNames.Login} component={LoginScreen} />
    </Stack.Navigator>
  );
};
