import React, { Component } from "react";
// import React, { useState } from "react";
// import PropTypes from "Prop-types";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";

export default class Signup extends Component {
  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("SignupAuth")}
        >
          <View style={styles.headerStyle}>
            <Text style={styles.LoginTitle}>GSA City Tech Signup Form</Text>
          </View>
          <TextInput placeholder="Email" style={styles.username}></TextInput>
          <TextInput
            placeholder="Password"
            secureTextEntry
            style={styles.username}
          ></TextInput>
          <TextInput
            placeholder="Confirm password"
            secureTextEntry
            style={styles.username}
          ></TextInput>
          <View style={styles.LoginView}>
            <Text style={styles.SingupButton}>Signup</Text>
          </View>
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
  headerStyle: {
    fontSize: 16,
    paddingVertical: 15,
    borderRadius: 25,
  },
  SingupButton: {
    marginRight: "auto",
    marginLeft: "auto",
    fontSize: 16,
    fontWeight: "500",
    color: "#ffff",
    textAlign: "center",
    width: 300,
    backgroundColor: "#738289",
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 13,
  },
});
