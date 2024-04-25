import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  ActivityIndicator,
} from "react-native";
import { colors } from "../utills/colors";

const RoundButton = ({ text, onPress, loader }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      {loader ? (
        <ActivityIndicator size={"small"} color="white" />
      ) : (
        <Text style={styles.txtStyle}>{text}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "90%",
    height: 50,
    borderRadius: 40,
    marginHorizontal: 4,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.black,
    alignSelf: "center",
  },
  txtStyle: {
    color: "white",
    fontSize: 14,
  },
});

export default RoundButton;
