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
import PieChart from 'react-native-pie-chart';

const windowWidth = Dimensions.get('window').width;
const ProfilePieChart = ({top, bottom, widthAndHeight, series, sliceColor}) => {
  return (
    <View
      style={[
        styles.container,
        {marginTop: top || 0, marginBottom: bottom || 0},
      ]}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          paddingLeft: 8,
        }}>
        <PieChart
          widthAndHeight={windowWidth * 0.45}
          series={series[0] + series[1] == 0 ? [1, 1] : series}
          sliceColor={sliceColor}
          doughnut={false}
          coverRadius={0.45}
          coverFill={'#FFF'}
        />
        <View>
          <View style={styles.likeInnerBox}>
            <View
              style={[styles.likeBox, {backgroundColor: colors.like}]}></View>
            <Text style={styles.likeTxt}>Likes</Text>
          </View>
          <View style={styles.likeInnerBox}>
            <View
              style={[styles.likeBox, {backgroundColor: colors.search}]}></View>
            <Text style={styles.likeTxt}>Searches</Text>
          </View>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          width: '100%',
          paddingHorizontal: 20,
          marginTop: 12,
        }}>
        <View style={[styles.likeInnerBox, {flexDirection: 'column'}]}>
          <Text style={styles.bottomTxt}>{series[0]}</Text>
          <View style={[styles.likeBox, {backgroundColor: colors.like}]}></View>
        </View>
        {/* <View style={[styles.likeInnerBox, {flexDirection: 'column'}]}>
          <Text style={styles.bottomTxt}>1.2k</Text>
          <View
            style={[styles.likeBox, {backgroundColor: colors.review}]}></View>
        </View> */}
        <View style={[styles.likeInnerBox, {flexDirection: 'column'}]}>
          <Text style={styles.bottomTxt}>{series[1]}</Text>
          <View
            style={[styles.likeBox, {backgroundColor: colors.search}]}></View>
        </View>
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
    paddingVertical: 20,
    // flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  likeBox: {
    height: 16,
    width: 45,
  },
  likeTxt: {
    fontSize: 12,
    color: colors.black,
    fontWeight: '500',
    marginLeft: 8,
  },
  bottomTxt: {
    fontSize: 16,
    color: colors.black,
    fontWeight: '500',
    // marginLeft: 8,
  },
  likeInnerBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
});

export default ProfilePieChart;
