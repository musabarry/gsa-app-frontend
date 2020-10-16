import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";

export default class Login extends Component {
  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("LoginAuth")}
        >
          <View style={styles.MemberLogin}>
            <Text style={styles.LoginTitle}>Member Login</Text>
          </View>
          <TextInput
            placeholder="Enter username"
            style={styles.username}
          ></TextInput>
          <TextInput
            placeholder="Password"
            secureTextEntry
            style={styles.username}
          ></TextInput>
          <View style={styles.LoginView}>
            <Text style={styles.LoginButton}>Login!!</Text>
          </View>
          {/* <View style={styles.ForgotPasswordView}>
            <Text style={styles.ForgotPasswordBttn}>Forgot Password</Text>
          </View> */}
        </TouchableOpacity>
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
    textAlign: "center",
  },
  LoginButton: {
    textAlign: "center",
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
