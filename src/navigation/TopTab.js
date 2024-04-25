import * as React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MyGroup from '../screens/MyGroup';
import Radius from '../screens/Radius';

const Tab = createMaterialTopTabNavigator();
export default function TopTab() {
  return (
      <Tab.Navigator>
        <Tab.Screen name="My Group" component={MyGroup} />
        <Tab.Screen name="Radius" component={Radius} />
      </Tab.Navigator>
  );
}