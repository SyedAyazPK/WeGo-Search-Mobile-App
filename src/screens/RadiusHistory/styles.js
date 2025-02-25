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
    marginVertical: 4,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
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
  },
  deleteIcon: {
    height: 25,
    width: 22,
    tintColor: 'white',
    marginTop: 8,
  },
  deleteBtn: {
    height: 34,
    width: 30,
    backgroundColor: colors.red,
    marginLeft: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4
  }
});
