import React, { useState, useEffect } from "react";
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
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

const windowWidth = Dimensions.get("window").width;
const MapScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [likeIconToggle, setLikeIconToggle] = useState(false);
  const { historyFromFriend } = useSelector(({ searches }) => searches);

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        region={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
      ></MapView>
    </View>
  );
};

export default MapScreen;
