import React, {useState} from 'react';
import {Text, View, FlatList, Image, TouchableOpacity} from 'react-native';
import {colors} from '../../utills/colors';
import {styles} from './styles';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

const MyGroupHistory = ({navigation}) => {
  const [likeIconToggle, setLikeIconToggle] = useState(false);

  const Item = ({title}) => (
    <TouchableOpacity style={styles.item}>
      <Text style={styles.description}>
      aC SPLIT UNIT MITSUDISHI MODEL 
      </Text>
    </TouchableOpacity>
  );
  return (
    <View style={{flex: 1}}>
      <FlatList
        data={DATA}
        renderItem={({item}) => <Item title={item.title} />}
        keyExtractor={item => item.id}
        style={styles.listStyle}
      />
    </View>
  );
};

export default MyGroupHistory;
