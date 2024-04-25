import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions
} from 'react-native';
import {colors} from '../utills/colors';

const windowWidth = Dimensions.get('window').width;
const IconButton = ({icon, onPress}) => {
  return (
    <TouchableOpacity onPress= {onPress}style={styles.container}>
      <Image style={styles.iconStyle} source={icon} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: windowWidth * 0.12,
    height: windowWidth * 0.12,
    borderRadius: 40,
    marginHorizontal: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.bgColorInput,
  },
  iconStyle: {
    height: 26,
    width: 26,
  }
});

export default IconButton;
