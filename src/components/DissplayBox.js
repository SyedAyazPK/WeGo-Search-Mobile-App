import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  Dimensions
} from 'react-native';
import {colors} from '../utills/colors';

const windowWidth = Dimensions.get('window').width;
const DisplayBox = ({userQuantity, status}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.noOfUser}>{userQuantity}</Text>
      <Text style={styles.statusStyle}>{status}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: windowWidth * 0.28,
    height: windowWidth * 0.28,
    borderRadius: 8,
    marginHorizontal: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.bgColorInput,
  },
  noOfUser: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.black
  },
  statusStyle: {
    color : colors.black,
    fontSize: 12,
    fontWeight: '700'
  }
});

export default DisplayBox;