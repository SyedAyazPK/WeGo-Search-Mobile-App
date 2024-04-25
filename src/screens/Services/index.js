import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  Platform,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Modal,
  Pressable,
} from 'react-native';
import {styles} from './styles';
import {launchImageLibrary} from 'react-native-image-picker';
import {colors} from '../../utills/colors';
import Header from '../../components/Header';
import {Picker} from '@react-native-picker/picker';
import {useDispatch, useSelector} from 'react-redux';
import { updateUserAction } from '../../redux/actions/auth';
import { getServicesAction } from '../../redux/actions/Authentication';

const options = {
  maxHeight: 1024,
  maxWidth: 1024,
  mediaType: 'mixed',
  videoQuality: 'medium',
  durationLimit: 30,
};
const Services = ({navigation}) => {
  const dispatch = useDispatch();
  const {allServices} = useSelector(
    ({authentication}) => authentication,
  );
  const {user, token} = useSelector(
    ({auth}) => auth,
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [servicesStat, setServicesStat] = useState(allServices || []);
  const [selectedLanguage, setSelectedLanguage] = useState();
  const addImageMedia = async index => {
    const result = await launchImageLibrary(options);
    console.log('==>', result);
  };

  useEffect(() => {
    dispatch(getServicesAction(token));
  }, []);

  useEffect(() => {
    setServicesStat(allServices);
  }, [allServices]);

  const addMyServices = selectedOpt => {
    var myServices = user?.services || [];
    setSelectedLanguage(selectedOpt);
    if (Array.prototype.includes.call(myServices, selectedOpt)) return;
    myServices.push(selectedOpt);
    var data = {
      services: myServices,
    };
    dispatch(updateUserAction(user._id, token, data));
  };

  const removeMyServices = index => {
    console.log(index);
    var myServices = user?.services || [];
    myServices.splice(index, 1);
    var data = {
      services: myServices,
    };
    dispatch(updateUserAction(user._id, token, data));
  };

  const Item = ({title, index}) => (
    <View style={styles.item}>
      <TouchableOpacity
        onPress={() => removeMyServices(index)}
        style={styles.crossBtn}>
        <Image
          style={styles.crossPic}
          source={require('../../assets/cross.png')}
        />
      </TouchableOpacity>
      <Text>{title}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {Platform.OS === 'ios' && <View style={{marginTop: 50}}></View>}
      <Header title={'Services'} goback={() => navigation.goBack()} />

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 4,
        }}>
        {Platform.OS === 'ios' && (
          <View style={styles.pickerIOS}>
            <Picker
              selectedValue={selectedLanguage}
              onValueChange={(itemValue, itemIndex) =>
                addMyServices(itemValue)
              }>
              {servicesStat.map(obj => (
                <Picker.Item label={obj.service} value={obj.service} />
              ))}
            </Picker>
          </View>
        )}
        <>
          {Platform.OS == 'android' && (
            <View style={styles.pickerAndroid}>
              <Picker
                selectedValue={selectedLanguage}
                onValueChange={(itemValue, itemIndex) =>
                  addMyServices(itemValue)
                }>
                {servicesStat?.map(obj => (
                  <Picker.Item label={obj?.service} value={obj?.service} />
                ))}
              </Picker>
            </View>
          )}
        </>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={styles.addBtn}>
          <Image
            style={styles.addImg}
            source={require('../../assets/plus.png')}
          />
        </TouchableOpacity>
      </View>

      <FlatList
        contentContainerStyle={{flexDirection: 'row', flexWrap: 'wrap'}}
        data={user?.services}
        renderItem={({item, index}) => <Item title={item} index={index} />}
        keyExtractor={item => item.id}
        style={{marginTop: 20}}
      />
      <View style={{marginTop: 48}} />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Ask Admin To Add New Field</Text>
            <View style={{flexDirection: 'row'}}>
              <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={[styles.textStyle, {color: colors.black}]}>
                  Cancel
                </Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Add</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default Services;
