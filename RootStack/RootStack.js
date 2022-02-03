import React,{useContext, useEffect, useState} from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Authenticated from "../Authenticated/Authenticated";
import AutoNavigation from '../AutoNavigation/AutoNavigation';
import Verify from "../components/BeforeLogin/Verify";
import checkContext  from '../Context/checkContext';
import Loading from '../components/BeforeLogin/loading';
import NewPassword from "../components/BeforeLogin/NewPassword";
const Stack = createStackNavigator();


const VerifyCom =  ({navigation}) =>{

  return(
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="verifyPage" component={Verify} />
      <Stack.Screen name="newPassword" component={NewPassword} />
    </Stack.Navigator>
  )
}


const RootSreen = ({ navigation }) => {
  
  const state = useContext(checkContext);  

  return (
    <Stack.Navigator headerMode="none">
      {state.authnaticated ? (
         <Stack.Screen name="auth" component={Authenticated} />
      ):state.verifyUser ?(
        <Stack.Screen name="verify" component={VerifyCom} />
      ):(
        <Stack.Screen name="unAuth" component={AutoNavigation}/>
      )}
    </Stack.Navigator> 
  );
}

export default RootSreen;
