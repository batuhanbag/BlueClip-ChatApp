import React from 'react';
import {
  StyleProp,
  Text as RNText,
  TextProps as RNTextProps,
  TextStyle
} from 'react-native';
import { colors, typography } from '../theme';

type Sizes = keyof typeof $sizeStyles;
type Weights = keyof typeof typography.primary;
type Presets = keyof typeof $presets;

export interface TextProps extends RNTextProps {
  color?: string;
  text?: string;
  style?: StyleProp<TextStyle>;
  weight?: Weights;
  size?: Sizes;
  children?: React.ReactNode;
  preset?: Presets;
}

export function Text(props: TextProps) {
  const {
    weight,
    size,
    text,
    children,
    color,
    style: $styleOverride,
    ...rest
  } = props;

  const content = text || children;

  const preset: Presets = ($presets[props.preset as Presets]
    ? props.preset
    : 'default') as Presets;

  const $styles = [
    $presets[preset],
    $fontWeightStyles[weight as Weights],
    $sizeStyles[size as Sizes],
    $styleOverride,
    !!color && { color }
  ];

  return (
    <RNText {...rest} style={$styles}>
      {content}
    </RNText>
  );
}

const $sizeStyles = {
  xxl: { fontSize: 36, lineHeight: 44 } as TextStyle,
  xsl: { fontSize: 32, lineHeight: 44 } as TextStyle,
  xml: { fontSize: 28, lineHeight: 40 } as TextStyle,
  xl: { fontSize: 24, lineHeight: 34 } as TextStyle,
  lg: { fontSize: 20, lineHeight: 32 } as TextStyle,
  md: { fontSize: 18, lineHeight: 26 } as TextStyle,
  sm: { fontSize: 16, lineHeight: 24 } as TextStyle,
  xs: { fontSize: 14, lineHeight: 21 } as TextStyle,
  xxs: { fontSize: 12, lineHeight: 18 } as TextStyle,
  tiny: { fontSize: 11, lineHeight: 16 } as TextStyle
};

const $fontWeightStyles = Object.entries(typography.primary).reduce(
  (acc, [weight, fontFamily]) => {
    return { ...acc, [weight]: { fontFamily } };
  },
  {}
) as Record<Weights, TextStyle>;

const $baseStyle: StyleProp<TextStyle> = [
  $sizeStyles.sm,
  $fontWeightStyles.normal,
  { color: colors.text }
];

const $presets = {
  default: $baseStyle,

  bold: [$baseStyle, $fontWeightStyles.bold] as StyleProp<TextStyle>,

  heading: [$baseStyle, $sizeStyles.xxl, $fontWeightStyles.bold] as StyleProp<
    TextStyle
  >
};
