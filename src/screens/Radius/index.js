import React, { useState, useEffect } from "react";
import { Text, View, FlatList, Image, TouchableOpacity } from "react-native";
import { colors } from "../../utills/colors";
import { styles } from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { RADIUS_HISTORY, CURRENT_SCREEN } from "../../redux/constants";
import { addToGroupAction } from "../../redux/actions/searches";
import { MessageInfo } from "../../utills/showAlerts";
import { useFocusEffect } from "@react-navigation/native";
import Geolocation from "@react-native-community/geolocation";
import { searchByLongLatAction } from "../../redux/actions/searches";

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

const Radius = () => {
  const dispatch = useDispatch();
  const [likeIconToggle, setLikeIconToggle] = useState(false);
  const { historyByRadius } = useSelector(({ searches }) => searches);
  const { user, token } = useSelector(({ auth }) => auth);

  useFocusEffect(
    React.useCallback(() => {
      dispatch({
        type: CURRENT_SCREEN,
        data: "Radius",
      });
      getBYRadius();
    }, [])
  );

  const getBYRadius = () => {
    console.log("running...");

    Geolocation.getCurrentPosition((info) => {
      location = info;
      dispatch(
        searchByLongLatAction(
          token,
          "",
          info?.coords?.latitude,
          info?.coords?.longitude
        )
      );
    });
  };

  const openAddBtn = (index) => {
    var memberByRadius = historyByRadius;
    memberByRadius.map((obj) => (obj.isAddedToGroup = false));
    memberByRadius[index].isAddedToGroup = true;
    dispatch({ type: RADIUS_HISTORY, data: memberByRadius });
  };

  const addToMyGroup = (index) => {
    var data = {
      senderId: user._id,
      receiverId: historyByRadius[index]._id,
    };
    dispatch(
      addToGroupAction(data, token, () => {
        var memberByRadius = historyByRadius;
        memberByRadius[index].isAddedToGroup = false;
        dispatch({ type: RADIUS_HISTORY, data: memberByRadius });
        MessageInfo("Added to you group.");
      })
    );
  };

  const Item = ({ item, index }) => (
    <View style={styles.item}>
      <TouchableOpacity
        style={{ position: "absolute", right: 8, top: 8, zIndex: 1 }}
        onPress={() => openAddBtn(index)}
      >
        <Image
          style={[
            styles.likeIcon,
            // {tintColor: likeIconToggle ? colors.red : 'white'},
          ]}
          resizeMode="stretch"
          source={require("../../assets/opt.png")}
        />
      </TouchableOpacity>

      {item.isAddedToGroup && (
        <TouchableOpacity
          style={styles.addToGroupBtn}
          onPress={() => addToMyGroup(index)}
        >
          <Text style={styles.addToGroupTxt}>Add To Group</Text>
        </TouchableOpacity>
      )}
      <Image
        style={styles.avatar}
        source={
          item.profileImage
            ? { uri: item.profileImage }
            : require("../../assets/user_placeholder.jpeg")
        }
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingVertical: 8,
          paddingHorizontal: 8,
        }}
      >
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.title}>{item.likes}</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingBottom: 8,
          paddingHorizontal: 8,
        }}
      >
        <Text style={styles.titleActive}>Now Active:</Text>
        <Text style={styles.titleActive}>1454 Hrs</Text>
      </View>
    </View>
  );
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={historyByRadius}
        numColumns={2}
        renderItem={({ item, index }) => <Item item={item} index={index} />}
        keyExtractor={(item) => item._id}
        style={styles.listStyle}
      />
    </View>
  );
};

export default Radius;
