import React, { useContext } from "react";
import {StyleSheet,
  View, ScrollView} from "react-native";
import ProfileInfo from '../Profile/profile-info'
import PostCard from '../Card/PostCard';
import authContext  from '../../Context/authContext';
const Profile = (props) =>{

  const states = useContext(authContext);

  const naviSetting = () =>{
    return props.navigation.navigate('setting')
  }

  const naviChangeImg = () =>{
    return props.navigation.navigate('changeImg')
  }

  return (
    <View style={styles.container}>
      <ScrollView  style={styles.post}>
          <View>
              {/* profile image and info component */}
              {states.userInfo && <ProfileInfo  naviSetting={naviSetting} naviChangeImg={naviChangeImg}
               userInfo={states.userInfo.userInfo} />}
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