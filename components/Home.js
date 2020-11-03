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
import { Ionicons, Entypo} from '@expo/vector-icons';
import Constants from 'expo-constants';
const Home = (props) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerView}>
        <View style={styles.logoView}>
          <Text>LOGO</Text>
        </View>
        <View style={styles.logView}>
          <TouchableOpacity style={styles.login_btn} onPress={() => props.navigation.navigate("Login")}>
            <Text style={styles.login_text}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.signup_btn} onPress={() => props.navigation.navigate("Signup")}>
            <Text style={styles.signup_text}>create an account</Text>
          </TouchableOpacity>
        </View>     
      </View>
        <ScrollView style={styles.scrollView}>
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
  
      <View style={styles.footer}>
        <View>
          <Text style={styles.foText}>Contacts</Text>
        </View>
        <View style={styles.iconFooter}>
          <Entypo style={styles.icon} name="facebook" size={24} color="black" />
          <Entypo style={styles.icon} name="instagram" size={24} color="black" />
          <Entypo style={styles.icon} name="twitter" size={24} color="black" />
        </View>
      </View>
    </SafeAreaView>
  );
};

const { height } = Dimensions.get("screen");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  scrollView:{
    marginHorizontal: 20
  },
  footer: {
    backgroundColor: "#DCD6D6",
    bottom: 0,
    position: 'absolute',
    left: 0,
    right: 0,
    height: 70,
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    flexDirection: 'row',
    borderTopWidth: 1,
    paddingTop: 15
  },
  foText:{
    marginLeft: 10
  },
  iconFooter:{
    flexWrap: 'wrap',
    flexDirection: 'row', 
    paddingRight: 10,
  },
  login_btn:{
    backgroundColor: '#fff',
    borderRadius: 18,
    overflow: 'hidden',
    height: 30,
    width: 125,
    color: '#000'
  },
  signup_btn:{
    padding: 5
  },
  icon:{
   marginRight: 10
  },
  headerView:{
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#DCD6D6",
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'baseline'
  },
  
  logView:{
    flexWrap: 'wrap',
    flexDirection: 'column', 
    paddingRight: 10,
  },
  header: {
    fontSize: 20,
    paddingVertical: 50,
    textAlign: "center",
    height: 50,
    backgroundColor: "#DCD6D6",
  },
  login_text: {
    fontSize: 18,
    fontWeight: '800',
    textAlign: "center",
    paddingVertical: 3,
  },
  signup_text:{
    fontWeight: '700',
    fontSize: 18,
    textTransform: 'capitalize'
  },
  logoView:{
    marginLeft: 15
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
    backgroundColor: "#DCD6D6",

    shadowOffset:{
      width: 1,
      height: 4
    },
    shadowOpacity: 0.5,
    shadowRadius:  1,
    shadowColor: "#917e7e",
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
