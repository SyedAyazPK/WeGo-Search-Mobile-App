import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  Platform,
  TouchableOpacity,
  FlatList,
  SectionList,
} from "react-native";
import { styles } from "./styles";
import Header from "../../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { getAllNotification } from "../../redux/actions/Notification";
import { notificationFormater } from "../../utills/helper";
import moment from "moment";
import { io } from "socket.io-client";
import { apiUrl } from "../../utills/config";
import { ALL_NOTIFICATION } from "../../redux/constants";
import { generateUIDforList } from "../../utills/helper";

const Notifications = ({ navigation }) => {
  const dispatch = useDispatch();
  const { socket } = useSelector(
    ({ authentication }) => authentication
  );
  const { user, token } = useSelector(
    ({ auth }) => auth
  );
  const { allNotification } = useSelector(({ notification }) => notification);
  const [notificationData, setNotificationData ] = useState(allNotification || [])
  // const socket = useRef();

  useEffect(()=> {
    dispatch(getAllNotification(token, user._id, (result)=>{
      setNotificationData(result)
    }));
  }, [])

  useEffect(() => {
    socket.on("newSearch", data => {
      setNotificationData(notificationData=>[...notificationData, {
        isRead: false,
        _id: generateUIDforList(),
        from_id: data?.clientId,
        to: null,
        body: data?.searchedText,
        createdAt: new Date(),
        updatedAt: new Date(),
        service: data?.service,
        name: data?.name,
        __v: 0,
      }])
      
    });
  }, []);

  return (
    <View style={styles.container}>
      {Platform.OS === "ios" && <View style={{ marginTop: 50 }}></View>}
      <Header goback={() => navigation.goBack()} title={"Notification"} />
      <SectionList
        sections={notificationData ? notificationFormater(notificationData) : []}
        keyExtractor={(item, index) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => user?.role == "vendor" && navigation.navigate("NotificationDetail", {clientId : item?.from_id || item?.from?._id, sender: item?.from?.name || item?.name, service: item?.service || "Unknown Service", profileImage: item?.from?.profileImage})}
            style={styles.item}
          >
            <TouchableOpacity
              style={{ position: "absolute", right: 8, top: 8 }}
              onPress={() => setLikeIconToggle(!likeIconToggle)}
            >
              <Text style={styles.description}>
                {moment(item.createdAt).format("DD-MM-yyyy")}
              </Text>
              <Text style={styles.description}>
                {moment(item.createdAt).format("hh:mm a")}
              </Text>
            </TouchableOpacity>
            <Image
              style={styles.avatar}
              source={item?.from?.profileImage
                ? { uri: item?.from?.profileImage }
                : require("../../assets/user_placeholder.jpeg")}
            />
            <View style={styles.descBox}>
              <Text style={styles.title}>{item?.from?.name || item?.name}</Text>
              <Text style={styles.description}>{item?.body}</Text>
            </View>
          </TouchableOpacity>
        )}
        renderSectionHeader={({section}) => {
          if(section.data.length !== 0){
           return <Text style={styles.header}>{section.title}</Text>
          } else {
            null
          }

        }}
      />
    </View>
  );
};

export default Notifications;
