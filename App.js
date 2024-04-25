// In App.js in a new project

import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Navigation from "./src/navigation";
import { View, Text } from "react-native";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import configureStore from "./src/redux/store/index";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
import { colors } from "./src/utills/colors";
import messaging from "@react-native-firebase/messaging";
import { useRef } from "react";
import { MessageInfo } from "./src/utills/showAlerts";

const { store, persistor } = configureStore();

const Stack = createNativeStackNavigator();

const toastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: colors.red }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 12,
        fontWeight: "600",
      }}
    />
  ),
  error: (props) => (
    <ErrorToast
      {...props}
      text1Style={{
        fontSize: 17,
      }}
      text2Style={{
        fontSize: 15,
      }}
      text2NumberOfLines={2}
    />
  ),
  SocialMarketeplace: ({ text1 }) => (
    <View
      style={{
        height: 40,
        width: "90%",
        backgroundColor: colors.tagColor,
        borderRadius: 8,
        justifyContent: "center",
      }}
    >
      <Text
        style={{ textAlign: "center", color: colors.white, fontWeight: "bold" }}
      >
        {text1}
      </Text>
    </View>
  ),
};

function App() {
  const navigationRef = useRef();

  React.useEffect(() => {
    // on click to open app, when app is closed
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          var item = {
            _id: remoteMessage.data.id,
            name: remoteMessage.data.name,
          };
          if (remoteMessage.data.notificationType == "search") {
            navigationRef.current.navigate("NotificationDetail", {clientId : remoteMessage.data.id, openFrom: 'fcm'});
          }
          if (remoteMessage.data.notificationType == "chat") {
            navigationRef.current.navigate("ChatScreen", { item: item });
          }
          if (remoteMessage.data.notificationType == "bid") {
            navigationRef.current.navigate("History");
          }
        }
      });

    // on click to open app, when app in background
    messaging().onNotificationOpenedApp((remoteMessage) => {
      var item = {
        _id: remoteMessage.data.id,
        name: remoteMessage.data.name,
      };
      if (remoteMessage.data.notificationType == "search") {
        navigationRef.current.navigate("NotificationDetail", {clientId : remoteMessage.data.id, openFrom: 'fcm'});
      }
      if (remoteMessage.data.notificationType == "chat") {
        navigationRef.current.navigate("ChatScreen", { item: item });
      }
      if (remoteMessage.data.notificationType == "bid") {
        navigationRef.current.navigate("History");
      }
      
    });

    //handle notification when app in background
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log("Message handled in the background!", remoteMessage);
    });

    //handle notification when app is open
    messaging().onMessage(async (remoteMessage) => {
      MessageInfo(remoteMessage.notification.body);
    });
  }, []);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer ref={navigationRef}>
          <Navigation />
          <>
            <Toast position="top" config={toastConfig} />
          </>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

export default App;
