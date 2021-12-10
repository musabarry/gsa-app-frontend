import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput
} from "react-native";
import Constants from 'expo-constants';
import { AntDesign} from '@expo/vector-icons';
import FormStyles from "./Styles/FormStyles";
import logo from '../images/logo.png'
const  NewPassword = (props) => {
    const [confirPass, setConfirPass] = useState('');
    const [password, setPassword] = useState('')
    const [emptyMsg, setEmptyMsg] = useState()
    const [matchMas, setMatchMasg] = useState()
    const [passStrength, setPassStrength] =  useState()
    const [passStrengthColor, setPassStrengthColor] = useState('#000')
    const [matchPass, setMatchPass] = useState(false)
    const [pressSubmit, setPressSubmit] = useState(false)
    const [emptyField, setEmptyField] = useState(false)
    const Passmatch = (pass, rePass) =>{
      if(rePass.length > 2){
        if(pass != rePass){
          setMatchPass(true)
          setMatchMasg("Password does not match")
        }else{
          setMatchPass(false)
          setMatchMasg()
        }
      }else{
        setMatchPass(false)
        setMatchMasg()
      }
    }

    const fieldCheck = () =>{
      if(pressSubmit){
        if(!password || !confirPass){
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
      if(!strongPassword.test(PasswordParameter) && !mediumPassword.test(PasswordParameter) && password.length > 1){
          setPassStrength('Weak')
          setPassStrengthColor('#d40b0b')
      }
      setPassword(PasswordParameter)
    }


    useEffect(() =>{
      if(password.length < 1){
        setPassStrength()
      }
      if(pressSubmit){
        setTimeout(() => { 
          setPressSubmit(false)
          setEmptyMsg('')
        }, 10000)
      }
      Passmatch(password, confirPass)
      fieldCheck()

    })

    const onSubmit = async () =>{
      setPressSubmit(true)
      if(!matchPass &&   !(!password || !confirPass)){
        setPressSubmit(false)
      }
    }
    return (
      <KeyboardAvoidingView  behavior={Platform.OS === 'ios'? 'padding' : 'height'} 
      style={FormStyles.container}>
         <View style={FormStyles.headerView}>
          <TouchableOpacity onPress={() => props.navigation.goBack()} style={FormStyles.back_btn}>
          <Text style={FormStyles.back_text}>Back</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={FormStyles.login}>
          <View style={FormStyles.logoWraper}>
              <View style={FormStyles.logoView}>
                <Image source={logo} style={FormStyles.logo} />
              </View>
              <TouchableOpacity  style={FormStyles.logoTextView}
               onPress={() => props.navigation.navigate('Login')}>
                <Text style={FormStyles.logoText}>Login</Text>
              </TouchableOpacity>
          </View>
          <View  style={FormStyles.inputs}>
            {passStrength && 
              <View style={{alignSelf: 'flex-end', marginRight: 20}}>
              <Text style={{color: passStrengthColor, fontWeight: '800'}}>{passStrength}</Text>
              </View>
            }
            <TextInput
              placeholder="New Password"
              autoCapitalize="none"
              placeholder="New Password"
              secureTextEntry
              style={FormStyles.input}
              value={password}
              textContentType="password"
              onChangeText={e => StrengthChecker(e)}
              returnKeyType="next"
              textContentType="password"
              blurOnSubmit={true}
              />
              {matchMas && <View style={{alignSelf: 'flex-end', marginRight: 20}}>
              <Text style={{color: '#ad0000', fontWeight: '800'}}>{matchMas}</Text>
            </View>}
              <TextInput
              placeholder="Reenter password"
              autoCapitalize="none"
              placeholder="New Password"
              secureTextEntry
              style={FormStyles.input}
              value={confirPass}
              textContentType="password"
              onChangeText={e => setConfirPass(e)}
              returnKeyType="done"
              textContentType="password"
              blurOnSubmit={true}
              />
              <TouchableOpacity style={FormStyles.submitView} 
                onPress={onSubmit}>
                <Text style={FormStyles.submitText}>Submit</Text>
              </TouchableOpacity>
              {(emptyField === true) && 
              <View style={FormStyles.errorView}>
                <Text style={FormStyles.emptyError}>{emptyMsg}</Text>
              </View>}
            </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
}

export default NewPassword;