import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
} from 'react-native';
import {colors} from '../utills/colors';

const windowWidth = Dimensions.get('window').width;
const ProfileBio = ({src, top, bottom, onPress, firstName, lastName, email}) => {
  return (
    <View
      style={[
        styles.container,
        {marginTop: top || 0, marginBottom: bottom || 0},
      ]}>
      <View style={styles.subContainer}>
        <Text style={styles.bioText}>First Name</Text>
        <Text style={styles.bioText}>{firstName}</Text>
      </View>
      <View style={styles.subContainer}>
        <Text style={styles.bioText}>Last Name</Text>
        <Text style={styles.bioText}>{lastName}</Text>
      </View>
      <View style={styles.subContainer}>
        <Text style={styles.bioText}>Email</Text>
        <Text style={styles.bioText}>{email}</Text>
      </View>
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
    width: '100%',
    backgroundColor: 'white',
    paddingHorizontal: 12,
    paddingBottom: 20
  },
  subContainer: {
    flexDirection: 'row',
    paddingBottom: 8,
    borderBottomColor: colors.bioBorder,
    borderBottomWidth: 1,
    justifyContent: 'space-between',
    marginTop: 20,
  },
  bioText: {
    color: colors.black,
    fontSize: 12,
    fontWeight: '600'
  }
});

export default ProfileBio;
