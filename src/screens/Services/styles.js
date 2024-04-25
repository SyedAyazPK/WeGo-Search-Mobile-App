import {StyleSheet} from 'react-native';
import {colors} from '../../utills/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
  },
  featurePic: {
    height: 160,
    width: 120,
  },
  item: {
    marginHorizontal: 8,
    marginVertical: 8,
    backgroundColor: 'white',
    padding: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
    borderRadius: 12,
  },
  crossPic: {
    height: 20,
    width: 20,
    tintColor: colors.red,
  },
  crossBtn: {
    position: 'absolute',
    top: -6,
    right: -4,
  },
  pickerAndroid: {
    width: '84%',
    backgroundColor: 'white',
    // alignSelf: 'center',
    borderRadius: 8,
    height: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
  },

  pickerIOS: {
    width: '84%',
    // backgroundColor: 'white',
    // alignSelf: 'center',
    borderRadius: 8,
    // height: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
  },
  addImg: {
    height: 20,
    width: 20,
  },
  addBtn: {
    height: 50,
    width: 50,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
    borderRadius: 8,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    width: 90,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 12,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonOpen: {
    backgroundColor: "white",
  },
  buttonClose: {
    backgroundColor: colors.black,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: colors.black,
    fontSize: 12,
    fontWeight: '500'
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 22,
  },
});
