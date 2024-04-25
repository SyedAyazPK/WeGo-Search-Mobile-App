import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Platform,
  TouchableOpacity,
  Modal,
  PermissionsAndroid,
} from "react-native";
import { styles } from "./styles";
import { launchImageLibrary } from "react-native-image-picker";
import { colors } from "../../utills/colors";
import Header from "../../components/Header";
import SearchBar from "../../components/SearchBar";
import IconButton from "../../components/IconButton";
import DisplayBox from "../../components/DissplayBox";
import Input from "../../components/Input";
import RoundButton from "../../components/RoundButton";
import { signInAction, signUpAction } from "../../redux/actions/auth";
import { useDispatch, useSelector } from "react-redux";
import { MessageInfo, MessageError } from "../../utills/showAlerts";
import Geolocation from "@react-native-community/geolocation";
import {
  USER,
  TOKEN,
  ALL_NOTIFICATION,
  BID_SOCKET,
} from "../../redux/constants";
import { io } from "socket.io-client";
import { apiUrl } from "../../utills/config";
import messaging from "@react-native-firebase/messaging";

const options = {
  maxHeight: 1024,
  maxWidth: 1024,
  mediaType: "mixed",
  videoQuality: "medium",
  durationLimit: 30,
};
var location;
var fcmToken;
const Home = ({ navigation }) => {
  const dispatch = useDispatch();
  const { user, token } = useSelector(({ auth }) => auth);

  const [modalVisible, setModalVisible] = useState(false);
  const [btnLoginTogle, setBtnLoginTogle] = useState(true);
  const [signInToggle, setSignInToggle] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [searchTxt, onChangeSearchTxt] = useState("");
  const [loginLoader, setLoginLoader] = useState(false);
  const [signUpLoader, setSignUpLoader] = useState(false);

  const addImageMedia = async (index) => {
    const result = await launchImageLibrary(options);
    console.log("==>", result);
  };

  useEffect(() => {
    // var bid = io(apiUrl, {headers: {token: token}});

    if (token) {
      var socket = io(apiUrl, {
        extraHeaders: {
          token: token,
        },
      });
      dispatch({ type: BID_SOCKET, data: socket });
      console.log("\n\n bidbid ss : ", socket);
    }
  }, [token]);

  useEffect(() => {
    getDevicesToken();
    Geolocation.getCurrentPosition((info) => {
      location = info;
    });
  }, []);

  const getDevicesToken = async () => {
    await messaging().registerDeviceForRemoteMessages();
    fcmToken = await messaging().getToken();
    console.log("\n\n\n ==> devices toke : ", fcmToken);
  };

  const loginUser = () => {
    setLoginLoader(true);
    if (!email) {
      MessageError("Please! Enter your Email");
      setLoginLoader(false);
      return;
    }
    if (!password) {
      MessageError("Please! Enter your password");
      setLoginLoader(false);
      return;
    }
    var data = {
      email: email.toLocaleLowerCase(),
      password: password,
    };
    dispatch(
      signInAction(
        data,
        fcmToken,
        () => {
          setModalVisible(false);
          setEmail("");
          setPassword("");
        },
        setLoginLoader(false)
      )
    );
  };

  const locationPermission = async () => {
    // We need to ask permission for Android only
    if (Platform.OS === "android") {
      // Calling the permission function
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "SocialMarketePlace Location Permission",
          message: "SocialMarketePlace needs access to your Location",
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        // Permission Granted
        console.log("LOCATION Permission ");
      } else {
        // Permission Denied
        console.log("LOCATION Permission Denied");
      }
    } else {
      proceed();
    }
  };

  const signUpUser = () => {
    PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    ).then((response) => {
      console.log(response);
      if (!response) {
        MessageError("Please! give location permissions ");
        locationPermission();
        return;
      }
    });
    setSignUpLoader(true);
    if (!email) {
      MessageError("Please! Enter your Email");
      setSignUpLoader(false);
      return;
    }
    if (!password) {
      MessageError("Please! Enter your password");
      setSignUpLoader(false);
      return;
    }
    if (!confirmPassword) {
      MessageError("Please! Enter your password");
      setSignUpLoader(false);
      return;
    }
    if (!name) {
      MessageError("Please! Enter your Name");
      setSignUpLoader(false);
      return;
    }
    if (password !== confirmPassword) {
      MessageError("Password Not Matched");
      setSignUpLoader(false);
      return;
    }
    var data = {
      name: name,
      email: email.toLowerCase(),
      password: password,
      role: btnLoginTogle ? "user" : "vendor",
      location: {
        type: "Point",
        coordinates: [location?.coords?.longitude, location?.coords?.latitude],
      },
    };
    dispatch(
      signUpAction(
        data,
        fcmToken,
        () => {
          setModalVisible(false);
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          setName("");
        },
        setSignUpLoader(false)
      )
    );
  };

  const handleSearch = (text) => {
    onChangeSearchTxt(text);
    if (text == "" || text == null || text == undefined) return;
    token ? navigation.navigate("History") : MessageInfo("Please Login First");
  };

  const logoutUser = () => {
    dispatch({ type: USER, data: "" });
    dispatch({ type: TOKEN, data: "" });
    dispatch({ type: ALL_NOTIFICATION, data: "" });
  };
  return (
    <View style={styles.container}>
      {Platform.OS === "ios" && <View style={{ marginTop: 50 }}></View>}
      <Header
        name={user?.name || "Full Name"}
        likes={"2.1"}
        onPress={() => setModalVisible(true)}
        logout={() => logoutUser()}
        token={token}
        profileImg={user?.profileImage}
        navigateToProfile={() =>
          token
            ? navigation.navigate("ProfileSreen")
            : MessageInfo("Please Login first")
        }
        goToNotification={() =>
          token
            ? navigation.navigate("Notifications")
            : MessageInfo("Please Login To See Your Notification")
        }
      />
      <View style={styles.searchBarArange}>
        <View style={styles.searchBarWidth}>
          <SearchBar
            placeHolder={"Search"}
            text={searchTxt}
            onChangeText={(text) => handleSearch(text)}
            onFocus={()=> navigation.navigate("History")}
          />
        </View>
        <IconButton
          icon={require("../../assets/location.png")}
          onPress={() =>
            token
              ? navigation.navigate("MapScreen")
              : MessageInfo("Please Login first")
          }
        />
        <IconButton
          icon={require("../../assets/history.png")}
          onPress={() =>
            token
              ? navigation.navigate("History")
              : MessageInfo("Please Login first")
          }
        />
        <IconButton
          icon={require("../../assets/searchHistory.png")}
          onPress={() =>
            token
              ? navigation.navigate("RadiusHistory")
              : MessageInfo("Please Login first")
          }
        />
      </View>

      {/* <View style={styles.addImgBlock}>
        <TouchableOpacity
          style={styles.imgPickerStyle}
          onPress={() => addImageMedia()}>
          <Image
            style={styles.selectImgicon}
            source={require('../../assets/img.png')}
          />
          <Text style={styles.txtStyle}>Add Picture Here</Text>
        </TouchableOpacity>
      </View> */}

      <View style={styles.displayArangement}>
        <DisplayBox userQuantity={"3.0 M"} status={"Active User"} />
        <DisplayBox userQuantity={"3.0 M"} status={"Searched"} />
        <DisplayBox userQuantity={"3.0 M"} status={"Active Pin"} />
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {signInToggle ? (
              <Text style={styles.modalText}>Login</Text>
            ) : (
              <Text style={styles.modalText}>Sign Up</Text>
            )}

            <View style={styles.modalBtnBox}>
              <TouchableOpacity
                onPress={() => setBtnLoginTogle(true)}
                style={[
                  styles.btnLoginn,
                  {
                    backgroundColor: btnLoginTogle
                      ? colors.black
                      : colors.bgColorInput,
                  },
                ]}
              >
                {signInToggle ? (
                  <Text style={styles.txtLogin}>Login As User </Text>
                ) : (
                  <Text style={styles.txtLogin}>Sign Up As User </Text>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setBtnLoginTogle(false)}
                style={[
                  styles.btnLoginn,
                  {
                    backgroundColor: btnLoginTogle
                      ? colors.bgColorInput
                      : colors.black,
                  },
                ]}
              >
                {signInToggle ? (
                  <Text style={styles.txtLogin}>Login As Vendor </Text>
                ) : (
                  <Text style={styles.txtLogin}>Sign Up As Vendor </Text>
                )}
              </TouchableOpacity>
            </View>

            {signInToggle ? (
              <>
                <Input
                  placeHolder={"Email/User Name"}
                  text={email}
                  onChangeText={(text) => setEmail(text)}
                />
                <View style={{ marginTop: 10 }}></View>
                <Input
                  placeHolder={"Password"}
                  text={password}
                  isPassword={true}
                  onChangeText={(text) => setPassword(text)}
                />
              </>
            ) : (
              <>
                <Input
                  placeHolder={"Name"}
                  text={name}
                  onChangeText={(text) => setName(text)}
                />
                <View style={{ marginTop: 10 }}></View>
                <Input
                  placeHolder={"Email"}
                  text={email}
                  onChangeText={(text) => setEmail(text)}
                />
                <View style={{ marginTop: 10 }}></View>
                <Input
                  placeHolder={"Password"}
                  text={password}
                  isPassword={true}
                  onChangeText={(text) => setPassword(text)}
                />
                <View style={{ marginTop: 10 }}></View>
                <Input
                  placeHolder={"Confirm-Password"}
                  text={confirmPassword}
                  isPassword={true}
                  onChangeText={(text) => setConfirmPassword(text)}
                />
              </>
            )}
            {signInToggle && (
              <TouchableOpacity style={styles.forgetPassBox}>
                <Text style={styles.txtForgetPass}>Forget Password? </Text>
              </TouchableOpacity>
            )}
            <View style={{ marginTop: 20 }}></View>
            {signInToggle ? (
              <RoundButton
                text={"Login"}
                onPress={() => loginUser()}
                loader={loginLoader}
              />
            ) : (
              <RoundButton
                text={"SIgn Up"}
                onPress={() => signUpUser()}
                loader={signUpLoader}
              />
            )}
            <View style={{ justifyContent: "center" }}>
              {signInToggle ? (
                <Text style={styles.txtSignUp}>
                  I Don't Have A Account
                  <TouchableOpacity
                    onPress={() => setSignInToggle(!signInToggle)}
                  >
                    <Text style={styles.txtForgetPass}> Sign Up</Text>
                  </TouchableOpacity>
                </Text>
              ) : (
                <Text style={styles.txtSignUp}>
                  I Already Have An Accounnt
                  <TouchableOpacity
                    onPress={() => setSignInToggle(!signInToggle)}
                  >
                    <Text style={styles.txtForgetPass}> Sign In</Text>
                  </TouchableOpacity>
                </Text>
              )}
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Home;
