import React,{useContext, useEffect, useState} from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Screens from "../AutoNavigation/AutoNavigation";
import Authenticated from "../Authenticated/Authenticated";
import AutoNavigation from '../AutoNavigation/AutoNavigation';
import Verify from "../components/BeforeLogin/Verify";
import checkContext  from '../Context/checkContext';
import Loading from '../components/BeforeLogin/loading';
const RootStack = createStackNavigator();


const RootSreen = ({ navigation }) => {
  

  const state = useContext(checkContext);  

  return (
    <RootStack.Navigator headerMode="none">
      {state.authnaticated ? (
         <RootStack.Screen name="auth" component={Authenticated} />
      ):state.verifyUser ?(
        <RootStack.Screen name="verify" component={Verify} />
      ):(
        <RootStack.Screen name="unAuth" component={AutoNavigation}/>
      )}
    </RootStack.Navigator> 
  );
}

export default RootSreen;
