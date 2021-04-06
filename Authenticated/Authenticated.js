
import React, {useContext, useEffect, useState} from "react";
import {Button, View} from 'react-native'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Info from "../components/02/Info";
import Profile from '../components/02/Profile';
import Message from '../components/02/Message'
import Post from '../components/02/Post'
import Home from '../components/02/Home'
import { createStackNavigator } from "@react-navigation/stack";
import Content from '../components/02/Content';
import { MaterialIcons, Entypo, FontAwesome5 } from '@expo/vector-icons'; 
import CommentPage from '../components/Card/CommentPage'
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
import authContext  from '../Context/authContext';
import checkContext  from '../Context/checkContext';
import{useQuery} from '@apollo/client';
import {ALLPOST, USERINFO } from "../GraphQl/query";
import Loading from '../components/01/loading';
const profile = ({navigation}) =>{

  return(
    <Stack.Navigator headerMode='none' >
      <Stack.Screen name="homeProfile" component={Profile} />
      <Stack.Screen name="setting" component={Content}/>
      {/* <Stack.Screen name="fullImage" component={FullImage} /> */}
      <Stack.Screen name="commentpage" component={CommentPage} />
    </Stack.Navigator>
  )
}


const Authenticated = ({ navigation }) => {
  const state = useContext(checkContext);
  const {error: infoError, data: dataInfo, loading: loadingInfo} =  useQuery(USERINFO)
  const {error: allPostError, data: allPostData, loading: allPostLoading} =  useQuery(ALLPOST)

  const [userInfo, setUserInfo] =  useState();
  const [userPost, setUserPost] = useState();
  const [allPost, setAllPost] = useState([])
  const [userID, setUserID] = useState()


  

  useEffect(() =>{
    (async() =>{
      if(!loadingInfo || !allPostLoading){
        setUserInfo(dataInfo)
        setUserPost(dataInfo)
        setAllPost(allPostData)
        setUserID(state.userID)
      }
    })()
  }, [dataInfo, allPostData])

  if(loadingInfo || allPostLoading || infoError | allPostError ){
    return(
        <Loading />
    )
  }

  return (  
        <authContext.Provider value={{userInfo, userPost, allPost, userID}}>
          <Tab.Navigator headerMode="none"   >  
            <Tab.Screen name="Home" component={Home}
              options={{
              tabBarIcon: () =>(
                <Entypo name="home" size={24} color="black" />
              )}} />  
            <Tab.Screen name="Post" component={Post}              
                options={{
                tabBarIcon: () =>(
                  <MaterialIcons name="add-box" size={24} color="black" />
              )}}
             />
            <Tab.Screen name="Message" component={Message}              
                options={{
                tabBarIcon: () =>(
                  <MaterialIcons name="message" size={24} color="black" />
              )}}
             />
            <Tab.Screen name="Profile" component={profile} 
               options={{
                tabBarIcon: () =>(
                  <FontAwesome5 name="user-alt" size={24} color="black" />
              )}} /> 
          </Tab.Navigator> 
          </authContext.Provider>
          //)
  );
};

export default Authenticated;
