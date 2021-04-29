import React,{useContext, useEffect, useState} from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Screens from "../AutoNavigation/AutoNavigation";
import Authenticated from "../Authenticated/Authenticated";
import AutoNavigation from '../AutoNavigation/AutoNavigation';
import checkContext  from '../Context/checkContext';
import Loading from '../components/01/loading';
const RootStack = createStackNavigator();




const RootSreen = ({ navigation }) => {
  

  const state = useContext(checkContext);  


  // if(loading){
  //   return(
  //     <Loading />
  //   )
  // }else{
    return (
      <RootStack.Navigator headerMode="none">
        {!state.authnaticated ? (
          <RootStack.Screen name="unAuth" component={AutoNavigation}/>
        ):(
          <RootStack.Screen name="auth" component={Authenticated} />
        )}
      </RootStack.Navigator> 
    );
  }
//};

export default RootSreen;
