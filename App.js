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
import {socket} from './socket'
// import * as Notifications from 'expo-notifications';
// import * as Permissions from 'expo-permissions'
const errorLink = onError(({graphqlErrors, networkError}) =>{
  if(graphqlErrors){
    graphqlErrors.map(({message, location, path}) =>
    console.log(
      " [GraphQL error]: Message", message, ", Location: ", locations, ", Path: ", path)
      // console.log('Path ',{path}, 'Location ', {location}, `Graphql error ${message}`),
      // console.log('Location ', {location}),
      // console.log(`Graphql error ${message}`)
    
    )
  }
})

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


  const storeData = async (data, room) =>{
       
    let oldData =  await AsyncStorage.getItem(`@${room}`)
    oldData =  JSON.parse(oldData)
    if(oldData){
        let addMsg = [...oldData, data]
        await AsyncStorage.setItem(`@${room}`, JSON.stringify(addMsg))
    }else{
        let addMsg = [data]
        await AsyncStorage.setItem(`@${room}`, JSON.stringify(addMsg))
    }
    
}

  useEffect(() =>{
    ( async () =>{
      //await AsyncStorage.removeItem('@userID')
      const token = await AsyncStorage.getItem('@token_key')
      const id =  await AsyncStorage.getItem('@userID')
      const school = await AsyncStorage.getItem('@school')
     // await AsyncStorage.removeItem(`@${school}`)
      //console.log(await AsyncStorage.removeItem('@City'));
      if(token){
        setAuthanticated(true)
        setVerifyUser(false)
        setUserID(id)
        socket.auth = {token: token, school: school}
        socket.connect(userID);
      }else if(id && !token){
        setVerifyUser(true)
        setUserID(id)
        socket.disconnect(id)
      }else{
        setAuthanticated(false)
        setVerifyUser(false)
        setUserID()
        socket.disconnect(id)
        socket.auth = null
      }
      
      socket.on('GSA', payload =>{

      })

      socket.on(school, payload =>{
      })
    })();
  }, []);


  return (
    <ThemeProvider>
      <StatusBar 
      animated={true}
      backgroundColor='#ededed'
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