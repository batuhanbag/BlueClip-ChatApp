import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Send2 } from 'iconsax-react-native';
import { colors, spacing } from '../../../theme';

interface Props {
  inputText: string;
  handleSend: (msg: string) => void;
}

export const SendButton: React.FC<Props> = ({ handleSend, inputText }) => {
  return (
    <TouchableOpacity
      style={classes.sendButton}
      onPress={() => handleSend(inputText)}
      disabled={!inputText}
    >
      <Send2
        color={
          !inputText ? colors.palette.primary200 : colors.palette.primary500
        }
      />
    </TouchableOpacity>
  );
};

const classes = StyleSheet.create({
  sendButton: {
    right: spacing.md
  }
});
