import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Screens from "../components/AutoNavigation/AutoNavigation";
import Authenticated from "../components/Authenticated/Authenticated";
import Login from "../components/Login";
import Signup from "../components/Signup";
import About from "../components/About";
// import ForgotPassword from "../components/ForgotPassword";

const RootStack = createStackNavigator();

const RootSreen = ({ navigation }) => {
  return (
    <RootStack.Navigator headerMode="none">
      <RootStack.Screen name="ProfileAuth" component={Screens} />
      <RootStack.Screen name="LoginAuth" component={Authenticated} />
      <RootStack.Screen name="SignupAuth" component={Authenticated} />
      <RootStack.Screen name="AboutAuth" component={About} />
      {/* <RootStack.Screen name="FpasswordAuth" component={ForgotPassword} /> */}
    </RootStack.Navigator>
  );
};

export default RootSreen;
