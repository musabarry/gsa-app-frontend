import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../Home.js";
import Login from "../Login.js";
import Signup from "../Signup.js";
import About from "../About.js";
import Majorevents from "../Majorevents.js";
// import ForgotPassword from "../components/ForgotPassword";
const Stack = createStackNavigator();

const Screens = ({ navigation }) => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="About" component={About} />
      <Stack.Screen name="MajorEvents" component={Majorevents} />
      {/* <Stack.Screen name="ForgotPassword" component={ForgotPassword} /> */}
    </Stack.Navigator>
  );
};

export default Screens;
