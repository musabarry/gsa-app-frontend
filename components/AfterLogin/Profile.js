import React, { useContext, Component, useState, useEffect } from "react";
import {StyleSheet, Text,
  View, ScrollView} from "react-native";
import Constants from 'expo-constants';
import ProfileInfo from '../Profile/profile-info'
import PostCard from '../Card/PostCard';
import authContext  from '../../Context/authContext';


const Profile = (props) =>{

  const states = useContext(authContext);
  
  const naviSetting = () =>{
    return props.navigation.navigate('setting')
  } 

  return (
    <View style={styles.container}>
      <ScrollView  style={styles.post}>
          <View>
              {/* profile image and info component */}
              {states.userInfo && <ProfileInfo  naviSetting={naviSetting}  userInfo={states.userInfo.userInfo}/>}
          </View>
          {/* render user post */}
            {states.userInfo && states.userInfo.userPosts.map(item =>{
              return <PostCard uri={item.imageAlbum ? item.imageAlbum : ''} 
                      data={item} key={item._id} 
                      userInfo={states.userInfo.userInfo}
                      navHome={"Profile"} navScreen={"homeProfile"}/>
            })}
      </ScrollView>
    </View>
  );
  
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  hideTow: {
    display:'none'
  },
});

export default Profile;