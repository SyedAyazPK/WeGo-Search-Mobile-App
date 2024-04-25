import React, { useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import { colors } from "../utills/colors";

const windowWidth = Dimensions.get("window").width;
const BidCard = ({ onPress, title, message, price, profileImag, deleteBid, img }) => {
//   useEffect(() => {
//     setTimeout(() => {
//         deleteBid()
//       console.log("\n\n\n Delete componrnet")
//     }, 30000);
//   }, []);
  return (
    <View>
      <View style={styles.item}>
        <Image
          style={styles.avatar}
          source={img
            ? { uri: img }
            :require("../assets/user_placeholder.jpeg")}
        />
        <View style={styles.descBox}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{message}</Text>
          <Text style={styles.price}>${price}</Text>
        </View>

        <TouchableOpacity
          style={{ position: "absolute", right: 8, bottom: 8 }}
          onPress={onPress}
        >
          <Image
            style={[styles.likeIcon, { tintColor: "white" }]}
            source={require("../assets/chat.png")}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: colors.bgColorInput,
    padding: 10,
    marginTop: 8,
    flexDirection: "row",
    width: "100%",
  },
  avatar: {
    height: 70,
    width: 70,
  },
  descBox: {
    marginLeft: 4,
    justifyContent: "space-between",
    marginRight: 90,
  },
  title: {
    fontSize: 10,
    fontWeight: "600",
  },
  description: {
    fontSize: 9,
    fontWeight: "400",
    marginTop: 2,
  },
  price: {
    color: colors.red,
    fontSize: 10,
  },
  likeIcon: {
    height: 20,
    width: 20,
  },
});

export default BidCard;
