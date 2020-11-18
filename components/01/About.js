import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  KeyboardAvoidingView,
  Button
} from "react-native";

export default class About extends Component {
  render() {
    return (
      <KeyboardAvoidingView Behavior="padding" style={styles.container}>
        <TouchableOpacity>
          <View style={styles.GoBackBttn}>
            {/* <Button
              title="Go back"
              onPress={() => this.props.navigation.navigate("Home")}
            ></Button> */}
            <Text style={styles.about}>
              The Guinean Students Association is a group of students who have
              the same goal....
            </Text>
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
