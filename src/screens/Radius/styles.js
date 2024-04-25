import {StyleSheet, Dimensions} from 'react-native';
import {colors} from '../../utills/colors';

const windowWidth = Dimensions.get('window').width;
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  item: {
    backgroundColor: colors.bgColorInput,
    marginVertical: 8,
    width: '48%',
    marginHorizontal: '1%',
  },
  title: {
    fontSize: 10,
    fontWeight: '600',
  },
  listStyle: {
    marginTop: 16,
  },
  avatar: {
    width: (windowWidth * 45) / 100,
    height: (windowWidth * 45) / 100,
  },
  likeIcon: {
    height: 24,
    width: 14,
  },
  titleActive: {
    fontSize: 10,
    fontWeight: '400',
  },
  addToGroupBtn: {
    position: 'absolute',
    top: -4,
    left: -8,
    zIndex: 1,
    height: 44,
    width: 180,
    backgroundColor: "white",
    justifyContent: 'center',
    alignItems: 'center',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,

    elevation: 14,
  },
  addToGroupTxt: {
    color: colors.black,
    fontSize: 16,
    fontWeight: '700',
  },
});
