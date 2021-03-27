import React, { useContext, Component, useState, useEffect } from "react";
import {StyleSheet, Text,
  View, Dimensions, ScrollView} from "react-native";
import Constants from 'expo-constants';
import ProfileInfo from '../Profile/profile-info'
import PostCard from '../Card/PostCard';
import{useQuery} from '@apollo/client';
import { USERINFO, USERPOST, CONNECTION } from "../../GraphQl/query";
import authContext  from '../../authContext';
import Loading from '..//01/loading';
const Profile = (props) =>{

  const states = useContext(authContext);
  
  const state ={
    uri: 'https://media.istockphoto.com/photos/building-a-strong-team-wooden-blocks-with-people-icon-on-pink-human-picture-id1227412970'
  }
  const {error, data, loading} =  useQuery(USERINFO)
  const [show, setShow] = useState(false)

  const naviSetting = () =>{
    return props.navigation.navigate('setting')
  } 

 



  
  useEffect(() =>{

  }, [show])
 
  if(loading){
    return(
      <Loading />
    ) 
  }else{
    return (
      <View style={styles.container}>
        <ScrollView  style={styles.post}>
            <View style={!show? styles.wrapper_top : styles.hideTow}>
                <ProfileInfo  naviSetting={naviSetting}  data={data.userInfo}/>
            </View>
              {data.userPosts.map(item =>{
                return <PostCard uri={item.imageAlbum ? item.imageAlbum : ''} 
                        data={item} key={item._id} info={data.userInfo} 
                        navHome={"Profile"} navScreen={"homeProfile"}/>
              })}
        </ScrollView>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  wrapper_top: {
    backgroundColor: "#DCD6D6",
  },
  hideTow: {
    display:'none'
  },
  // post:{
  //   display: 'flex',
  //   flexDirection: 'row'

  // },
  // wrapper:{
  //   paddingBottom: '80%'
  // },
});

export default Profile;