import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { colors } from '../theme';

export const Loading = () => {
  return (
    <View style={classes.container}>
      <ActivityIndicator size={'large'} color={colors.palette.primary500} />
    </View>
  );
};

const classes = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
