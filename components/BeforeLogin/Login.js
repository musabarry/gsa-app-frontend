import React, { useState, useContext } from "react";
import { FormStylesheet,
  Text, View, TouchableOpacity,
  TextInput,KeyboardAvoidingView, SafeAreaView, ScrollView, Image
} from "react-native";
import logo from '../images/logo.png'
import{useMutation} from '@apollo/client';
import {LOGIN} from '../../GraphQl/mutation';
import { Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import checkContext  from '../../Context/checkContext';
import Loading from './loading';
import FormStyles from "./Styles/FormStyles";
const Login =(props) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] =  useState('');
  const [hidePass, setHidePass] = useState(true)
  const [errors, setErrors] =  useState('')
  const [login, {error, loading}] =  useMutation(LOGIN)

  const state = useContext(checkContext);
  
  const onSubmit = async () =>{
    if(!email || !password){
      Alert.alert("Email or password is empty")
    }else{
       login({
        variables:{
          email: email,
          password: password
        }
      }).then( async (res) =>{
       
        if(!res.data.login.success){
          Alert.alert('Confirm your email addreed. code sent to your email address')
          await AsyncStorage.setItem('@userID', res.data.login._id)
          state.setVerifyUser(true)
        }
        if(res.data.login.success){
          await AsyncStorage.setItem('@token_key', res.data.login.token)
          await AsyncStorage.setItem('@userID', res.data.login._id)
          state.setAuthanticated(true)
        }
      }).catch(error =>{
        //console.log(error);
        Alert.alert('Password wrong')
      })
    }
  }

  if(loading){
    return(
      <Loading />
    )
  }else{
    return (
      <SafeAreaView style={FormStyles.container}>
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
            onPress={() => props.navigation.navigate('Signup')}>
              <Text style={FormStyles.logoText}>Signup</Text>
            </TouchableOpacity>
          </View>
          <View  style={FormStyles.inputs}>
              <TextInput
                placeholder="Email"
                style={FormStyles.input}
                autoCapitalize="none"
                value={email}
                onChangeText={e => setEmail(e)}
                keyboardType="email-address"
                textContentType="emailAddress"
                returnKeyType="next"
              />
              <TextInput
                placeholder="Password"
                secureTextEntry
                style={FormStyles.input}
                value={password}
                onChangeText={e => setPassword(e)}
                returnKeyType="done"
              />
              <TouchableOpacity style={FormStyles.submitView} 
              onPress={onSubmit}>
                <Text style={FormStyles.submitText}>Login</Text>
              </TouchableOpacity>
              <TouchableOpacity style={FormStyles.ForgotPasswordView} 
              onPress={() => props.navigation.navigate('ForgotPassword')}>
                <Text style={FormStyles.ForgotPasswordBttn}>Forgot Password</Text>
              </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

}

export default Login