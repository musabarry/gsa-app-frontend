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
export default class NewPassword extends Component {
  render() {
    return (
      <KeyboardAvoidingView  behavior="padding" style={styles.container}>
         {/* <View style={styles.headerView}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
          <AntDesign name="back" size={24} color="black" />
          </TouchableOpacity>
        </View> */}
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
            placeholder="New Password"
            style={styles.email}
            autoCapitalize="none"
            />
            <TextInput
            placeholder="Reenter password"
            style={styles.email}
            autoCapitalize="none"
            />
          
          <TouchableOpacity style={styles.send_btn}
           onPress={() => this.props.navigation.navigate("auth")}>
            <Text style={styles.send_text}>Submit</Text>
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
  },
//   headerView:{
//     paddingTop: 10,
//     paddingBottom: 10,
//     backgroundColor: "#DCD6D6",
//   },
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
});