import "react-native-gesture-handler";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import RootSreen from "./RootStack/RootStack";
import { NavigationContainer } from "@react-navigation/native";

const App = ({ navigation }) => {
  return (
    <NavigationContainer>
      <RootSreen />
      {/* <View>
        <Text>Hello</Text>
      </View> */}
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
