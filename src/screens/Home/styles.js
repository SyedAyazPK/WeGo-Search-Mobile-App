import {StyleSheet, Dimensions} from 'react-native';
import { colors } from '../../utills/colors';

const windowWidth = Dimensions.get('window').width;
export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBarArange: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 12,
    justifyContent: 'space-between'
  },
  searchBarWidth: {
    width: windowWidth * 0.53
  },
  addImgBlock: {
    height: 110,
    borderRadius: 8,
    marginTop: 28,
    width: '94%',
    alignSelf: 'center',
    backgroundColor: colors.bgColorInput,
    marginHorizontal: 10,
    justifyContent: "center",
    alignItems: 'center',
  },
  selectImgicon: {
    height: 48,
    width: 40,
  },
  txtStyle: {
    color: colors.black,
    fontSize: 12,
    fontWeight: 'bold',
  },
  displayArangement: {
    marginTop: 45,
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingVertical: 30,
    paddingHorizontal: 12,
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
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '700'
  },
  modalBtnBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  btnLoginn: {
    backgroundColor: colors.black,
    height: 48,
    width: windowWidth * 0.4,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  txtLogin:{
    color: "white"
  },
  txtForgetPass: {
    color: colors.black,
    fontSize: 10,
    fontWeight: '600'
  },
  forgetPassBox: {
    alignSelf: 'flex-end',
    marginTop: 8,
  },
  txtSignUp:{
    color: colors.bgColorInput,
    fontSize: 10,
    fontWeight: '600',
    marginTop: 4,
    alignSelf: 'center'
  },
  imgPickerStyle: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});
