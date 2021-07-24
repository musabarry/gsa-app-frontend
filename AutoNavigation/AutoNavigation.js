import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../components/BeforeLogin/Login";
import Signup from "../components/BeforeLogin/Signup";
import About from "../components/BeforeLogin/About";
import Majorevents from "../components/BeforeLogin/Majorevents";
import ForgotPassword from "../components/BeforeLogin/ForgotPassword";
import NewPassword from '../components/BeforeLogin//NewPassword'
import Home from '../components/BeforeLogin/Home';
// import {connection } from "../GraphQl/query";
// import{useQuery} from '@apollo/client';
const Stack = createStackNavigator();

const AutoNavigation = ({ navigation }) => {
  // const {error: conError, data: conData, loading: conLond} = useQuery(connection)
  // console.log(conData, 'data');
  // console.log({conError}, 'error');
  // console.log(conLond, 'loading');

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
