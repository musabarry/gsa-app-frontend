import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
} from "react-native";
import Constants from 'expo-constants';
import { AntDesign} from '@expo/vector-icons';

export default class Profile extends Component {
  render() {
    return (
      <View>
        <Text>Profile</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
});

