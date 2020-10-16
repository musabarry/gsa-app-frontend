import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import RootSreen from "./RootStack/RootStack";
import { NavigationContainer } from "@react-navigation/native";
import Login from "./components/Login";
import Signup from "./components/Signup";

const App = ({ navigation }) => {
  return (
    <NavigationContainer>
      <RootSreen />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
export default App;
