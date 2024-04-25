import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/Home';
import History from '../screens/History';
import TopTab from './TopTab';
import Members from '../screens/Members/index.js';
import ChatScreen from '../screens/ChatScreen';
import Notifications from '../screens/Notifications';
import ProfileSreen from '../screens/ProfileScreen';
import Services from '../screens/Services';
import SearchHistory from '../screens/SearchHistory';
import TopTabHistory from './TopTabHistory';
import NotificationDetail from '../screens/NotificationDetail';
import MapScreen from '../screens/MapScreen';
import RadiusHistory from '../screens/RadiusHistory';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="History" component={History} />
      <Stack.Screen name="TopTab" component={TopTab} />
      <Stack.Screen name="Members" component={Members} />
      <Stack.Screen name="ChatScreen" component={ChatScreen} />
      <Stack.Screen name="Notifications" component={Notifications} />
      <Stack.Screen name="ProfileSreen" component={ProfileSreen} />
      <Stack.Screen name="Services" component={Services} />
      <Stack.Screen name="TopTabHistory" component={TopTabHistory} />
      <Stack.Screen name="SearchHistory" component={SearchHistory} />
      <Stack.Screen name="NotificationDetail" component={NotificationDetail} />
      <Stack.Screen name="MapScreen" component={MapScreen} />
      <Stack.Screen name="RadiusHistory" component={RadiusHistory} />
    </Stack.Navigator>
  );
};

export default Navigation;
