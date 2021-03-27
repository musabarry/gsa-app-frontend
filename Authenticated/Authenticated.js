
import React, {useContext} from "react";
import {Button, View} from 'react-native'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Info from "../components/02/Info";
import Profile from '../components/02/Profile';
import FullImage from '../components/Card/FullImage'
import Post from '../components/02/Post'
import Home from '../components/02/Home'
import { createStackNavigator } from "@react-navigation/stack";
import Content from '../components/02/Content';
import { MaterialIcons, Entypo, FontAwesome5 } from '@expo/vector-icons'; 
import CommentPage from '../components/Card/CommentPage'
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
import authContext  from '../authContext';

const profile = ({navigation}) =>{

  return(
    <Stack.Navigator headerMode='none' >
      <Stack.Screen name="homeProfile" component={Profile} />
      <Stack.Screen name="setting" component={Content}/>
      <Stack.Screen name="fullImage" component={FullImage} />
      <Stack.Screen name="commentpage" component={CommentPage} />
    </Stack.Navigator>
  )
}


const Authenticated = ({ navigation }) => {
  const state = useContext(authContext);

  return (
          !state.account ?(
          <Stack.Navigator headerMode='none'>
            <Tab.Screen name="Info" component={Info}   />
          </Stack.Navigator>
          ):(
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
            <Tab.Screen name="Profile" component={profile} 
               options={{
                tabBarIcon: () =>(
                  <FontAwesome5 name="user-alt" size={24} color="black" />
              )}} /> 
              {/* <Tab.Screen name="Profile" component={Profile}
              options={{tabBarLabel: 'Profile',
              tabBarIcon: () =>(
                <FontAwesome5 name="user-alt" size={24} color="black" />
              )}} />  
            <Tab.Screen name="Content" component={Content}
              options={{tabBarLabel: 'Info',
              tabBarIcon: () =>(
               <MaterialIcons name="add" size={24} color="black" />
            )}}/> */}
          </Tab.Navigator> 
          )
  );
};

export default Authenticated;
