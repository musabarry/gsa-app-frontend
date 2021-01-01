import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import Screens from "../AutoNavigation/AutoNavigation";
import Authenticated from "../Authenticated/Authenticated";
import AutoNavigation from '../AutoNavigation/AutoNavigation';

const RootStack = createStackNavigator();




const RootSreen = ({ navigation }) => {
  

   

  return (
    <RootStack.Navigator headerMode="none">
      <RootStack.Screen name="unAuth" component={AutoNavigation}/>
      <RootStack.Screen name="auth" component={Authenticated} />
    </RootStack.Navigator> 

  );
};

export default RootSreen;
