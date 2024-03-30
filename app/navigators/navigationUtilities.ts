import {
  NavigationState,
  createNavigationContainerRef
} from '@react-navigation/native';
import type { AppStackParamList, NavigationProps } from './AppNavigator';

import { useEffect, useRef } from 'react';
import { BackHandler, Platform } from 'react-native';

const isIOS = Platform.OS === 'ios';

export const navigationRef = createNavigationContainerRef<AppStackParamList>();

export function useBackButtonHandler(canExit: (routeName: string) => boolean) {
  if (isIOS) return;

  const canExitRef = useRef(canExit);

  useEffect(() => {
    canExitRef.current = canExit;
  }, [canExit]);

  useEffect(() => {
    const onBackPress = () => {
      if (!navigationRef.isReady()) {
        return false;
      }

      const routeName = getActiveRouteName(navigationRef.getRootState());

      if (canExitRef.current(routeName)) {
        BackHandler.exitApp();
        return true;
      }

      if (navigationRef.canGoBack()) {
        navigationRef.goBack();
        return true;
      }

      return false;
    };

    BackHandler.addEventListener('hardwareBackPress', onBackPress);

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', onBackPress);
  }, []);
}

export function getActiveRouteName(
  state: ReturnType<typeof navigationRef.getRootState>
): keyof AppStackParamList {
  const route = state.routes[state.index];

  if (!route.state) return route.name as keyof AppStackParamList;

  return getActiveRouteName(route.state as NavigationState<AppStackParamList>);
}

export function navigate(...args: Parameters<typeof navigationRef.navigate>) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(...args);
  }
}

export function goBack() {
  if (navigationRef.isReady() && navigationRef.canGoBack()) {
    navigationRef.goBack();
  }
}

export function resetRoot(
  state: Parameters<typeof navigationRef.resetRoot>[0] = {
    index: 0,
    routes: []
  }
) {
  if (navigationRef.isReady()) {
    navigationRef.resetRoot(state);
  }
}
