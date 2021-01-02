import React from "react";
import { createStackNavigator, HeaderBackButton } from "@react-navigation/stack";
import Login from "../components/01/Login";
import Signup from "../components/01/Signup";
import About from "../components/01/About";
import Majorevents from "../components/Majorevents";
import ForgotPassword from "../components/01/ForgotPassword";
import NewPassword from '../components/01//NewPassword'
import Home from '../components/01/Home'
const Stack = createStackNavigator();

const AutoNavigation = ({ navigation }) => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="About" component={About} />
      <Stack.Screen name="MajorEvents" component={Majorevents} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="NewPassword" component={NewPassword} />
    </Stack.Navigator>
  );
};

export default AutoNavigation;
