import React, {useContext} from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Info from "../components/02/Info";
import Profile from '../components/02/Profile';
import { createStackNavigator } from "@react-navigation/stack";
import Content from '../components/02/Content';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
import authContext  from '../authContext'
const Authenticated = ({ navigation }) => {
  const state = useContext(authContext);

  return (
          !state.account ?(
          <Stack.Navigator headerMode='float'>
            <Tab.Screen name="Info" component={Info}   />
            </Stack.Navigator>
          ):(
          <Tab.Navigator headerMode="none" >
            <Tab.Screen name="Profile" component={Profile} />  
            <Tab.Screen name="Content" component={Content} />
            </Tab.Navigator> 
          )
  );
};

export default Authenticated;
