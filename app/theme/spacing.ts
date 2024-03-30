import { Dimensions } from 'react-native';
import { isSmallDevice, isSmallestDevice } from './window-size';

export const spacing = {
  xxxs: 2,
  xxs: 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64
} as const;

export type Spacing = keyof typeof spacing;

export const { height, width } = Dimensions.get('window');
export const isGeneralSmall = isSmallDevice() || isSmallestDevice();
export const isSmallest = isSmallestDevice();
export const isSmall = isSmallDevice();
export const radius = 16;
