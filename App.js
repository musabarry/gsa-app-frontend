import "react-native-gesture-handler";
import React, {useState, createContext, useEffect} from "react";
import { StyleSheet, Text, View, Platform } from "react-native";
import RootSreen from "./RootStack/RootStack";
import { NavigationContainer } from "@react-navigation/native";
import {ApolloClient, InMemoryCache, from, ApolloProvider, HttpLink } from '@apollo/client';
import {onError} from '@apollo/client/link/error';
import { Alert } from "react-native";
import AsyncStorage from '@react-native-community/async-storage'

export const StateContext = createContext()
const errorLink = onError(({graphqlErrors, networkError}) =>{
  if(graphqlErrors){
    graphqlErrors.map(({message, location, path}) =>{
      Alert(`Graphql error ${message}`)
    })
  }
})
//127.0.0.1
const link = from([
  errorLink,
  new HttpLink({uri: "http://192.168.1.83:8080/graphql"}),
])

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link:  link
});
const App = ({ navigation }) => {

  const [login_status, set_login_status] =  useState(false)

  useEffect(() =>{
    
    const token = await AsyncStorage.getItem('@token_key')
    if(token){
      set_login_status(true)
    }else{
      set_login_status(false)
    }
  }, []);


  return (
    <StateContext.Provider value={[login_status]}>
    <ApolloProvider client={client}>
    <NavigationContainer>
      <RootSreen />
    </NavigationContainer>
    </ApolloProvider>
    </StateContext.Provider>
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
