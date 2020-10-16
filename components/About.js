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

export default class About extends Component {
  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("AboutAuth")}
        >
          <Text style={styles.about}>
            The Guinean Students Association is a group of students who have the
            same goal
          </Text>
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
  about: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
