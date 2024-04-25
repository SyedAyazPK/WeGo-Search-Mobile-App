import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Platform,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { styles } from "./styles";
import Header from "../../components/Header";
import SearchBar from "../../components/SearchBar";
import TopTab from "../../navigation/TopTab";
import { useDispatch, useSelector } from "react-redux";
import {
  searchByLongLatAction,
  searchInYourFriends,
} from "../../redux/actions/searches";
import Geolocation from "@react-native-community/geolocation";
import { io } from "socket.io-client";
import { apiUrl } from "../../utills/config";
import SearchablePicker from "../../components/SearchablePicker";
import { getServicesAction } from "../../redux/actions/Authentication";
import { colors } from "../../utills/colors";
import { MessageInfo } from "../../utills/showAlerts";
import { useRoute } from "@react-navigation/native";

var location;
// var serviceList = [];
const History = ({ navigation }) => {
  const [historyData, setHistoryData] = useState("");
  const dispatch = useDispatch();
  const [seletedService, setSelectedService] = useState("");
  const [serviceList, setServiceList] = useState("");
  const [loader, setLoader] = useState(false);
  const [loaderBidder, setLoaderBidder] = useState(false);
  const route = useRoute();
  const { token, user } = useSelector(({ auth }) => auth);
  const { currentScreen } = useSelector(({ authentication }) => authentication);

  const searchServices = () => {
    dispatch(
      searchByLongLatAction(
        token,
        seletedService,
        location?.coords?.latitude,
        location?.coords?.longitude,
        ()=>{
          setLoader(false);
        }
      )
    );
  };

  const searchByGroup = () => {
    dispatch(
      searchInYourFriends(token, user._id, seletedService, () => {
        setLoader(false);
        setLoaderBidder(true);
        setTimeout(() => {
          setLoaderBidder(false);
        }, 50000);
      })
    );
  };
  useEffect(() => {
    dispatch(
      getServicesAction(token, (result) => {
        if (result) {
          var newArrayOfObj = result.map(({ service: name, ...rest }) => ({
            name,
            ...rest,
          }));
          newArrayOfObj = newArrayOfObj.map(({ _id: id, ...rest }) => ({
            id,
            ...rest,
          }));
          setServiceList(newArrayOfObj);
        } else {
          setServiceList([
            { id: "122333", name: "No Services, Ask Admin To Enter Services" },
          ]);
        }
      })
    );
  }, []);
  useEffect(() => {
    Geolocation.getCurrentPosition((info) => {
      location = info;
    });
    dispatch(
      searchByLongLatAction(
        token,
        "",
        location?.coords?.latitude,
        location?.coords?.longitude
      )
    );
  }, []);

  const onItemSelet = () => {
    if (!seletedService) {
      MessageInfo("Please, Select a Service");
      return;
    }
    setLoader(true);
    if (currentScreen == "MyGroup") searchByGroup();
    else searchServices();
  };

  return (
    <View style={styles.container}>
      {Platform.OS === "ios" && <View style={{ marginTop: 50 }}></View>}
      <Header
        goback={() => navigation.goBack()}
        likes={"2.1"}
        goToChatMember={() => navigation.navigate("Members")}
        goToNotification={() => navigation.navigate("Notifications")}
      />
      <View style={{ marginTop: 12 }} />
      {/* <SearchBar
        placeHolder={"Search"}
        text={historyData}
        onPress={() => searchByGroup()}
        onChangeText={(text) => searchServices(text)}
      /> */}

      <SearchablePicker
        data={serviceList}
        callBack={(result) => setSelectedService(result.name)}
      />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {seletedService ? (
          <View style={styles.item}>
            <Text>{seletedService}</Text>
          </View>
        ) : (
          <View />
        )}
        <TouchableOpacity
          style={styles.btnSearch}
          onPress={() => onItemSelet()}
        >
          <Image
            style={styles.micIcon}
            source={require("../../assets/search.png")}
          />
          {loader ? (
            <ActivityIndicator
              size={"small"}
              color={colors.red}
              style={{ marginLeft: 8 }}
            />
          ) : (
            <Text>Search</Text>
          )}
        </TouchableOpacity>
      </View>
      {loaderBidder && (
        <Text style={styles.afterSearchTxt}>
          Notifications has been sent{"\n"}Please, wait for bidder's response
        </Text>
      )}
      <View style={{ marginTop: 16 }} />
      <TopTab />
    </View>
  );
};
export default History;
