import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { ceil } from "react-native-reanimated";
import Login from "../components/Login";
import Signup from "../components/Signup";
import About from "../components/About";
import Majorevents from "./Majorevents";

const Home = (props) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.header}>GSA City Tech</Text>
      </View>

      <SafeAreaView style={styles.content}>
        <ScrollView>
          <View style={styles.loginview}>
            <TouchableOpacity
              onPress={() => props.navigation.navigate("Login")}
            >
              <Text style={styles.buttondata}>Login</Text>
            </TouchableOpacity>
          </View>

          <View>
            <TouchableOpacity
              onPress={() => props.navigation.navigate("Signup")}
            >
              <Text style={styles.buttondata}>Signup</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.logo}>
            <Image
              source={require("./images/logo.png")}
              style={{ width: 300, height: 300 }}
            />
          </View>
          <TouchableOpacity
            style={styles.btnView}
            onPress={() => props.navigation.navigate("About")}
          >
            <Text style={styles.buttontext}>About</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnView}
            onPress={() => props.navigation.navigate("MeventsAuth")}
          >
            <Text style={styles.buttontext}>Major Events</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
      <View style={styles.footer}>
        <View>
          <Text style={styles.foText}>Footer</Text>
        </View>
      </View>
    </View>
  );
};

const { height } = Dimensions.get("screen");
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  footer: {
    backgroundColor: "#DCD6D6",
    bottom: 0,
    position: "absolute",
    left: 0,
    right: 0,
    height: 70,
  },
  foText: {
    textAlign: "center",
  },
  header: {
    fontSize: 20,
    paddingVertical: 50,
    textAlign: "center",
    height: 50,
    backgroundColor: "#DCD6D6",
  },
  buttondata: {
    fontSize: 18,
    fontWeight: "500",
    color: "#313b33",
    textAlign: "center",
    paddingVertical: 3,
    color: "#3aa184",
  },
  loginview: {
    // paddingVertical: 10,
  },
  buttontext: {
    fontSize: 16,
    fontWeight: "500",
    color: "#ffffff",
    textAlign: "center",
  },
  btnView: {
    marginLeft: "auto",
    marginRight: "auto",
    width: 300,
    backgroundColor: "#738289",
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 13,
  },
  logo: {
    marginLeft: "auto",
    marginRight: "auto",
    paddingVertical: 80,
  },
});

export default Home;
