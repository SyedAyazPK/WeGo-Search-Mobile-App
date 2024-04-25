import React, {useState} from 'react';
import {
  View,
  Platform,
} from 'react-native';
import {styles} from './styles';
import Header from '../../components/Header';
import SearchBar from '../../components/SearchBar';
import TopTabHistory from '../../navigation/TopTabHistory';
import {useDispatch, useSelector} from 'react-redux';
import { searchByLongLatAction } from '../../redux/actions/searches';


const SearchHistory = ({navigation}) => {
  const [historyData, setHistoryData] = useState("");
  const dispatch = useDispatch();
  const {token} = useSelector(({authentication}) => authentication);

  const searchServices = (text) => {
    setHistoryData(text)
    dispatch(searchByLongLatAction(token, text? text : "   "))
  }

  return (
    <View style={styles.container}>
      {Platform.OS === 'ios' && <View style={{marginTop: 50}}></View>}
      <Header goback={() => navigation.goBack()} likes={'2.1'} goToNotification={()=>navigation.navigate("Notifications")} />
      <View style={{marginTop: 12}}/>
      <SearchBar placeHolder={'Search'} text={historyData} onChangeText={(text)=> searchServices(text)}/>
      <View style={{marginTop: 16}}/>
      <TopTabHistory />
    </View>
  );
};
export default SearchHistory;