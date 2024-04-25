import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../../utills/colors";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingHorizontal: 10
  },
  avatar: {
    width: windowWidth,
    height: windowHeight / 2,
  },
  bottomSheet: {
    backgroundColor: "white",
    height: windowHeight / 2,
    width: windowWidth,
    borderTopStartRadius: 40,
    borderTopEndRadius: 40,
    position: "absolute",
    bottom: 0,
    paddingHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  userNameStyle: {
    color: colors.black,
    fontSize: 16,
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 10,
    fontWeight: 'bold',
    textDecorationLine: 'underline', 
    textDecorationStyle: 'solid'
  },
  inputTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.black,
    marginTop: 12,
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    fontWeight: '400'
  }
});
