import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Profile from "../Profile";
import Login from "../Login";
import Signup from "../Signup";
import About from "../About";
// import ForgotPassword from "../components/ForgotPassword";
const Tab = createBottomTabNavigator();

const Authenticated = ({ navigation }) => {
  return (
    <Tab.Navigator headerMode="none">
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Login" component={Login} />
      <Tab.Screen name="Signup" component={Signup} />
      <Tab.Screen name="About" component={About} />
      {/* <Tab.Screen name="FortgotPassword" component={FortgotPassword} /> */}
    </Tab.Navigator>
  );
};

export default Authenticated;
