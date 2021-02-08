import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Alert,
  FlatList
} from "react-native";
import Constants from 'expo-constants';

import authContext  from '../../authContext';
import AsyncStorage from '@react-native-community/async-storage';
import{useQuery, } from '@apollo/client';
import { USERINFO } from "../../GraphQl/query";
import Loading from '../01/loading'


const  Content = (props) =>  {

  const state = useContext(authContext);
  const {error, data, loading} =  useQuery(USERINFO)
  const [info, setInfo] = useState([]);
  const [userOut, setUserOut] = useState(false)

  const logout = async () =>{
    try {

      await AsyncStorage.multiRemove(['@token_key', '@userID', '@userSet'])
      
      .then(res =>{
        setUserOut(true)
        Alert.alert('Logout success');
        state.setAuthanticated(false)
        state.setAccount(false)
      })
    } catch (error) {
      console.log(error);
    }
  }
  
  // useEffect(() => {
  //   if(loading){
  //     setUserOut(true)
  //   }else{
  //     setUserOut(false)
  //   }
  //   // if(data){
  //   //   setInfo(data.userInfo[0])
  //   // }
  // }, [data]);

  

  if(loading){
    return(
      <Loading />
    )
  }else{
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>       
        <View style={styles.contentsView}>      
          <View style={styles.infoView}>
            <Text style={styles.name}>
            {data.userInfo[0] ? data.userInfo[0].role: ''} {data.userInfo[0] ? data.userInfo[0].lastname: ''}
            </Text>
            <View style={styles.content}>
              <Text style={styles.data}>{data.userInfo[0] ? data.userInfo[0].shool: ''}</Text>
            </View>
            <View style={styles.content}>
              <Text style={styles.data}>{data.userInfo[0] ? data.userInfo[0].major: ''}</Text>
            </View>
            <View style={styles.content}>
              <Text style={styles.data}>{data.userInfo[0] ? data.userInfo[0].role: ''}</Text>
            </View>
            <View>
              <Text style={styles.label}>Skills:</Text>
              <FlatList
              data={data.userInfo[0].skills}
              renderItem={({item}) => <Text style={styles.list}>{item}</Text>}
              keyExtractor={(item, index) => index.toString()}/>
            </View>
            <View>
              <Text style={styles.label}>Interest</Text>
              <FlatList
              data={data.userInfo[0] ? data.userInfo[0].interest: []}
              renderItem={({item}) => <Text style={styles.list}>{item}</Text>}
              keyExtractor={(item, index) => index.toString()}/>
            </View>
          </View>
          <View style={styles.passView}>
            <TouchableOpacity style={styles.btnPass} 
            onPress={() => props.navigation.navigate('unAuth')}>
              <Text style={styles.btnText}>Change Password </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.logoutView}>
            <TouchableOpacity style={styles.btnLoug} 
              onPress={logout} >
              <Text style={styles.lougout}>LOGOUT</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  label:{
    fontSize: 18,
    fontWeight: '800',
    marginRight: 25,
  },
  name:{
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    textTransform: 'capitalize'
  },
  content:{
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  data:{
    fontSize: 20,
    fontWeight: '500',
    textTransform: 'capitalize'
  },
  list:{
    fontSize: 17,
    fontWeight: '500',
    margin: 5,
    flexDirection: 'row',
    width: '100%'
  },
  content: {
    height: 40,
    marginBottom: 5,
    borderRadius: 23,
    width: 400,
    borderBottomWidth: 1,
    borderColor: "#d4e3fa",
      
  },
  contentsView:{
    height: '100%'
  },
  infoView:{
    padding: 15,
    backgroundColor: "#DCD6D6",
  },
  passView:{
    width: '100%',
    marginTop: 10
  },
  btnPass:{
    backgroundColor: '#DCD6D6',
    marginRight: 20,
    marginLeft: 20,
    height: 40,
    justifyContent: 'space-around',
    borderRadius: 15
  },
  btnText:{
    fontSize: 20,
    fontWeight: '700',
    paddingLeft: 5
  },

  logoutView:{
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    height: 50,
    bottom: 0,
    backgroundColor: '#DCD6D6'
  },
  lougout:{
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '700'
  }
});

export default Content;