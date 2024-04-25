import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { colors } from "../../utills/colors";
import { styles } from "./styles";
import { useDispatch, useSelector } from "react-redux";
import * as Progress from "react-native-progress";
import { useFocusEffect } from "@react-navigation/native";
import { searchInYourFriends } from "../../redux/actions/searches";
import { bidFormater } from "../../utills/helper";
import BidCard from "../../components/BidCard";
import { CURRENT_SCREEN } from "../../redux/constants";

const windowWidth = Dimensions.get("window").width;
const MyGroup = ({ navigation }) => {
  const dispatch = useDispatch();
  const [likeIconToggle, setLikeIconToggle] = useState(false);
  const [bidData, setBidData] = useState(historyFromFriend || []);
  const { historyFromFriend } = useSelector(({ searches }) => searches);
  const { token, user } = useSelector(
    ({ auth }) => auth
  );
  const { socket } = useSelector(
    ({ authentication }) => authentication
  );

  useEffect(() => {
    setBidData(historyFromFriend);
  }, []);

  useEffect(() => {
    socketAssign();
  }, []);

  const socketAssign = async () => {
    if (socket) {
      await socket.on("newBid", (bid) => {
        setBidData((bidData) => [...bidData, bid]);
      });
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      dispatch({
        type: CURRENT_SCREEN,
        data: "MyGroup",
      });
      dispatch(
        searchInYourFriends(token, user._id, "", (result) => {
          setBidData(result);
        })
      );
    }, [])
  );

  const deleteBid = (item) => {
    var deletBid = bidData
    indexOdj = deletBid.findIndex(object => {
      return object._id === item._id;
    });
    deletBid.splice(indexOdj, 1);
    setBidData([...deletBid])

  };

  const Item = ({ item, index }) => (
    <>
      {item.bid ? (
        <BidCard
          onPress={() => navigation.navigate("ChatScreen", { item: item })}
          title={item.title}
          message={item.message}
          price={item.price}
          img={item.image}
          deleteBid={() => deleteBid(item)}
        />
      ) : (
        <View>
          <View style={styles.item}>
            {!item.bid && (
              <TouchableOpacity
                style={{ position: "absolute", right: 8, top: 8 }}
                onPress={() => setLikeIconToggle(!likeIconToggle)}
              >
                <Image
                  style={[
                    styles.likeIcon,
                    { tintColor: likeIconToggle ? colors.red : colors.black },
                  ]}
                  source={require("../../assets/heart.png")}
                />
              </TouchableOpacity>
            )}
            <Image
              style={styles.avatar}
              source={item.profileImage
                ? { uri: item.profileImage }
                : require("../../assets/user_placeholder.jpeg")}
            />
            <View style={styles.descBox}>
              <Text style={styles.title}>{item?.name || item.title}</Text>
              <Text style={styles.description}>{item.message || ""}</Text>
              <Text style={styles.price}>
                {item.price ? "$" + item.price : ""}
              </Text>
            </View>

            <TouchableOpacity
              style={{ position: "absolute", right: 8, bottom: 8 }}
              onPress={() => navigation.navigate("ChatScreen", { item: item })}
            >
              <Image
                style={[styles.likeIcon, { tintColor: "white" }]}
                source={require("../../assets/chat.png")}
              />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={bidFormater(bidData)}
        renderItem={({ item, index }) => <Item item={item} index={index} />}
        keyExtractor={(item) => item._id}
        style={styles.listStyle}
      />
    </View>
  );
};

export default MyGroup;