import React,{useContext, useEffect, useState} from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Screens from "../AutoNavigation/AutoNavigation";
import Authenticated from "../Authenticated/Authenticated";
import AutoNavigation from '../AutoNavigation/AutoNavigation';
import authContext  from '../authContext';
import {CONNECTION } from "../GraphQl/query";
import{useQuery} from '@apollo/client';
import Loading from '../components/01/loading';
const RootStack = createStackNavigator();




const RootSreen = ({ navigation }) => {
  

  const state = useContext(authContext);
  const {error, data, loading} =  useQuery(CONNECTION)
  let info = null
  useEffect(() =>{
    if(data){
      info = data
    }else{
      
    }
  }, [data]);


  if(loading){
    return(
      <Loading />
    )
  }else{
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
};

export default RootSreen;
