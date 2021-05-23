import "react-native-gesture-handler";
import React, {useState, useEffect} from "react";
import { StyleSheet, Alert, SafeAreaView, StatusBar } from "react-native";
import RootSreen from "./RootStack/RootStack";
import { NavigationContainer } from "@react-navigation/native";
import {ApolloClient, InMemoryCache, from, ApolloProvider, HttpLink, createHttpLink } from '@apollo/client';
import {onError} from '@apollo/client/link/error';
import AsyncStorage from '@react-native-community/async-storage'
import checkContext from './Context/checkContext';
import { setContext } from '@apollo/client/link/context';
import { ThemeProvider } from 'react-native-elements';
const errorLink = onError(({graphqlErrors, networkError}) =>{
  if(graphqlErrors){
    graphqlErrors.map(({message, location, path}) =>{
      console.log('Path ',{path});
      console.log('Location ', {location});
      console.log(`Graphql error ${message}`)
      console.log(`Network Error: ${networkError}`);
    })
  }
})

const link = from([
  errorLink,
   new HttpLink({uri: "http://192.168.1.33:8080/graphql"}),
])

// const httpLink = createHttpLink({
//   uri: 'http://192.168.1.83:8080/graphql',
// });

const authLink = setContext(async (_, { headers }) => {
  const token =await  AsyncStorage.getItem('@token_key')
  return {
    headers: {
      ...headers,
      authorization: token ? token : ''
    }
  }
});

const client = new ApolloClient({
  link:     authLink.concat(link),
  cache: new InMemoryCache()
  
});

const App = ({ navigation }) => {
  const [authnaticated, setAuthanticated] = useState(false)
  const [userID, setUserID] =  useState();
  client.cache.reset()
  useEffect(() =>{
    ( async () =>{
      const token = await AsyncStorage.getItem('@token_key')
      const id =  await AsyncStorage.getItem('@userID')
      if(token){
        setAuthanticated(true)
        setUserID(id)
      }else{
        setAuthanticated(false)
      }
    })();
  }, []);

  return (
    <ThemeProvider>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{ flex: 1 }}>
        <checkContext.Provider value={{authnaticated, setAuthanticated, userID, setUserID}}>
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