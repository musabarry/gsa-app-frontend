import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Profile from "../components/02/Profile.js";

const Tab = createBottomTabNavigator();

const Authenticated = ({ navigation }) => {
  return (
    <Tab.Navigator headerMode="none">
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default Authenticated;
