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

export default class ForgotPassword extends Component {
  render() {
    return (
      <KeyboardAvoidingView>
        <View>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("ForgotPassword")}
          >
            <Text style={styles.buttontext}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text>ffh</Text>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get("window").width,
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
  myform: {
    flex: 1,
  },
  citytech: {
    color: "rgba(90, 145, 109,0.8)",
  },
  buttontext: {
    paddingVertical: 50,
  },
});
