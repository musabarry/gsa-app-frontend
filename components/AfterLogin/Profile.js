import React, { useContext, Component, useState, useEffect } from "react";
import {StyleSheet, Text,
  View, ScrollView} from "react-native";
import Constants from 'expo-constants';
import ProfileInfo from '../Profile/profile-info'
import PostCard from '../Card/PostCard';
import authContext  from '../../Context/authContext';
import {GETIMAGE} from '../../GraphQl/mutation';
import{useMutation} from '@apollo/client';
const Profile = (props) =>{

  const states = useContext(authContext);
  const [getImage, {error: imageError, loading: imageLoading}] = useMutation(GETIMAGE)
  const [image, setImage] = useState()
  const naviSetting = () =>{
    return props.navigation.navigate('setting')
  }

  const naviChangeImg = () =>{
    return props.navigation.navigate('changeImg')
  }
  const avatar = states.userInfo.userInfo.avatar
  const getImageFromS3 =  () =>{
    if(avatar){
        getImage({
            variables:{
                key: avatar,
                from: 'gsa-profile-image'
            }
        }).then(res =>{
            setImage(res.data.getImage.image);
        }).catch(error =>{
          console.log(error);
        })

    }
}

  useEffect(()=>{
    getImageFromS3()
  }, [])



  return (
    <View style={styles.container}>
      <ScrollView  style={styles.post}>
          <View>
              {/* profile image and info component */}
              {states.userInfo && <ProfileInfo  naviSetting={naviSetting} naviChangeImg={naviChangeImg}
               userInfo={states.userInfo.userInfo} avatar={avatar ? image : ''}/>}
          </View>
          {/* render user post */}
            {states.userInfo && states.userInfo.userPosts.map(item =>{
              return <PostCard uri={item.imageAlbum ? item.imageAlbum[0] : null} 
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