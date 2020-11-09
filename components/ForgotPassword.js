import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput
} from "react-native";
import Constants from 'expo-constants';
export default class ForgotPassword extends Component {
  render() {
    return (
      <KeyboardAvoidingView  behavior="padding" style={styles.container}>
        <View style={styles.center}>
          <View>
            <View style={styles.logoView}>
              <Text>LOGO</Text>
            </View>
            <TouchableOpacity style={styles.login_btn}>
              <Text style={styles.login_text}>Login</Text>
            </TouchableOpacity>
          </View>

        <TextInput
            placeholder="Email"
            style={styles.email}
            autoCapitalize="none"
          ></TextInput>
          
          <TouchableOpacity style={styles.send_btn}
           onPress={() => props.navigation.navigate("Login")}>
            <Text style={styles.send_text}>Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  center:{
    alignItems: 'center'
  },
  logoView:{
    justifyContent: 'center',
    padding: 20
  },
  login_btn:{
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 18,
    overflow: 'hidden',
    height: 30,
    width: 125,
    color: '#000',
    marginBottom: 25
  },
  login_text: {
    fontSize: 18,
    fontWeight: '800',
    textAlign: "center",
    paddingVertical: 3,
  },
  email: {
    height: 40,
    backgroundColor: "rgba(225, 229, 235,0.8)",
    paddingLeft: 10,
    marginBottom: 5,
    borderRadius: 23,
    width: 400
  },
  logocontainer: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 100,
    height: 100,
  },
  send_btn:{
    backgroundColor: '#fff',
    borderRadius: 18,
    overflow: 'hidden',
    height: 30,
    width: 125,
    color: '#000'
  },
  send_text: {
    fontSize: 18,
    fontWeight: '800',
    textAlign: "center",
    paddingVertical: 3,
  },
  citytech: {
    color: "rgba(90, 145, 109,0.8)",
  },
  buttontext: {
    paddingVertical: 50,
  },
});
