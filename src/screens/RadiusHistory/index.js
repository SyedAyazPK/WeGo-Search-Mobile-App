import React, { useState, useEffect } from "react";
import { Text, View, FlatList, Image, TouchableOpacity } from "react-native";
import { colors } from "../../utills/colors";
import { styles } from "./styles";
import Header from "../../components/Header";
import SearchBar from "../../components/SearchBar";
import { useDispatch, useSelector } from "react-redux";
import {
  getSearchHistory,
  deleteHistoryById,
} from "../../redux/actions/searches";
import { ALL_SEARCH_HISTORY } from "../../redux/constants";

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
];

const RadiusHistory = ({ navigation }) => {
  const dispatch = useDispatch();
  const { user, token } = useSelector(({ auth }) => auth);
  const { allSearchHistory } = useSelector(({ searches }) => searches);
  const [historyData, setHistoryData] = useState("");
  const [myAllSearches, setMyAllSearches] = useState(allSearchHistory || []);

  useEffect(() => {
    setMyAllSearches(allSearchHistory);
  }, [allSearchHistory]);

  useEffect(() => {
    console.log("\n\n==>  ", token);
    dispatch(getSearchHistory(token));
  }, []);

  const searchFromMyHistory = (text) => {
    setHistoryData(text);
    setMyAllSearches(allSearchHistory.filter((obj) => obj.text.includes(text)));
  };

  const deleteSearchHistory = (id, index) => {
    dispatch(
      deleteHistoryById(token, id, () => {
        myHistory = allSearchHistory;
        myHistory.splice(index, 1);
        setMyAllSearches(myHistory)
        dispatch({ type: ALL_SEARCH_HISTORY, data: myHistory });
      })
    );
  };

  const Item = ({ title, id, index }) => (
    <View style={styles.item}>
      <Text style={styles.description}>{title}</Text>
      <TouchableOpacity
        onPress={() => deleteSearchHistory(id, index)}
        style={styles.deleteBtn}
      >
        <Image
          style={styles.deleteIcon}
          resizeMode="stretch"
          source={require("../../assets/trash.png")}
        />
      </TouchableOpacity>
    </View>
  );
  return (
    <View style={{ flex: 1, paddingHorizontal: 10 }}>
      {Platform.OS === "ios" && <View style={{ marginTop: 50 }}></View>}
      <Header
        goback={() => navigation.goBack()}
        likes={"2.1"}
        goToNotification={() => navigation.navigate("Notifications")}
      />
      <View style={{ marginTop: 12 }} />
      <SearchBar
        placeHolder={"Search"}
        text={historyData}
        onChangeText={(text) => searchFromMyHistory(text)}
      />
      <View style={{ marginTop: 16 }} />
      <FlatList
        data={myAllSearches}
        renderItem={({ item, index }) => (
          <Item title={item.text} id={item._id} index={index} />
        )}
        keyExtractor={(item) => item.id}
        style={styles.listStyle}
      />
    </View>
  );
};

export default RadiusHistory;
