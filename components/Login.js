import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  KeyboardAvoidingView,
  Button
} from "react-native";
import { TextInput } from "react-native-gesture-handler";

export default class Login extends Component {
  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
    
        <View>
          <View style={styles.logoView}>
            <Text style={styles.LoginTitle}>Signup</Text>
          </View>
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
          <TouchableOpacity style={styles.LoginView} 
          onPress={() => this.props.navigation.navigate('LoginAuth')}>
            <Text style={styles.LoginButton}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.forgotPassword} 
          onPress={() => this.props.navigation.navigate('ForgotPassword')}>
            <Text style={styles.LoginButton}>Forgot Password</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 100,
    width: Dimensions.get("window").width,
  },
  username: {
    height: 40,
    backgroundColor: "rgba(225, 229, 235,0.8)",
    paddingLeft: 10,
    marginBottom: 5,
    borderRadius: 23,
  },

  LoginTitle: {
    fontSize: 16,
    textAlign: "center",
    width: 200,
    color: "#ffff",
    paddingVertical: 13,
    backgroundColor: "#738289",
    borderRadius: 50,
    marginVertical: 10,
    marginLeft: "auto",
    marginRight: "auto",
  },
  LoginButton: {
    textAlign: "center",
    fontSize: 14,
    backgroundColor: "#dce6e0",
    width: 150,
    marginRight: "auto",
    marginLeft: "auto",
    paddingVertical: 5,
  },
  MemberLogin: {
    paddingVertical: 10,
  },
  LoginView: {
    paddingVertical: 10,
    borderBottomEndRadius: 40,
  },
  ForgotPasswordView: {
    paddingVertical: 5,
  },
  ForgotPasswordBttn: {
    textAlign: "center",
  },
});
