import React, { useState, useCallback, useEffect, useRef } from "react";
import { View, Platform } from "react-native";
import { styles } from "./styles";
import { colors } from "../../utills/colors";
import Header from "../../components/Header";
import {
  GiftedChat,
  InputToolbar,
  Send,
  Bubble,
} from "react-native-gifted-chat";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { sendMessageAction, getMessageAction } from "../../redux/actions/chat";
import { messageFormater } from "../../utills/helper";

const ChatScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { user, token } = useSelector(
    ({ auth }) => auth
  );
  const { socket } = useSelector(
    ({ authentication }) => authentication
  );
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (socket) {
      socket.emit(
        "joinRoom",
        user?.role == "vendor" ? user?._id : route?.params?.item?._id
      );
    }
  }, []);

  useEffect(() => {
    var data = {
      to: route?.params?.item?._id,
      from: user?._id,
    };
    dispatch(
      getMessageAction(token, data, (res) => {
        console.log("===> chat ", res)
        setMessages(messageFormater(res, user?.id, route?.params?.item?._id));
      })
    );
  }, []);

  const onSend = useCallback((messages = []) => {
    if (socket) {
      socket.emit("send-msg", {
        to: route?.params?.item?._id,
        from: user._id,
        senderName: user?.name,
        msg: messages,
      });
    }
    var data = {
      to: route?.params?.item?._id,
      from: user?._id,
      message: messages[0]?.text,
    };
    dispatch(
      sendMessageAction(token, data, () => {
        setMessages((previousMessages) =>
          GiftedChat.append(previousMessages, messages)
        );
      })
    );
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("msg-recieve", (msg) => {
        var message = {
          _id: msg[0]._id,
          text: msg[0].text,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: "SocialMarketeplace",
            // avatar: 'https://placeimg.com/140/140/any',
          },
          sent: true,
          // Mark the message as received, using two tick
          received: true,
          // Mark the message as pending with a clock loader
          pending: true,
        };
        if (route?.params?.item?._id == user?._id) return;
        setMessages((previousMessages) =>
          GiftedChat.append(previousMessages, message)
        );
      });
    }
  }, []);

  const renderInputToolbar = (props) => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          backgroundColor: "#fff",
          borderColor: "#fff",
          borderRadius: 10,
          marginHorizontal: 10,
        }}
        primaryStyle={{
          width: "100%",
          flexDirection: "row",
          backgroundColor: "#fff",
          alignItems: "center",
          borderRadius: 10,
          paddingHorizontal: 4,
          borderWidth: 1,
          borderColor: "#C4C4C4",
          paddingTop: 7,
          minHeight: 50,
        }}
      />
    );
  };

  const renderSend = (props) => {
    return (
      <Send
        {...props}
        containerStyle={{
          marginTop: -5,
        }}
      />
    );
  };

  const getBubble = (props, system) => {
    return (
      <Bubble
        {...props}
        textStyle={{
          right: {
            fontStyle: "normal",
            fontSize: 12,
            color: colors.black,
          },
          left: {
            fontStyle: system ? "italic" : "normal",
            fontSize: 12,
            color: colors.black,
          },
        }}
        wrapperStyle={{
          right: {
            // Here is the color change
            backgroundColor: colors.bgColorInput,
            marginBottom: 15,
            marginEnd: system ? 8 : 0,
          },
          left: {
            backgroundColor: colors.bgColorInput,
            marginBottom: 15,
            marginStart: system ? 8 : 0,
          },
        }}
      />
    );
  };

  const renderBubble = (props) => {
    const system = props?.currentMessage?.system;
    const comment = props?.currentMessage?.comment;

    if (comment) {
      const name =
        props?.currentMessage?.user?._id == 1 ? "Your" : receipientName + "'s";
      return (
        <View>
          <Text
            style={
              props?.currentMessage?.user?._id == 1
                ? styles.txtMyComment
                : styles.txtHisComment
            }
          >
            {name} comment:
          </Text>
          {getBubble(props, system)}
        </View>
      );
    }

    return getBubble(props, system);
  };

  return (
    <View style={styles.container}>
      {Platform.OS === "ios" && <View style={{ marginTop: 50 }}></View>}
      <Header
        goback={() => navigation.goBack()}
        likes={"2.1"}
        title={route?.params?.item?.name || "Full Name"}
        notification={true}
      />

      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        renderBubble={renderBubble}
        renderSend={(props) => renderSend(props)}
        renderAvatarOnTop={true}
        user={{
          _id: 1,
          name: "React Native2",
          avatar: "https://placeimg.com/140/140/any",
        }}
        renderInputToolbar={(props) => renderInputToolbar(props)}
        alwaysShowSend={true}
      />
    </View>
  );
};
export default ChatScreen;
