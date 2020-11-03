import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  KeyboardAvoidingView,
  Button,
  navigate,
} from "react-native";

export default class Majorevents extends Component {
  render() {
    return (
      <KeyboardAvoidingView Behavior="padding" style={styles.container}>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("MeventsAuth")}
        >
          <View style={styles.GoBackBttn}>
            <Button
              title="Go back"
              onPress={() => this.props.navigation.navigate("Home")}
            ></Button>
            <Text style={styles.about}> GSA events here</Text>
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
    fontSize: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  GoBackBttn: {
    textAlign: "right",
  },
});
