import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {colors} from '../utills/colors';

const ProfileHeading = ({text, top, bottom}) => {
  return (
    <Text
      style={[
        styles.headingTxt,
        {marginTop: top || 0, marginBottom: bottom || 0},
      ]}>
      {text}
    </Text>
  );
};

const styles = StyleSheet.create({
  headingTxt: {
    color: colors.black,
    fontSize: 14,
    fontWeight: '600'
  },
});

export default ProfileHeading;
