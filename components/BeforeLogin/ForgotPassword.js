import React, { useState, useContext, useEffect } from "react";
import {
  Keyboard,
  Text,
  View,
  Image,
  TouchableNativeFeedback,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput, Platform, StyleSheet
} from "react-native";
import Constants from 'expo-constants';
import { AntDesign} from '@expo/vector-icons';
import FormStyles from "./Styles/FormStyles";
import logo from '../images/logo.png';
import {VERIFY, SENDCODE} from '../../GraphQl/mutation';
import{useMutation} from '@apollo/client';
import checkContext  from '../../Context/checkContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
const  ForgotPassword = (props) => {
  const navigation = useNavigation();
  const state = useContext(checkContext);
  const [sendCode, {error: codeError,   loading: codeLoad}] = useMutation(SENDCODE);
  const [verifyUser, {error: verifyError,   loading: verifyLoad}] = useMutation(VERIFY);
  const [userID, setUserID] =  useState('')
  const [respStatus, setResStatus] = useState(false)
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const [code, setCode] = useState('')

  const reSendCode = async (props) =>{
    if(email){
        sendCode({
            variables:{
              user: email,
            }
        }).then(async (res) =>{
            if(res.data.sendCode.success){
              setUserID(res.data.sendCode._id)
              setResStatus(res.data.sendCode.success)
            }
            setMsg('check your email')
        }).catch(error =>{
            setMsg('Error sending the code')
        })
    }else{
      setMsg("Email input is empty")
    }
  }



  const onVerify = async () =>{
    setEmail('')
    if(!userID){
      setResStatus(false)
    }if(!code){
      setMsg("Code is empty")
    }else{
        verifyUser({
        variables:{
          user: userID,
          code: code,
          verifyType: 'reset'
        }
      }).then( async (res) =>{
        if(res.data.verifyUser.success){
            setMsg('Account confirmed')
            await AsyncStorage.setItem('@userID', res.data.verifyUser._id)
            await AsyncStorage.setItem('@email', res.data.verifyUser.email)
            state.setVerifyUser(true)
            return navigation.navigate('verify',{
              screen: 'newPassword'
            })
        }
      }).catch(error =>{
        console.log(error);
        setMsg('Code does not match')
      })
    }
  }

  useEffect(() =>{
    if(msg){
      setTimeout(() => {setMsg('')}, 5000)
    }
  }, [respStatus])

    return (
      <KeyboardAvoidingView  behavior={Platform.OS === 'ios'? 'padding' : 'height'} 
      style={FormStyles.container}>
         <View style={FormStyles.headerView}>
          <TouchableOpacity onPress={() => props.navigation.navigate('Login')} style={FormStyles.back_btn}>
          <Text style={FormStyles.back_text}>Back</Text>
          </TouchableOpacity>
        </View>
        <TouchableNativeFeedback onPress={() => Keyboard.dismiss()}>
          
          <View style={FormStyles.forgotPage} >
            <View style={FormStyles.logoWraper}>
                <View style={FormStyles.logoView}>
                  <Image source={logo} style={FormStyles.logo} />
                </View>
                <TouchableOpacity  style={FormStyles.logoTextView}
                onPress={() => props.navigation.navigate('Login')}>
                  <Text style={FormStyles.logoText}>Login</Text>
                </TouchableOpacity>
            </View>
             
                <View style={styles.msgView}> 
                  <Text style={styles.msgText}>{msg}</Text>
                </View>
                {respStatus ?
                <TextInput
                placeholder="Code"
                style={FormStyles.input}
                autoCapitalize="none"
                value={code}
                onChangeText={e => setCode(e)}
                returnKeyType="send"
              />:
              <TextInput
                  placeholder="Email"
                  style={FormStyles.input}
                  autoCapitalize="none"
                  value={email}
                  onChangeText={e => setEmail(e)}
                  keyboardType="email-address"
                  textContentType="emailAddress"
                  returnKeyType="send"
                />}
              {respStatus ?
              <TouchableOpacity style={FormStyles.submitView}
                onPress={() => onVerify()}>
                <Text style={FormStyles.submitText}>Verify</Text>
              </TouchableOpacity>:
              <TouchableOpacity style={FormStyles.submitView}
                onPress={() => reSendCode()}>
                <Text style={FormStyles.submitText}>Send</Text>
              </TouchableOpacity>}
          </View>
          
        </TouchableNativeFeedback>
      </KeyboardAvoidingView>
    );
}
export default ForgotPassword
const styles = StyleSheet.create({
  msgView:{
    alignItems:'center',
    justifyContent:'center',
    marginBottom: 20
  },
  msgText:{
    fontSize: 15,
    fontWeight: '800',
    color: '#ab0300'
  },
});