import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  Platform,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import { styles } from "./styles";
import { launchImageLibrary } from "react-native-image-picker";
import { colors } from "../../utills/colors";
import Header from "../../components/Header";
import { useDispatch, useSelector } from "react-redux";
import ProfileHeading from "../../components/ProfileHeading";
import ProfileImageEdit from "../../components/ProfileImgEdit";
import ProfileBio from "../../components/ProfileBio";
import MyServices from "../../components/MyServices";
import { RNS3 } from "react-native-aws3";
import ProfilePieChart from "../../components/ProfilePieChart";
import { generateUID } from "../../utills/helper";
import { updateUserAction } from "../../redux/actions/auth";
import { TOKEN, USER } from "../../redux/constants";

const options = {
  maxHeight: 1024,
  maxWidth: 1024,
  mediaType: "mixed",
  videoQuality: "medium",
  durationLimit: 30,
};
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
const ProfileSreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { user, token } = useSelector(({ auth }) => auth);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage ] = useState("")

  const addImageMedia = async (index) => {
    const result = await launchImageLibrary(options);
    console.log("==>", result.assets[0].uri);
    uploadImageToS3(result.assets[0].uri);
  };

  function uploadImageToS3(uri) {
    setSelectedImage(uri)
    const file = {
      uri: uri,
      name: generateUID() + ".jpg",
      type: "image/jpeg",
    };
    const options = {
  
      successActionStatus: 201,
    };
    console.log("options : ", options);
    RNS3.put(file, options).then((response) => {
      if (response.status !== 201){
        throw new Error("Failed to upload image to S3");
        return;
      } else {
        var userData = user
        userData.profileImage = response.body.postResponse.location;
        dispatch({type: USER, data: userData});
        var data = {
          profileImage: response.body.postResponse.location
        }
        dispatch(updateUserAction(user._id, token, data))
      }
    });
  }

  const Item = ({ title }) => (
    <View style={styles.item}>
      <Image
        style={styles.featurePic}
        source={require("../../assets/service.png")}
      />
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {Platform.OS === "ios" && <View style={{ marginTop: 50 }}></View>}
      <Header goback={() => navigation.goBack()} />
      <ProfileHeading text={"Picture"} top={16} />
      <ProfileImageEdit
        top={8}
        onPress={() => addImageMedia()}
        profileImg={user.profileImage || selectedImage}
      />
      <ProfileHeading text={"Bio"} top={24} />
      {console.log("\n\n\n ===> ", user)}
      <ProfileBio
        top={8}
        firstName={user.name}
        lastName={user.name}
        email={user.email}
      />
      {user.role == "vendor" && (
        <MyServices
          onPress={() => navigation.navigate("Services")}
          top={20}
          bottom={16}
        />
      )}
      <ProfileHeading text={"Workfolio"} top={16} />
      <ProfilePieChart
        top={16}
        bottom={16}
        widthAndHeight={250}
        series={[user?.serches || 0, user?.like || 0]}
        sliceColor={[colors.search, colors.like]}
      />
      {user?.featuredImages ==[] && (
        <ProfileHeading text={"Featured"} top={16} bottom={12} />
      )}

      <FlatList
        data={user.featuredImages}
        horizontal
        renderItem={({ item }) => <Item title={item.title} />}
        keyExtractor={(item) => item.id}
      />
      <View style={{ marginTop: 48 }} />
    </ScrollView>
  );
};

export default ProfileSreen;
