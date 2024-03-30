import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { moderateScale } from '../theme/window-size';
import { Text } from './Text';
import { colors } from '../theme';

interface Props {
  title: string;
}

const Header: React.FC<Props> = ({ title }) => {
  return (
    <View style={classes.container}>
      <Text size='lg' weight='bold'>
        {title}
      </Text>
    </View>
  );
};

export default Header;

const classes = StyleSheet.create({
  container: {
    height: moderateScale(50),
    width: Dimensions.get('window').width,
    backgroundColor: colors.palette.neutral100,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  }
});
