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
import { ceil } from "react-native-reanimated";

const Profile = (props) => {
  return (
    <View style={styles.container}>
      {/* <Text style={styles.headText}>Profile</Text>
      <View>
        <TouchableOpacity
          onPress={() => props.navigation.navigate("ProfileAuth")}
        >
          <Text style={styles.buttontext}>Login</Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headText: {
    fontSize: 20,
    paddingVertical: 50,
    textAlign: "center",
  },
  buttontext: {
    textAlign: "center",
    color: "rgba(89, 138, 72,0.8)",
    fontWeight: "bold",
    fontSize: 18,
    backgroundColor: "#940",
  },
});

export default Profile;
