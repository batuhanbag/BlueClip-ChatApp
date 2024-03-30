import { Platform } from 'react-native';
import {
  Inter_300Light as interLight,
  Inter_400Regular as interRegular,
  Inter_500Medium as interMedium,
  Inter_600SemiBold as interSemiBold,
  Inter_700Bold as interBold
} from '@expo-google-fonts/inter';

export const customFontsToLoad = {
  interLight,
  interRegular,
  interMedium,
  interSemiBold,
  interBold
};

const fonts = {
  inter: {
    light: 'interLight',
    normal: 'interRegular',
    medium: 'interMedium',
    semiBold: 'interSemiBold',
    bold: 'interBold'
  },
  helveticaNeue: {
    thin: 'HelveticaNeue-Thin',
    light: 'HelveticaNeue-Light',
    normal: 'Helvetica Neue',
    medium: 'HelveticaNeue-Medium'
  },
  courier: {
    normal: 'Courier'
  },
  sansSerif: {
    thin: 'sans-serif-thin',
    light: 'sans-serif-light',
    normal: 'sans-serif',
    medium: 'sans-serif-medium'
  },
  monospace: {
    normal: 'monospace'
  }
};

export const typography = {
  fonts,
  primary: fonts.inter,
  secondary: Platform.select({
    ios: fonts.helveticaNeue,
    android: fonts.sansSerif
  }),
  code: Platform.select({ ios: fonts.courier, android: fonts.monospace })
};
