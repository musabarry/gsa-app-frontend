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
import { AntDesign} from '@expo/vector-icons';
export default class ForgotPassword extends Component {
  render() {
    return (
      <KeyboardAvoidingView  behavior="padding" style={styles.container}>
         <View style={styles.headerView}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
          <AntDesign name="back" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.center}>
          <View style={styles.logoView}>
              <View style={styles.logo}>
                <Text style={styles.logoText} >LOGO</Text>
              </View>
              <TouchableOpacity  style={styles.signBtn}>
              <Text style={styles.LoginTitle}>Login</Text>
              </TouchableOpacity>
            </View>
        <TextInput
            placeholder="Email"
            style={styles.email}
            autoCapitalize="none"
          ></TextInput>
          
          <TouchableOpacity style={styles.send_btn}
           onPress={() => this.props.navigation.navigate("NewPassword")}>
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
    //marginTop: Constants.statusBarHeight,
  },
  headerView:{
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#DCD6D6",
  },
  center:{
    alignItems: 'center',
    marginTop: 100
  },
  logoView:{
    alignItems: 'center',
    marginTop: 100,
  },
  logo:{
    height: 100,
    backgroundColor: '#000',
    width: 100,
    borderRadius: 25,
    justifyContent: 'center'
  },
  logoText:{
    color: '#fff',
    textAlign: 'center'
  },
  signBtn:{
    marginTop: 10,
    marginBottom: 10
  },
  LoginTitle: {
    fontSize: 16,
    fontWeight: '900'
  },
  email:{
    height: 40,
    backgroundColor: "rgba(225, 229, 235,0.8)",
    paddingLeft: 10,
    marginBottom: 5,
    borderRadius: 23,
    width: 400
  },
  send_btn:{
    backgroundColor: '#fff',
    borderRadius: 18,
    overflow: 'hidden',
    height: 37,
    width: 125,
    color: '#000',
    marginTop: 5,
    marginBottom: 5,
    justifyContent:'center',
    alignSelf: 'center'
  },
  send_text:{
    fontSize: 18,
    fontWeight: '800',
    textAlign: "center",
    paddingVertical: 3,
  },
  // login_btn:{
  //   justifyContent: 'center',
  //   backgroundColor: '#fff',
  //   borderRadius: 18,
  //   overflow: 'hidden',
  //   height: 30,
  //   width: 125,
  //   color: '#000',
  //   marginBottom: 25
  // },
  // login_text: {
  //   fontSize: 18,
  //   fontWeight: '800',
  //   textAlign: "center",
  //   paddingVertical: 3,
  // },
  // email: {
  //   height: 40,
  //   backgroundColor: "rgba(225, 229, 235,0.8)",
  //   paddingLeft: 10,
  //   marginBottom: 5,
  //   borderRadius: 23,
  //   width: 400
  // },
  // logocontainer: {
  //   flexGrow: 1,
  //   alignItems: "center",
  //   justifyContent: "center",
  // },
  // logo: {
  //   width: 100,
  //   height: 100,
  // },
  // send_btn:{
  //   backgroundColor: '#fff',
  //   borderRadius: 18,
  //   overflow: 'hidden',
  //   height: 30,
  //   width: 125,
  //   color: '#000'
  // },
  // send_text: {
  //   fontSize: 18,
  //   fontWeight: '800',
  //   textAlign: "center",
  //   paddingVertical: 3,
  // },
  // citytech: {
  //   color: "rgba(90, 145, 109,0.8)",
  // },
  // buttontext: {
  //   paddingVertical: 50,
  // },
});