import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import Constants from 'expo-constants';
import { AntDesign} from '@expo/vector-icons';
export default class Signup extends Component {
  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        
        <View style={styles.headerView}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')}>
          <AntDesign name="back" size={24} color="black" />
          </TouchableOpacity>
        </View>
       
        <View style={styles.login}>
          <View style={styles.logoView}>
            <View style={styles.logo}>
              <Text style={styles.logoText} >LOGO</Text>
            </View>
            <TouchableOpacity  style={styles.signBtn}
            onPress={() => this.props.navigation.navigate('Login')}>
            <Text style={styles.LoginTitle}>Login</Text>
            </TouchableOpacity>
          </View>
          <View  style={styles.input}>
            <TextInput
              placeholder="Enter username"
              style={styles.username}
              autoCapitalize="none"
            ></TextInput>
            <TextInput
              placeholder="Password"
              secureTextEntry
              style={styles.username}
            ></TextInput>
            <TextInput
              placeholder="Re enter password"
              secureTextEntry
              style={styles.username}
            ></TextInput>
            <TouchableOpacity style={styles.LoginView} 
            onPress={() => this.props.navigation.navigate('auth')}>
              <Text style={styles.LoginButton}>Signup</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.forgotPassword} 
            onPress={() => this.props.navigation.navigate('ForgotPassword')}>
              <Text style={styles.LoginButton}>Forgot Password</Text>
            </TouchableOpacity>
          </View>
        </View>
        
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  headerView:{
    top: 0,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#DCD6D6",
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
  input:{
    marginTop: 20
  },
  login:{
    alignItems: 'center',
    marginTop: 100,

  //   margin: 100,
  //   marginHorizontal: 20,
  //  justifyContent: 'center',
  //  alignContent: 'center',
  //  height: 100
  },
  username: {
    height: 40,
    backgroundColor: "rgba(225, 229, 235,0.8)",
    paddingLeft: 10,
    marginBottom: 5,
    borderRadius: 23,
    width: 400
  },
  signBtn:{
    marginTop: 10,
    marginBottom: 10
  },
  LoginTitle: {
    fontSize: 16,
    fontWeight: '900'
  },
  LoginButton: {
    fontSize: 18,
    fontWeight: '800',
    textAlign: "center",
    paddingVertical: 3,
  },
  MemberLogin: {
    paddingVertical: 10,
  },
  LoginView: {
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
  ForgotPasswordView: {
    paddingVertical: 5,
  },
  ForgotPasswordBttn: {
    textAlign: "center",
  },
});

