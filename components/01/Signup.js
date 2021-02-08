import React, {useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import Constants from 'expo-constants';
import authContext  from '../../authContext';
import AsyncStorage from '@react-native-community/async-storage';
import {SIGNUP} from '../../GraphQl/mutation';
import{useMutation} from '@apollo/client';
import { Alert } from "react-native";
const Signup = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] =  useState('');
  const [confirPass, setConfirPass] = useState('');
  const [signup, {error, loading}] =  useMutation(SIGNUP)

  const [errors, setErrors] =  useState('')
  const state = useContext(authContext);

  const onSubmit = () =>{
    if(!email || !password || !confirPass){
      console.log('Empty field');
    }if(password != confirPass){
      console.log("Password does not match");
    }else{
      signup({
        variables:{
          email: email,
          password: password
        }
      }).then(async (res) =>{
        if(res.data.signup.success){
          await AsyncStorage.setItem('@token_key', res.data.signup.token)
          await AsyncStorage.setItem('@userID', res.data.signup.account._id)
          await AsyncStorage.setItem('@userSet', res.data.signup.info.toString())
          state.setAuthanticated(true)
          state.seAccount(res.data.signup.success)
        }
      })
      .catch(erro =>{
        console.log(error);
        // Alert.alert('Email already excist')
      })
    }
  }

  useEffect(() =>{
    if(loading){
      console.log('hello');
    }
  },[])

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      
      {/* <View style={styles.headerView}>
        <TouchableOpacity onPress={() => props.navigation.navigate('Home')}>
        <AntDesign name="back" size={24} color="black" />
        </TouchableOpacity>
      </View> */}
      
      <View style={styles.login}>
        <View style={styles.logoView}>
          <View style={styles.logo}>
            <Text style={styles.logoText} >LOGO</Text>
          </View>
          <TouchableOpacity  style={styles.signBtn}
          onPress={() => props.navigation.navigate('Login')}>
          <Text style={styles.LoginTitle}>Login</Text>
          </TouchableOpacity>
        </View>
        <View  style={styles.input}>
          <TextInput
            placeholder="Enter Email"
            style={styles.username}
            autoCapitalize="none"
            value={email}
            onChangeText={e => setEmail(e)}
          ></TextInput>
          <TextInput
            placeholder="Password"
            secureTextEntry
            style={styles.username}
            value={password}
            onChangeText={e => setPassword(e)}
          ></TextInput>
          <TextInput
            placeholder="Re enter password"
            secureTextEntry
            style={styles.username}
            value={confirPass}
            onChangeText={e => setConfirPass(e)}
          ></TextInput>
          <TouchableOpacity style={styles.LoginView} 
            onPress={onSubmit}>
            <Text style={styles.LoginButton}>Signup</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.forgotPassword} 
          onPress={() => props.navigation.navigate('ForgotPassword')}>
            <Text style={styles.LoginButton}>Forgot Password</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  headerView:{
    top: 0,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#DCD6D6",
  },
  logoView:{
    alignItems: 'center',
    marginTop: 100,
  },
  logo:{
    height: 100,
    backgroundColor: '#000',
    width: 100,
    borderRadius: 25,
    justifyContent: 'center'
  },
  logoText:{
    color: '#fff',
    textAlign: 'center'
  },
  input:{
    marginTop: 20
  },
  login:{
    alignItems: 'center',
    marginTop: 100,

  //   margin: 100,
  //   marginHorizontal: 20,
  //  justifyContent: 'center',
  //  alignContent: 'center',
  //  height: 100
  },
  username: {
    height: 40,
    backgroundColor: "rgba(225, 229, 235,0.8)",
    paddingLeft: 10,
    marginBottom: 5,
    borderRadius: 23,
    width: 400
  },
  signBtn:{
    marginTop: 10,
    marginBottom: 10
  },
  LoginTitle: {
    fontSize: 16,
    fontWeight: '900'
  },
  LoginButton: {
    fontSize: 18,
    fontWeight: '800',
    textAlign: "center",
    paddingVertical: 3,
  },
  MemberLogin: {
    paddingVertical: 10,
  },
  LoginView: {
    backgroundColor: '#fff',
    borderRadius: 18,
    overflow: 'hidden',
    height: 37,
    width: 125,
    color: '#000',
    marginTop: 5,
    marginBottom: 5,
    justifyContent:'center',
    alignSelf: 'center'
  },
  ForgotPasswordView: {
    paddingVertical: 5,
  },
  ForgotPasswordBttn: {
    textAlign: "center",
  },
});

export default Signup;
