import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer
} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps
} from '@react-navigation/native-stack';
import React from 'react';
import { useColorScheme } from 'react-native';
import { navigationRef, useBackButtonHandler } from './navigationUtilities';
import { RouteNames } from './RouteNames';
import { AuthStack } from './stacks/AuthStack';
import Config from '../config';
import { ChatStack } from './stacks/ChatStack';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';

export type AppStackParamList = {
  AuthStack: undefined;
  ChatStack: undefined;
};

const exitRoutes = Config.exitRoutes;

export type AppStackScreenProps<
  T extends keyof AppStackParamList
> = NativeStackScreenProps<AppStackParamList, T>;

const Stack = createNativeStackNavigator<AppStackParamList>();
const AuthContext = React.createContext<any>({});

const AuthContextProvider: React.FC<{ children: any }> = ({ children }) => {
  const [authUser, setAuthUser] = React.useState();
  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};

const AppStack = function AppStack() {
  const [pending, setPending] = React.useState<boolean>(true);
  const { authUser, setAuthUser } = React.useContext(AuthContext);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async user => {
      setAuthUser(user);
      if (pending) {
        setPending(false);
      }
    });

    return () => unsubscribe();
  }, [authUser]);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
      initialRouteName={
        !!authUser ? RouteNames.ChatStack : RouteNames.AuthStack
      }
    >
      {!!authUser ? (
        <Stack.Screen name={RouteNames.ChatStack} component={ChatStack} />
      ) : (
        <Stack.Screen name={RouteNames.AuthStack} component={AuthStack} />
      )}
    </Stack.Navigator>
  );
};

export interface NavigationProps
  extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = function AppNavigator(props: NavigationProps) {
  const colorScheme = useColorScheme();
  useBackButtonHandler(routeName =>
    exitRoutes.includes(routeName as RouteNames)
  );

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
      {...props}
    >
      <AuthContextProvider>
        <AppStack />
      </AuthContextProvider>
    </NavigationContainer>
  );
};
