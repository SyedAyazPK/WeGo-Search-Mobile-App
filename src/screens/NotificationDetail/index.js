import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import { colors } from "../../utills/colors";
import { styles } from "./styles";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header";
import Input from "../../components/Input";
import { MessageInfo } from "../../utills/showAlerts";
import {io} from 'socket.io-client';
import { apiUrl } from "../../utills/config";
import { generateUIDforList } from "../../utills/helper";
import {
  BID_SOCKET,
} from "../../redux/constants";

const windowWidth = Dimensions.get("window").width;
const NotificationDetail = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const [likeIconToggle, setLikeIconToggle] = useState(false);
  const { historyFromFriend } = useSelector(({ searches }) => searches);
  const {socket} = useSelector(({authentication}) => authentication);
  const {user, token} = useSelector(({auth}) => auth);
  const [title, setTitle] = useState(route?.params?.service);
  const [price, setPrice] = useState(false);
  const [message, setMessage] = useState(false);

  useEffect(() => {
    // var bid = io(apiUrl, {headers: {token: token}});

    if (route?.params?.openFrom == "fcm") {
      var socket = io(apiUrl, {
        extraHeaders: {
          token: token,
        },
      });
      dispatch({ type: BID_SOCKET, data: socket });
      console.log("\n\n bidbid ss : ", socket);
    }
  }, []);

  const sendBid = () => {
    if(!title){
      MessageInfo("Please Enter Title")
      return;
    }
    if(!price){
      MessageInfo("Please Enter Price")
      return;
    } if(!message){
      MessageInfo("Please Type Message")
      return;
    }

    socket?.emit(
      'bid',
      {
        id : generateUIDforList(),
        _id : user?._id,
        name: user?.name,
        title : title,
        message: message,
        price: price,
        clientId: route?.params?.clientId,
        image: route?.params?.profileImage,
        bid: true,
      }
    );

    setTitle("")
    setMessage("")
    setPrice("")
    navigation.goBack()

  }


  return (
    <View style={{ flex: 1 }}>
      {Platform.OS === "ios" && <View style={{ marginTop: 50 }}></View>}
      <Header goback={() => navigation.goBack()} title={"Notification"} />
      <Image
        style={styles.avatar}
        source={route?.params?.profileImage
          ? { uri: route?.params?.profileImage }
          : require("../../assets/user_placeholder.jpeg")}
      />

      <ScrollView style={styles.bottomSheet}>
        <Text style={styles.userNameStyle}>{route?.params?.sender}</Text>
        <>
          <Text style={styles.inputTitle}>Required:</Text>
          <Input
            text={route?.params?.service}
            onChangeText={(text) => setTitle(text)}
            placeHolder={"AC SPLIT UNIT MITSUDISHI MODEL "}
            disable={false}
          />

          <Text style={styles.inputTitle}>Add Your Price::</Text>
          <Input
            text={price}
            onChangeText={(text) => setPrice(text)}
            placeHolder={"Enter Your Amount"}
            keyboardType={"numeric"}
          />

          <Text style={styles.inputTitle}>Sent Your Message::</Text>
          <Input
            text={message}
            onChangeText={(text) => setMessage(text)}
            placeHolder={"Enter Text Messge"}
            multiline={true}
          />

          <TouchableOpacity onPress={()=> sendBid()}
            style={{
              backgroundColor: colors.black,
              width: 120,
              height: 44,
              alignSelf: "center",
              marginVertical: 20,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 40,
            }}
          >
            <Text style={{ color: "white", fontSize: 12, fontWeight: "600" }}>
              Send
            </Text>
          </TouchableOpacity>
        </>

        {/* <Text style={[styles.inputTitle, {marginTop: 20}]}>Description:</Text>
        <Text style={styles.description}>lorem ipsum lorem ipsim lorem ipsum lorem ipsim lorem ipsum lorem ipsim lorem ipsum lorem ipsim lorem ipsum lor em ipsim</Text> */}
      </ScrollView>
    </View>
  );
};

export default NotificationDetail;
