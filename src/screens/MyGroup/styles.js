import {StyleSheet} from 'react-native';
import { colors } from '../../utills/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10
  },
  item: {
    backgroundColor: colors.bgColorInput,
    padding: 10,
    marginTop: 8,
    flexDirection: 'row',
    width: '100%'
  },
  title: {
    fontSize: 10,
    fontWeight: '600'
  },
  description: {
    fontSize: 9,
    fontWeight: '400',
    marginTop: 2
  },
  avatar: {
    height: 70,
    width: 70
  },
  titleBox: {
    flexDirection: 'row',
    marginLeft: 10,
    justifyContent: 'space-between',
    width: '60%',
    backgroundColor: 'pink',
  },
  likeIcon: {
    height: 20,
    width: 20,
  },
  descBox: {
    marginLeft: 4,
    justifyContent: 'space-between',
    marginRight: 90,
  },
  price: {
    color : colors.red,
    fontSize: 10,
  },
  listStyle: {
    marginTop: 16.
  }
});
