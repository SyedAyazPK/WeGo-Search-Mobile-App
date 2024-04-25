import * as React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MyGroupHistory from '../screens/MyGroupHistory';
import RadiusHistory from '../screens/RadiusHistory';

const Tab = createMaterialTopTabNavigator();
export default function TopTabHistory() {
  return (
      <Tab.Navigator>
        <Tab.Screen name="My Group" component={MyGroupHistory} />
        <Tab.Screen name="Radius" component={RadiusHistory} />
      </Tab.Navigator>
  );
}