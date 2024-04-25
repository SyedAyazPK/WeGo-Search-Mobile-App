import { StyleSheet } from "react-native";
import { colors } from "../../utills/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  item: {
    marginHorizontal: 8,
    marginVertical: 8,
    backgroundColor: "white",
    padding: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
    borderRadius: 12,
  },
  micIcon: {
    height: 24,
    width: 24,
    marginRight: 8,
  },
  dropSearchBar: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: colors.bgColorInput,
    backgroundColor: "white",
    borderRadius: 60,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    maxHeight: 100,
  },
  btnSearch: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 4,
    minWidth: 96,
    borderRadius: 12,
    marginTop: '2.5%',
    padding: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,

    alignSelf: 'baseline'
  },
  afterSearchTxt: {
    textAlign:'center',
    color: colors.red,
    fontSize: 12
  }
});
