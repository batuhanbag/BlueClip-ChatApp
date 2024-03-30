const palette = {
  neutral100: '#FFFFFF',
  neutral200: '#FCFCFC',
  neutral300: '#E5E5EA',
  neutral400: '#B6ACA6',
  neutral500: '#978F8A',
  neutral600: '#564E4A',
  neutral700: '#3C3836',
  neutral800: '#1E1E1E',
  neutral900: '#000000',
  primary100: '#EAF6E4',
  primary200: '#DCF8C6',
  primary300: '#3AAB6D',
  primary400: '#3AAB6D',
  primary500: '#29784C',
  primary600: '#205F3D',
  error100: '#F2D6CD',
  error500: '#F43131'
} as const;

export const colors = {
  palette,
  transparent: 'rgba(0, 0, 0, 0)',
  text: palette.neutral800,

  background: palette.neutral100,
  border: palette.neutral400,
  tint: palette.primary500,
  error: palette.error500
};
