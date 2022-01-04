import "react-native-gesture-handler";
import React, {useState, useEffect} from "react";
import { StyleSheet, SafeAreaView, StatusBar, Platform } from "react-native";
import RootSreen from "./RootStack/RootStack";
import { NavigationContainer } from "@react-navigation/native";
import {ApolloClient, InMemoryCache, from, ApolloProvider, HttpLink } from '@apollo/client';
import {onError} from '@apollo/client/link/error';
import AsyncStorage from '@react-native-async-storage/async-storage';
import checkContext from './Context/checkContext';
import { setContext } from '@apollo/client/link/context';
import { ThemeProvider } from 'react-native-elements';

const errorLink = onError(({graphqlErrors, networkError}) =>{
  if(graphqlErrors){
    graphqlErrors.map(({message, location, path}) =>
    console.log(
      " [GraphQL error]: Message", message, ", Location: ", locations, ", Path: ", path)
      // console.log('Path ',{path}, 'Location ', {location}, `Graphql error ${message}`),
      // console.log('Location ', {location}),
      // console.log(`Graphql error ${message}`)
    
    )
    //if(networkError)  console.log(" [Network error]:", networkError);
  }
})

//10.15.85.21
const link = from([//172.20.10.4   //10.15.85.21
  errorLink,
   new HttpLink({uri: "https://gsabackend.herokuapp.com/graphql"}), //server(api) link
])
//https://gsabackend.herokuapp.com/graphql
//http://192.168.1.32:8080/graphql s=home
//http://10.15.85.21:8080/graphql library

//(GraphqL)  setup header information
const authLink = setContext(async (_, { headers }) => {
  const token =await  AsyncStorage.getItem('@token_key');
  return {
    headers: {
      ...headers,
      authorization: token ? token : ''
    }
  }
});

//(GraphqL)
const client = new ApolloClient({
  link:     authLink.concat(link),
  cache: new InMemoryCache()
  
});

const App = ({ navigation }) => {
  const [authnaticated, setAuthanticated] = useState(false)
  const [userID, setUserID] =  useState();
  const [verifyUser, setVerifyUser] = useState(false)
  
  client.cache.reset()
  // client.cache.modify({
  //   notifications(list, { readField }) {
  //     return list.filter(n => readField("id", n) !== id);
  //   },
  // });
  useEffect(() =>{
    
    ( async () =>{
      
      const token = await AsyncStorage.getItem('@token_key')
      const id =  await AsyncStorage.getItem('@userID')

      if(token){
        setAuthanticated(true)
        setVerifyUser(false)
        setUserID(id)
      }else if(id && !token){
        setVerifyUser(true)
        setUserID(id)
      }else{
        setAuthanticated(false)
        setVerifyUser(false)
        setUserID()
      }
    })();
  }, []);


  return (
    <ThemeProvider>
      <StatusBar 
      animated={true}
      backgroundColor="#ededed"
      barStyle="dark-content" />
      <SafeAreaView style={{ flex: 1, backgroundColor: '#ededed'}}>
        <checkContext.Provider value={{authnaticated, verifyUser,
          setVerifyUser, setAuthanticated, userID, setUserID}}>
          <ApolloProvider client={client}>
          <NavigationContainer>
            <RootSreen />
          </NavigationContainer>
          </ApolloProvider>
        </checkContext.Provider>
      </SafeAreaView>
    </ThemeProvider>
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