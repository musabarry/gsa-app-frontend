import React, { useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Button
} from "react-native";
import Constants from 'expo-constants';
import { AntDesign} from '@expo/vector-icons';
import ProfileInfo from '../Profile/profile-info'




const Profile =(props) => {



  return (
    <View>
          <View style={styles.wrapper_top}>
              <ProfileInfo />
          </View>
          <View>
            
          </View>
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
  }
});

export default Profile;

