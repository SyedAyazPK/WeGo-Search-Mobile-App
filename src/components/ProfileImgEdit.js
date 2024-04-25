import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {colors} from '../utills/colors';

const windowWidth = Dimensions.get('window').width;
const ProfileImageEdit = ({src, top, bottom, onPress, profileImg}) => {
  return (
    <View
      style={[
        styles.container,
        {marginTop: top || 0, marginBottom: bottom || 0},
      ]}>
      <Image
        style={styles.profilePic}
        source={
          profileImg
            ? {uri: profileImg}
            : require('../assets/user_placeholder.jpeg')
        }
      />
      <TouchableOpacity onPress={onPress} style={styles.editBtn}>
        <Image style={styles.editPic} source={require('../assets/edit.png')} />
      </TouchableOpacity>
    </View>
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
  },
  profilePic: {
    height: windowWidth * 0.6,
    width: windowWidth * 0.92,
    borderRadius: 20,
    alignSelf: 'center',
  },
  editBtn: {
    height: 24,
    width: 24,
    position: 'absolute',
    top: 20,
    right: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 4,
  },
  editPic: {
    height: 12,
    width: 16,
  },
});

export default ProfileImageEdit;
