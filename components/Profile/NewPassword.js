import React, { useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
  Platform,
  TouchableNativeFeedback,
  Keyboard
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
  const [matchPass, setMatchPass] = useState(false)
  const [emptyField, setEmptyField] = useState(false)
  const [matchMas, setMatchMasg] = useState()
  const [newError, setNewError] = useState('')
  const [emptyMsg, setEmptyMsg] = useState()
  const [pressSubmit, setPressSubmit] = useState(false)
  const [passStrength, setPassStrength] =  useState()
  const [passStrengthColor, setPassStrengthColor] = useState('#000')

  const onSubmit = () =>{
    setPressSubmit(true)
    if(matchPass && matchPassword === newPassword && currentPassword){
      setPressSubmit(false)
      updatePassword({
        variables:{
          email: `${props.email}`,
          currentPassword: `${currentPassword}`,
          newPassword: `${newPassword}`,
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
        // console.log(err);
        setNewError('Error: Password not saved')
      })
    }
  }


  const Passmatch = (pass, rePass) =>{
    if(rePass.length > 2){
      if(pass != rePass){
        setMatchPass(true)
        setMatchMasg("Password does not match")
      }else{
        setMatchPass(true)
        setMatchMasg('Match')
      }
    }else{
      setMatchPass(false)
      setMatchMasg()
    }
  }

  const fieldCheck = () =>{
    if(pressSubmit){
      if(!currentPassword || !newPassword || !matchPassword){
      setEmptyMsg('Some of the input are empty')
      setEmptyField(true)
      }else{
        setEmptyMsg('')
        setEmptyField(false)
      }
    }

  }

  const  StrengthChecker = (PasswordParameter) =>{
    let strongPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{10,20})')
    let mediumPassword = new RegExp('((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))')
  
    if(strongPassword.test(PasswordParameter)) {
        setPassStrength('Strong')
        setPassStrengthColor('#00f040')
    }if(mediumPassword.test(PasswordParameter) && !strongPassword.test(PasswordParameter)){
      setPassStrength('Meduim')
      setPassStrengthColor('#5a18ab')
    }
    if(!strongPassword.test(PasswordParameter) && !mediumPassword.test(PasswordParameter) && newPassword.length > 1){
        setPassStrength('Weak')
        setPassStrengthColor('#d40b0b')
    }
    setNewPassword(PasswordParameter)
  }

  useEffect(() =>{
    if(newPassword.length < 1){
      setPassStrength()
    }
    if(pressSubmit){
      setTimeout(() => { 
        setPressSubmit(false)
        setEmptyMsg('')
      }, 10000)
    }
    Passmatch(newPassword, matchPassword)
    fieldCheck()
  })

  if(loading){
    return(
      <Loading />
    )
  }
  return(
      <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}  > 

            <TouchableNativeFeedback  onPress={() => Keyboard.dismiss()}>
                <View style={styles.center} >
                {(emptyField === true) && 
            <View style={styles.errorView}>
              <Text style={styles.emptyError}>{emptyMsg}</Text>
              <Text>{newError}</Text>
             </View>}
                <TextInput
                placeholder="Current Password"
                autoFocus={true}
                value={currentPassword}
                style={styles.password}
                autoCapitalize="none"
                textContentType="password"
                secureTextEntry={true}
                returnKeyType='next'
                onChangeText={(text) => setCurrentPassword(text)}
                />
                 {passStrength && <View style={{alignSelf: 'flex-end', marginRight: 20}}>
                <Text style={{color: passStrengthColor, fontWeight: '800'}}>{passStrength}</Text>
                </View>}
                <TextInput
                placeholder="New Password"
                style={styles.password}
                value={newPassword}
                autoCapitalize="none"
                textContentType="password"
                secureTextEntry={true}
                returnKeyType='next'
                onChangeText={e => StrengthChecker(e)}
                />
              {matchMas && <View style={{alignSelf: 'flex-end', marginRight: 20}}>
                <Text style={{color: matchMas === 'Match' ? '#3b55ff' : '#ad0000', fontWeight: '800' }}>{matchMas}</Text>
              </View>}
                <TextInput
                placeholder="Reenter password"
                style={styles.password}
                value={matchPassword}
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
            </TouchableNativeFeedback>
      </KeyboardAvoidingView>
  )
}

export default ProfileImg;

const styles =  StyleSheet.create({
  container:{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%'
  },
  center:{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
   
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
    backgroundColor: "#f5f5f5",
    paddingLeft: 10,
    marginBottom: 5,
    borderRadius: 10,
    borderColor: "#CCC",
    borderWidth: 1,
    width: '98%',
    marginTop: 10,
    marginBottom: 10,
    justifyContent: 'center'
  },
  errorView:{
    marginTop: 10,
    marginBottom: 20,
    justifyContent: 'center'
  },
  emptyError:{
    color: '#ed0000',
    fontSize: 21,
    fontWeight: 'bold'
  },
  send_btn:{
    height: 50,
    backgroundColor: '#01294a',
    marginBottom: 5,
    borderRadius: 10,
    borderColor: "#CCC",
    borderWidth: 1,
    width: '95%',
    marginTop: 10,
    marginBottom: 10,
    justifyContent: 'center'
  },
  send_text:{
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: "center",
    color: "#fff"
  },
})