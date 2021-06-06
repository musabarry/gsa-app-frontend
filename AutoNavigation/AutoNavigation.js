import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../components/BeforeLogin/Login";
import Signup from "../components/BeforeLogin/Signup";
import About from "../components/BeforeLogin/About";
import Majorevents from "../components/BeforeLogin/Majorevents";
import ForgotPassword from "../components/BeforeLogin/ForgotPassword";
import NewPassword from '../components/BeforeLogin//NewPassword'
import Home from '../components/BeforeLogin/Home';

const Stack = createStackNavigator();

const AutoNavigation = ({ navigation }) => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup}/>
      <Stack.Screen name="About" component={About} />
      <Stack.Screen name="MajorEvents" component={Majorevents} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="NewPassword" component={NewPassword} />
    </Stack.Navigator>
  );
};

export default AutoNavigation;
