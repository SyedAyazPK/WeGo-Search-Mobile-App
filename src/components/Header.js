import React from "react";
import { TouchableOpacity, Text, StyleSheet, Image, View } from "react-native";
import { colors } from "../utills/colors";
import { unReadNotification } from "../utills/helper";
import { getAllNotification } from "../redux/actions/Notification";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";

const Header = ({
  name,
  title,
  image,
  likes,
  goToNotification,
  addUser,
  onPress,
  goback,
  goToChatMember,
  navigateToProfile,
  token,
  logout,
  profileImg,
}) => {
  const dispatch = useDispatch()
  const { allNotification } = useSelector(({ notification }) => notification);
  const { user } = useSelector(
    ({ auth }) => auth
  );
  useFocusEffect(
    React.useCallback(() => {
      if(token)
      dispatch(getAllNotification(token, user?._id));
    }, [])
  );
  return (
    <View style={styles.container}>
      {name ? (
        <TouchableOpacity
          onPress={navigateToProfile}
          style={styles.nameContainer}
        >
          <Image
            style={styles.avatar}
            source={
              profileImg
                ? { uri: profileImg }
                : require("../assets/user_placeholder.jpeg")
            }
          />
          <View style={{ marginLeft: 4 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={styles.nameStyle}>Hello {name}</Text>
              <View style={styles.badge}>
                <Image
                  style={styles.done}
                  source={require("../assets/tick.png")}
                />
              </View>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                style={styles.heartIcon}
                source={require("../assets/heart.png")}
              />
              <Text style={styles.nameStyle}>{likes}K</Text>
            </View>
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={goback}>
          <Image
            style={styles.heartIcon}
            source={require("../assets/back.png")}
          />
        </TouchableOpacity>
      )}

      {title && <Text style={styles.titleStyle}>{title}</Text>}

      <View style={{ flexDirection: "row" }}>
        {goToChatMember && (
          <TouchableOpacity onPress={goToChatMember}>
            <View style={styles.notificationBlock}>
              <Image
                style={styles.heartIcon}
                source={require("../assets/chat.png")}
              />
            </View>
          </TouchableOpacity>
        )}
        {goToNotification && (
          <TouchableOpacity
            onPress={goToNotification}
            style={{ marginLeft: 8 }}
          >
            <View style={styles.notificationBlock}>
              <Image
                style={styles.heartIcon}
                source={require("../assets/notification.png")}
              />
              <View
                style={{ position: "absolute", top: -2, right: 1, fontSize: 9, backgroundColor: colors.red, paddingVertical: 2, paddingHorizontal: 4, borderRadius: 50 }}
              >
                <Text
                  style={{
                    fontWeight: "700",
                    color: "white",
                    fontSize: 7
                  }}
                >
                  {unReadNotification(allNotification)}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}

        {onPress && (
          <>
            {token ? (
              <TouchableOpacity onPress={logout} style={styles.userBlock}>
                <Image
                  style={styles.addIcon}
                  source={require("../assets/logout.png")}
                />
                <Text
                  style={{ color: "white", fontSize: 7, fontWeight: "600" }}
                >
                  Log Out
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={onPress} style={styles.userBlock}>
                <Image
                  style={styles.addIcon}
                  source={require("../assets/plus.png")}
                />
                <Text style={{ color: "white" }}>User</Text>
              </TouchableOpacity>
            )}
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 12,
    justifyContent: "space-between",
    alignItems: "center",
  },
  avatar: {
    height: 40,
    width: 40,
    borderRadius: 100,
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  nameStyle: {
    color: colors.black,
    fontSize: 12,
    fontWeight: "bold",
  },
  badge: {
    backgroundColor: colors.tagColor,
    height: 10,
    width: 10,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 2,
  },
  done: {
    height: 6,
    width: 6,
    tintColor: "white",
  },
  heartIcon: {
    height: 14,
    width: 14,
  },
  addIcon: {
    tintColor: "white",
    marginRight: 2,
    height: 11,
    width: 11,
    marginRight: 4,
  },
  notificationBlock: {
    height: 30,
    width: 30,
    borderRadius: 50,
    borderColor: colors.black,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  userBlock: {
    height: 30,
    width: 70,
    borderRadius: 20,
    backgroundColor: colors.black,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginLeft: 8,
  },
  titleStyle: {
    fontSize: 12,
    fontWeight: "600",
  },
});

export default Header;
