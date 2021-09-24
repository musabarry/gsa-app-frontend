import React, { useState, useContext, useEffect } from "react";
import { StyleSheet,
  Text, View, TouchableOpacity,
  TextInput,KeyboardAvoidingView, Keyboard, ScrollView
} from "react-native";
import{useMutation} from '@apollo/client';
import {VERIFY, SENDCODE} from '../../GraphQl/mutation';
import { Alert } from "react-native";
import AsyncStorage from '@react-native-community/async-storage'
import checkContext  from '../../Context/checkContext';
import Loading from './loading';
import { color } from "react-native-reanimated";

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
          code: code
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
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        {/* <View style={styles.headerView}>
          <TouchableOpacity onPress={() => props.navigation.goBack()} style={styles.back_btn}>
            <Text style={styles.back_text}>Back</Text>
          </TouchableOpacity>
        </View> */}
        <View style={styles.verify}>
          <View  style={styles.input}>
             {msg?<View style={styles.msgView}> 
                 <Text style={styles.msgText}>{msg}</Text>
            </View>: <></>}
            <TextInput
              placeholder="Code"
              style={styles.codeInput}
              autoCapitalize="none"
              value={code}
              onChangeText={e => setCode(e)}
            ></TextInput>
            <TouchableOpacity style={styles.resendView} onPress={reSendCode}>
                <Text style={styles.resendText}>Resend verification  Code</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.verifyView} 
            onPress={onSubmit}>
              <Text style={styles.verifyBtn}>Confirm</Text>
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
  input:{
    marginTop: 20
  },
  verify:{
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center'
  },
  codeInput: {
    height: 70,
    borderWidth: 1,
    backgroundColor: "rgba(225, 229, 235,0.8)",
    paddingLeft: 10,
    marginBottom: 30,
    borderRadius: 23,
    width: 400,
    color: '#000',
    fontSize: 27,
    textAlign: 'center',
    alignItems: 'center',
    lineHeight: 30,
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
  verifyBtn: {
    fontSize: 22,
    fontWeight: '800',
    textAlign: "center",
    paddingVertical: 3,
    color: "#fff"
  },
  verifyView: {
    //backgroundColor: '#fff',
    backgroundColor: '#01294a',
    borderRadius: 18,
    overflow: 'hidden',
    height: 50,
    width: 300,
    color: '#000',
    marginTop: 5,
    marginBottom: 5,
    justifyContent:'center',
    alignSelf: 'center'
  },
  loading:{
    flex: 1,
    backgroundColor: '#c9d9f2',
    justifyContent: "center",
  },
  back_text:{
    fontSize: 18,
    fontWeight: '600',
    color: '#5cacf7'
  },
});

export default Verify

