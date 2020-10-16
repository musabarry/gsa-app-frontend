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
import Login from "../components/Login";
import Signup from "../components/Signup";
import About from "../components/About";

const Home = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>GSA City Tech</Text>

      <View style={{}}>
        <TouchableOpacity onPress={() => props.navigation.navigate("Login")}>
          <Text style={styles.buttontext}>Login</Text>
        </TouchableOpacity>
      </View>

      <View>
        <TouchableOpacity onPress={() => props.navigation.navigate("Signup")}>
          <Text style={styles.buttontext}>Signup</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.logo}>
        <Image
          source={require("./images/logo.png")}
          style={{ width: 300, height: 300 }}
        />
      </View>
      <TouchableOpacity onPress={() => props.navigation.navigate("About")}>
        <Text style={styles.buttontext}>About</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
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
    flexDirection: "row",
  },
  logo: {
    marginLeft: 40,
    paddingVertical: 20,
  },
});

export default Home;
