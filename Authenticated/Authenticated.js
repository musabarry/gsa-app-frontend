import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Info from "../components/02/Info";
import Profile from '../components/02/Profile'
const Tab = createBottomTabNavigator();

const Authenticated = ({ navigation }) => {
  return (
    <Tab.Navigator headerMode="none">
      <Tab.Screen name="Info" component={Info} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default Authenticated;
