import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput
} from "react-native";
import Constants from 'expo-constants';
import { EvilIcons} from '@expo/vector-icons';
import {UPDATEPASSWORD} from '../../GraphQl/mutation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import{useMutation} from '@apollo/client';
import checkContext  from '../../Context/checkContext';
import Loading from '../BeforeLogin/loading';
const ProfileImg =(props) => {
  
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [matchPassword, setMatchPassword] =  useState('')
  const [updatePassword, {error, loading}] =  useMutation(UPDATEPASSWORD)
  const state = useContext(checkContext);
  const [newError, setNewError] = useState('')
  const onSubmit = () =>{
    if(matchPassword === newPassword){
      updatePassword({
        variables:{
          email: props.email,
          currentPassword: currentPassword,
          newPassword: newPassword,
        }
      }).then(async (res) =>{
        if(res.data.updatePassword.success){
          setNewError('')
          await AsyncStorage.setItem('@token_key', res.data.updatePassword.token)
          await AsyncStorage.setItem('@userID', res.data.updatePassword._id)
          state.setAuthanticated(true)
          props.setModalVisible(false)
        }
      }).catch(err =>{
        setNewError('Error: Password not saved')
      })
    }
  }

  if(loading){
    return(
      <Loading />
    )
  }
  return(
      <KeyboardAvoidingView style={styles.container} behavior="padding"  > 
          <View>
            <View>
               <Text>{newError}</Text>
            </View>
            <View style={styles.center}>
                <TextInput
                placeholder="Current Password"
                autoFocus={true}
                style={styles.password}
                autoCapitalize="none"
                textContentType="password"
                secureTextEntry={true}
                returnKeyType='next'
                onChangeText={(text) => setCurrentPassword(text)}
                />
                <TextInput
                placeholder="New Password"
                style={styles.password}
                autoCapitalize="none"
                textContentType="password"
                secureTextEntry={true}
                returnKeyType='next'
                onChangeText={(text) => setNewPassword(text)}
                />
                <TextInput
                placeholder="Reenter password"
                style={styles.password}
                autoCapitalize="none"
                textContentType="password"
                secureTextEntry={true}
                returnKeyType='done'
                onChangeText={(text) => setMatchPassword(text)}
                />
                <Text>{props.email}</Text>
                <TouchableOpacity style={styles.send_btn}
                onPress={() => onSubmit()}>
                    <Text style={styles.send_text}>Submit</Text>
                </TouchableOpacity>
            </View>
          </View>
      </KeyboardAvoidingView>
  )
}

export default ProfileImg;

const styles =  StyleSheet.create({
  
  center:{
    alignItems: 'center',
    marginTop: 210,
  },
  signBtn:{
    marginTop: 10,
    marginBottom: 10
  },
  LoginTitle: {
    fontSize: 16,
    fontWeight: '900'
  },
  password:{
    height: 50,
    backgroundColor: "rgba(225, 229, 235,0.8)",
    borderWidth: 1,
    borderColor: '#1c0f0e',
    paddingLeft: 10,
    marginBottom: 5,
    borderRadius: 23,
    width: 400,
    marginTop: 10,
    marginBottom: 10,
    color: '#000',
    fontSize: 15,
    fontWeight: '500'
  },
  send_btn:{
    backgroundColor: '#1c0f0e',
    borderRadius: 18,
    overflow: 'hidden',
    height: 37,
    width: 125,
    marginTop: 5,
    marginBottom: 5,
    justifyContent:'center',
    alignSelf: 'center',
    marginTop: 20
  },
  send_text:{
    fontSize: 18,
    color: '#f7f7f7',
    fontWeight: '800',
    textAlign: "center",
    paddingVertical: 3,
  },
})