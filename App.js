import "react-native-gesture-handler";
import React, {useState, useEffect} from "react";
import { StyleSheet, Alert } from "react-native";
import RootSreen from "./RootStack/RootStack";
import { NavigationContainer } from "@react-navigation/native";
import {ApolloClient, InMemoryCache, from, ApolloProvider, HttpLink, createHttpLink } from '@apollo/client';
import {onError} from '@apollo/client/link/error';
import AsyncStorage from '@react-native-community/async-storage'
import authContext from './authContext';
import { setContext } from '@apollo/client/link/context';


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
   new HttpLink({uri: "http://192.168.1.83:8080/graphql"}),
 
  
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
  const [account, setAccount] =  useState(null)
  const [userID, setUserID] =  useState();
  const [tok, seTok] =  useState('')
  client.cache.reset()

  useEffect(() =>{
  
    ( async () =>{
      const token = await AsyncStorage.getItem('@token_key')
      const userSet =  await AsyncStorage.getItem('@userSet')
      const id =  await AsyncStorage.getItem('@userID')
     seTok(token)
      if(token){
        setAuthanticated(true)
        setAccount(Boolean(userSet))
        setUserID(id)
      }else{
        setAuthanticated(false)
        setAccount(false)
      }
    })();
    

  }, []);


 

  return (
    <authContext.Provider value={{authnaticated, setAuthanticated,
     account, setAccount, userID, setUserID, tok}}>
      <ApolloProvider client={client}>
      <NavigationContainer>
        <RootSreen />
      </NavigationContainer>
      </ApolloProvider>
    </authContext.Provider>
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
