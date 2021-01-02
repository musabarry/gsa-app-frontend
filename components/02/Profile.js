import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
} from "react-native";
import Constants from 'expo-constants';
import { AntDesign} from '@expo/vector-icons';
import ProfileInfo from '../Profile/profile-info'
export default class Profile extends Component {
  render() {
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  wrapper_top: {
    height: 200,
    // justifyContent: 'center',
    width: '100%',
    // alignItems: 'center'
  }
});

