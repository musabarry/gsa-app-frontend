import "react-native-gesture-handler";
import React, {useState, useEffect} from "react";
import { StyleSheet, SafeAreaView, StatusBar } from "react-native";
import RootSreen from "./RootStack/RootStack";
import { NavigationContainer } from "@react-navigation/native";
import {ApolloClient, InMemoryCache, from, ApolloProvider, HttpLink } from '@apollo/client';
import {onError} from '@apollo/client/link/error';
import AsyncStorage from '@react-native-community/async-storage'
import checkContext from './Context/checkContext';
import { setContext } from '@apollo/client/link/context';
import { ThemeProvider } from 'react-native-elements';
const errorLink = onError(({graphqlErrors, networkError}) =>{
  if(graphqlErrors){
    graphqlErrors.map(({message, location, path}) =>
      console.log('Path ',{path}, 'Location ', {location}, `Graphql error ${message}`)
      // console.log('Location ', {location});
      // console.log(`Graphql error ${message}`)
    )
    if(networkError) console.log(`Network Error: ${networkError}`);
  }
})

const link = from([
  errorLink,
   new HttpLink({uri: "http://10.204.122.81:8080/graphql"}), //server(api) link
])




//(GraphqL)  setup header information
const authLink = setContext(async (_, { headers }) => {
  const token =await  AsyncStorage.getItem('@token_key')

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
  client.cache.reset()
  useEffect(() =>{
    ( async () =>{
      const token = await AsyncStorage.getItem('@token_key')
      const id =  await AsyncStorage.getItem('@userID')
      if(token){
        setAuthanticated(true)
        setUserID(id)
        console.log(typeof userID);
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