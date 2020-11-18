import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  KeyboardAvoidingView,
  Button,
} from "react-native";

export default class Profile extends Component {
  render() {
    return (
      <KeyboardAvoidingView Behavior="padding" style={styles.container}>
        <TouchableOpacity>
          <View style={styles.GoBackBttn}>
            <Button
              title="Go back"
              onPress={() => this.props.navigation.navigate("Login")}
            ></Button>
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
  about: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  GoBackBttn: {
    textAlign: "right",
  },
});
