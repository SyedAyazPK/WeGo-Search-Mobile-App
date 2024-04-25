import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {colors} from '../utills/colors';

const windowWidth = Dimensions.get('window').width;
const MyServices = ({
  top,
  bottom,
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress}
      style={[
        styles.container,
        {marginTop: top || 0, marginBottom: bottom || 0},
      ]}>
      <Text style={styles.bioText}>My Services</Text>
      <Image style={styles.farwardPic} source={require('../assets/farward.png')} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
    width: '100%',
    backgroundColor: 'white',
    paddingHorizontal: 12,
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  bioText: {
    color: colors.black,
    fontSize: 12,
    fontWeight: '600'
  },
  farwardPic: {
    height: 16,
    width: 16,
  },
});

export default MyServices;
