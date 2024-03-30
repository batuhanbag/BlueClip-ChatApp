import React, { ComponentType } from 'react';
import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  PressableStateCallbackType,
  StyleProp,
  TextStyle,
  View,
  ViewStyle
} from 'react-native';
import { colors, spacing, typography } from '../theme';
import { Text, TextProps } from './Text';

//@NOTE(BlueClip): I prepared components as generic but I didn't add presets for now.

type Presets = keyof typeof $viewPresets;

export interface ButtonAccessoryProps {
  style: StyleProp<any>;
  pressableState: PressableStateCallbackType;
}

export interface ButtonProps extends PressableProps {
  loading?: boolean;
  text?: TextProps['text'];
  style?: StyleProp<ViewStyle>;
  preset?: Presets;
  children?: React.ReactNode;
}

export function Button(props: ButtonProps) {
  const {
    text,
    style: $viewStyleOverride,
    children,
    disabled,
    loading,
    ...rest
  } = props;

  const preset: Presets = ($viewPresets[props.preset as Presets]
    ? props.preset
    : 'primary') as Presets;
  function $viewStyle({ pressed }) {
    return [
      $viewPresets[preset],
      $viewStyleOverride,
      !!pressed && $pressedViewPresets[preset],
      disabled && { opacity: 0.5 }
    ];
  }
  function $textStyle({ pressed }) {
    return [
      $textPresets[preset],
      !!pressed && [$pressedTextPresets[preset]],
      disabled && { opacity: 0.5 }
    ];
  }

  return (
    <Pressable
      style={$viewStyle}
      disabled={disabled}
      accessibilityRole='button'
      {...rest}
    >
      {state => (
        <>
          {loading ? (
            <ActivityIndicator
              style={{ marginEnd: spacing.xs }}
              color={colors.palette.neutral100}
            />
          ) : (
            <Text text={text} style={$textStyle(state)}>
              {children}
            </Text>
          )}
        </>
      )}
    </Pressable>
  );
}

const $baseViewStyle: ViewStyle = {
  minHeight: 48,
  borderRadius: 8,
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'row',
  paddingVertical: spacing.sm,
  paddingHorizontal: spacing.sm,
  overflow: 'hidden'
};

const $baseTextStyle: TextStyle = {
  fontSize: 16,
  lineHeight: 24,
  fontFamily: typography.primary.medium,
  textAlign: 'center',
  flexShrink: 1,
  flexGrow: 0,
  zIndex: 2
};

const $viewPresets = {
  primary: [
    $baseViewStyle,
    { backgroundColor: colors.palette.primary500 }
  ] as StyleProp<ViewStyle>
};

const $textPresets: Record<Presets, StyleProp<TextStyle>> = {
  primary: [$baseTextStyle, { color: colors.palette.neutral100 }]
};

const $pressedViewPresets: Record<Presets, StyleProp<ViewStyle>> = {
  primary: { backgroundColor: colors.palette.primary600 }
};

const $pressedTextPresets: Record<Presets, StyleProp<TextStyle>> = {
  primary: { opacity: 0.9 }
};
