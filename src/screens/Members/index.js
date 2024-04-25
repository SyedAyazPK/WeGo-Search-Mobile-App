import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  Platform,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { styles } from "./styles";
import { colors } from "../../utills/colors";
import Header from "../../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { getAllFriendsAction } from "../../redux/actions/chat";

const Members = ({ navigation }) => {
  const dispatch = useDispatch();
  const { user, token } = useSelector(({ auth }) => auth);
  const { allFriend } = useSelector(({ chat }) => chat);

  useEffect(() => {
    dispatch(getAllFriendsAction(token, user._id));
  }, []);

  const Item = ({ item }) => (
    <>
      {user.role == item.role ? null : (
        <TouchableOpacity
          onPress={() => navigation.navigate("ChatScreen", { item: item })}
          style={styles.item}
        >
          <TouchableOpacity style={{ position: "absolute", right: 8, top: 8 }}>
            <Text style={styles.description}>02:30 Pm</Text>
          </TouchableOpacity>
          <Image
            style={styles.avatar}
            source={item.profileImage
              ? { uri: item.profileImage }
              : require("../../assets/user_placeholder.jpeg")}
          />
          <View style={styles.descBox}>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.description}>
              {item.lastMessage || "Start Conversation... \n"}
            </Text>
          </View>
        </TouchableOpacity>
      )}
    </>
  );

  return (
    <View style={styles.container}>
      {Platform.OS === "ios" && <View style={{ marginTop: 50 }}></View>}
      <Header goback={() => navigation.goBack()} title={"Chat"} />

      <FlatList
        data={allFriend}
        renderItem={({ item }) => <Item item={item} />}
        keyExtractor={(item) => item.id}
        style={styles.listStyle}
      />
    </View>
  );
};

export default Members;
