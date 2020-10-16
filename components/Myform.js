import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";

export default class Register extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TextInput placeholder="Username" style={styles.input} />
        <TextInput
          placeholder="Password"
          secureTextEntry
          style={styles.input}
        />
        <TouchableOpacity style={styles.buttoncontainer}>
        <Text style={styles.buttontext}>Login</Text>
      </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    backgroundColor: "rgba(225, 229, 235,0.8)",
    paddingLeft: 10,
    marginBottom: 5,
    borderRadius: 23,
  },
  buttontext: {
    textAlign: "center",
    color: "rgba(89, 138, 72,0.8)",
    fontWeight: "bold",
    fontSize: 18,
  },
  forgotpassword: {
    textAlign: "center",
    color: "rgba(116, 122, 118,0.8)",
    fontSize: 18,
    paddingVertical: 3,
  },
  signup: {
    textAlign: "center",
    color: "rgba(7, 10, 8,0.8)",
    fontSize: 18,
    paddingVertical: 3,
  },
});
