import React, { useState, useContext, useEffect } from "react";
import { StyleSheet,
  Text, View, TouchableOpacity,
  TextInput,KeyboardAvoidingView, Keyboard, Platform, TouchableNativeFeedback
} from "react-native";
import{useMutation} from '@apollo/client';
import {VERIFY, SENDCODE} from '../../GraphQl/mutation';
import { Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import checkContext  from '../../Context/checkContext';
import Loading from './loading';
import FormStyles from "./Styles/FormStyles";
const Verify =(props) => {

  const [code, setCode] =  useState('');
  const [msg, setMsg] =  useState('')
  const [sendCode, {error: sendError,   loading: sendLoad}] = useMutation(SENDCODE)
  const [verifyUser, {error: veriError, loading: veriLoad}] =  useMutation(VERIFY)
  
  const state = useContext(checkContext);
  
const reSendCode = async () =>{
    const userID =   await AsyncStorage.getItem("@userID")
    if(userID){
        sendCode({
            variables:{
              user: userID,
            }
        }).then(res =>{
            setMsg('check your email')
        }).catch(error =>{
            setMsg('Error sending the code')
        })
    }
}

  const onSubmit = async () =>{
    const userID =   await AsyncStorage.getItem("@userID")
    if(!userID || !code){
      Alert.alert("Code is empty")
    }else{
        verifyUser({
        variables:{
          user: userID,
          code: code,
          verifyType: 'verify'
        }
      }).then( async (res) =>{
        if(res.data.verifyUser.success){
            setMsg('Account confirmed')
            await AsyncStorage.setItem('@token_key', res.data.verifyUser.token)
            await AsyncStorage.setItem('@userID', res.data.verifyUser._id)
            state.setAuthanticated(true)
        }
      }).catch(error =>{
        setMsg('Code does not match')
      })
    }
  }


  const goBack = async ()=>{
    await AsyncStorage.removeItem('@userID')
    state.setVerifyUser(false)
  }
  useEffect(() =>{
      if(msg){
        setTimeout(() => {setMsg('')}, 5000)
      }
  })
  if(veriLoad || sendLoad){
    return(
      <Loading />
    )
  }else{
    return (
      <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios'? 'padding' : 'height'} 
       behavior="padding" style={styles.container}>
        <View style={styles.headerView}>
          <TouchableOpacity onPress={() => goBack()} style={styles.back_btn}>
            <Text style={styles.back_text}>Back</Text>
          </TouchableOpacity>
        </View>
        {/* <View style={styles.verify}> */}
        <TouchableNativeFeedback onPress={() => Keyboard.dismiss()} style={{backgroundColor:'red'}}>
          <View  style={styles.verify}>
             {msg?<View style={styles.msgView}> 
                 <Text style={styles.msgText}>{msg}</Text>
            </View>: <></>}
            <TextInput
              placeholder="Code"
              style={FormStyles.input}
              autoCapitalize="none"
              value={code}
              onChangeText={e => setCode(e)}
              returnKeyType="send"
            />
            <TouchableOpacity style={styles.resendView} onPress={reSendCode}>
                <Text style={styles.resendText}>Resend verification  Code</Text>
            </TouchableOpacity>
            <TouchableOpacity style={FormStyles.submitView} 
            onPress={onSubmit}>
              <Text style={FormStyles.submitText}>Confirm</Text>
            </TouchableOpacity>
          </View>
          </TouchableNativeFeedback>
        {/* </View> */}
      </KeyboardAvoidingView>
    );
  }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerView:{
    top: 0,
    paddingLeft: 10
  },
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
  verify:{
    display: 'flex',
    flexDirection: 'column',
    alignItems:'center',
    justifyContent:'center',
    height: '100%'
  },
  resendView:{
    textAlign: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  resendText:{
      fontSize: 15,
      fontWeight: '800',
      color: '#006328'
  },
  back_text:{
    fontSize: 18,
    fontWeight: '600',
    color: '#5cacf7'
  },
});

export default Verify

