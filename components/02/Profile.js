import React, { useContext, Component, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  Image
} from "react-native";
import Constants from 'expo-constants';
import { AntDesign} from '@expo/vector-icons';
import ProfileInfo from '../Profile/profile-info'
import PostCard from '../post-card/PostCard';
import{useQuery} from '@apollo/client';
import { ALL } from "../../GraphQl/query";
import { USERINFO } from "../../GraphQl/query";
import authContext  from '../../authContext';




const Profile =(props) => {
  const states = useContext(authContext);
  const state ={
    uri: 'https://media.istockphoto.com/photos/building-a-strong-team-wooden-blocks-with-people-icon-on-pink-human-picture-id1227412970'
  }
  const {error, data, loading} =  useQuery(ALL)
 
  const navi = () =>{
    return props.navigation.navigate('i')
  }



  
  return (
    <View style={styles.wrapper}>
          <View style={styles.wrapper_top}>
              <ProfileInfo  navi={navi} />
          </View>
          <ScrollView  style={styles.post}>
            <PostCard uri={state.uri}/>
            <PostCard />
            <PostCard  uri={state.uri}/>
            <PostCard />
            <PostCard  uri={state.uri}/>
            <PostCard />
            <PostCard  uri={state.uri}/>
          </ScrollView>
    </View>
  );
  
}
const height = Dimensions.get('screen').height

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  wrapper_top: {
    // height: '60%',
    backgroundColor: "#DCD6D6",
    // justifyContent: 'center',
    // width: '100%',
    // alignItems: 'center' 
  },
  wrapper:{
    paddingBottom: '80%'
  },
});

export default Profile;