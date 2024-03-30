import React, { forwardRef, useRef } from 'react';
import {
  StyleProp,
  TextInput,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle
} from 'react-native';
import { colors, spacing, typography } from '../theme';
import { Text, TextProps } from './Text';
import { moderateScale } from '../theme/window-size';
import { InfoCircle } from 'iconsax-react-native';

//@NOTE(BlueClip): I prepared components as generic but I didn't add presets for now.

export interface TextFieldAccessoryProps {
  style: StyleProp<any>;
  status: TextFieldProps['status'];
  multiline: boolean;
  editable: boolean;
}

export interface TextFieldProps extends Omit<TextInputProps, 'ref'> {
  status?: 'error' | 'disabled';
  label?: TextProps['text'];
  placeholder?: TextProps['text'];
  helper?: TextProps['text'];
  style?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  inputWrapperStyle?: StyleProp<ViewStyle>;
  RightAccessory?: React.FC<TextFieldAccessoryProps>;
}

export const TextField = forwardRef(function TextField(props: TextFieldProps) {
  const {
    label,
    placeholder,
    status,
    value,
    helper,
    style: $inputStyleOverride,
    containerStyle: $containerStyleOverride,
    inputWrapperStyle: $inputWrapperStyleOverride,
    RightAccessory,
    ...TextInputProps
  } = props;
  const input = useRef<TextInput>();

  const disabled = TextInputProps.editable === false || status === 'disabled';

  const $containerStyles = [$containerStyleOverride];

  const $inputWrapperStyles = [
    $inputWrapperStyle,
    status === 'error' && { borderColor: colors.error },
    TextInputProps.multiline && { minHeight: 112 },
    $inputWrapperStyleOverride,
    value && status !== 'error' && { borderColor: colors.palette.primary500 }
  ];

  const $inputStyles = [
    $inputStyle,
    disabled && { color: colors.palette.neutral200 },
    TextInputProps.multiline && { height: 'auto' },
    $inputStyleOverride
  ];

  const $helperStyles: StyleProp<TextStyle>[] = [
    { marginLeft: moderateScale(4), bottom: 1 },
    status === 'error' && { color: colors.error }
  ];

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={$containerStyles}
      accessibilityState={{ disabled }}
    >
      {!!label && <Text text={label} style={$labelStyle} />}

      <View style={$inputWrapperStyles as StyleProp<ViewStyle>}>
        <TextInput
          //@ts-ignore
          ref={input.current as LegacyRef<TextInput>}
          autoCapitalize='none'
          textAlignVertical='top'
          placeholder={placeholder}
          placeholderTextColor={colors.palette.neutral400}
          {...TextInputProps}
          value={value}
          editable={!disabled}
          style={$inputStyles as StyleProp<TextStyle>}
        />
        {!!RightAccessory && (
          <RightAccessory
            style={$rightAccessoryStyle}
            status={status}
            editable={!disabled}
            multiline={false}
          />
        )}
      </View>

      {!!helper && (
        <View style={$helperContainer}>
          <InfoCircle size={12} color={colors.error} />
          <Text text={helper} style={$helperStyles} />
        </View>
      )}
    </TouchableOpacity>
  );
});

const $labelStyle: TextStyle = {
  marginBottom: spacing.xs
};

const $helperContainer: ViewStyle = {
  marginTop: spacing.xs,
  flexDirection: 'row',
  alignItems: 'center'
};

const $inputWrapperStyle: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  borderWidth: 1,
  borderRadius: 8,
  backgroundColor: colors.palette.neutral200,
  borderColor: '#BFBFBF',
  overflow: 'hidden',
  height: 48
};

const $inputStyle: TextStyle = {
  flex: 1,
  alignSelf: 'center',
  fontFamily: typography.primary.normal,
  color: colors.text,
  fontSize: 16,
  height: 24,
  paddingVertical: 0,
  paddingHorizontal: 0,
  marginVertical: spacing.xxs,
  marginHorizontal: spacing.sm
};

const $rightAccessoryStyle: ViewStyle = {
  marginEnd: spacing.xs,
  height: 40,
  justifyContent: 'center',
  alignItems: 'center'
};
