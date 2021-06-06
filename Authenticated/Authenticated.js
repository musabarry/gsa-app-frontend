
import React, {useContext, useEffect, useState} from "react";
import {Button, View} from 'react-native'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Info from "../components/AfterLogin/Info";
import Profile from '../components/AfterLogin/Profile';
import Message from '../components/AfterLogin/Message'
import Post from '../components/AfterLogin/Post'
import Home from '../components/AfterLogin/Home'
import { createStackNavigator } from "@react-navigation/stack";
import Content from '../components/AfterLogin/Content';
import { MaterialIcons, Entypo, FontAwesome5 } from '@expo/vector-icons'; 
import CommentPage from '../components/Card/CommentPage'
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
import authContext  from '../Context/authContext';
import checkContext  from '../Context/checkContext';
import{useQuery} from '@apollo/client';
import {ALLPOST, USERINFO } from "../GraphQl/query";
import Loading from '../components/BeforeLogin/loading';
const profile = ({navigation}) =>{

  return(
    <Stack.Navigator headerMode='none' >
      <Stack.Screen name="homeProfile" component={Profile} />
      <Stack.Screen name="setting" component={Content}/>
     
      <Stack.Screen name="commentpage" component={CommentPage} />
    </Stack.Navigator>
  )
}

const Authenticated = ({ navigation }) => {
  const state = useContext(checkContext);

  //(Graphql) get data from the API 
  const {error: infoError, data: dataInfo, loading: loadingInfo} =  useQuery(USERINFO)
  const {error: allPostError, data: allPostData, loading: allPostLoading} =  useQuery(ALLPOST)

  const [userInfo, setUserInfo] =  useState();
  const [allPost, setAllPost] = useState([])
  const [userID, setUserID] = useState()

  const update = () =>{
    return(dataInfo, allPostData)
  }

  useEffect(() =>{
    (async() =>{
      if(!loadingInfo || !allPostLoading){
        setUserInfo(dataInfo)
        setAllPost(allPostData)
        setUserID(state.userID)
      }
      update()
    })()
  }, [update])


  // if no data or fetch api is loading return Loading Page
  if(loadingInfo || allPostLoading || infoError | allPostError ){
    return(
        <Loading />
    )
  }

  return (  
        <authContext.Provider value={{userInfo, allPost, userID, update}}>
          <Tab.Navigator headerMode="none"   >  
            <Tab.Screen name="Home" component={Home}
              options={{
              tabBarIcon: () =>(
                <Entypo name="home" size={24} color="#1e1e1f" />
              )}} />  
            <Tab.Screen name="Post" component={Post}              
                options={{
                tabBarIcon: () =>(
                  <MaterialIcons name="add-box" size={24} color="#1e1e1f" />
              )}}
             />
            <Tab.Screen name="Message" component={Message}              
                options={{
                tabBarIcon: () =>(
                  <MaterialIcons name="message" size={24} color="#1e1e1f" />
              )}}
             />
            <Tab.Screen name="Profile" component={profile} 
               options={{
                tabBarIcon: () =>(
                  <FontAwesome5 name="user-alt" size={24} color="#1e1e1f" />
              )}} /> 
          </Tab.Navigator> 
          </authContext.Provider>
          //)
  );
};

export default Authenticated;
