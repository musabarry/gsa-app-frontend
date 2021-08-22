import React, {useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Modal,
  Alert,
} from "react-native";
import Constants from 'expo-constants';
import checkContext  from '../../Context/checkContext';
import AsyncStorage from '@react-native-community/async-storage';
import {SIGNUP} from '../../GraphQl/mutation';
import{useMutation} from '@apollo/client';
import {Picker} from '@react-native-picker/picker';
import { EvilIcons } from '@expo/vector-icons'; 

import Loading from './loading';
const Signup = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] =  useState('');
  const [confirPass, setConfirPass] = useState('');
  const [signup, {error, loading}] =  useMutation(SIGNUP)
  const [firstName, setFname] = useState("")
  const [lastName, setLname] = useState("")
  const [school, setSchool] = useState('Pick a School')
  const [errors, setErrors] =  useState('')
  const [modalVisible, setModalVisible] = useState(false);
  const [passStrength, setPassStrength] =  useState()
  const [passStrengthColor, setPassStrengthColor] = useState('#000')
  const [matchPass, setMatchPass] = useState(false)
  const state = useContext(checkContext);
  const [emptyField, setEmptyField] = useState(false)
  const [pressSubmit, setPressSubmit] = useState(false)

  const [emptyMsg, setEmptyMsg] = useState()
  const [matchMas, setMatchMasg] = useState()
  
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
      if(!email || !password || !confirPass || !school || !firstName || !lastName){
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
    if(!matchPass &&   !(!email || !password || !confirPass || !school || !firstName || !lastName)){
      setPressSubmit(false)
      signup({
        variables:{
          email: email,
          password: password,
          firstname: firstName,
          lastname: lastName,
          school: school

        }
      }).then(async (res) =>{
        if(res.data.signup.success){
          await AsyncStorage.setItem('@token_key', res.data.signup.token)
          await AsyncStorage.setItem('@userID', res.data.signup._id)
          state.setAuthanticated(true)
        }
      })
      .catch(err =>{
        Alert.alert('Email already excist')
      })
    }
  }


  if(loading){
    return(
      <Loading />
    )
  }else{
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        
        <View style={styles.headerView}>
          <TouchableOpacity onPress={() => props.navigation.goBack()} style={styles.back_btn}>
          <Text style={styles.back_text}>Back</Text>
          </TouchableOpacity>
        </View>
        
        <ScrollView style={styles.login}>
          <View style={styles.logoView}>
            <View style={styles.logo}>
              <Text style={styles.logoText} >LOGO</Text>
            </View>
            <TouchableOpacity  style={styles.signBtn}
            onPress={() => props.navigation.navigate('Login')}>
            <Text style={styles.LoginTitle}>Login</Text>
            </TouchableOpacity>
          </View>
          <View  style={styles.inputs}>

            <TextInput
              placeholder="Firstname"
              style={styles.input}
              autoCapitalize="none"
              keyboardType="default"
              textContentType="givenName"
              value={firstName}
              onChangeText={e => setFname(e)}
              returnKeyType="next"
              autoFocus={true}
              blurOnSubmit={true}
            />
            <TextInput
              placeholder="Lastname"
              style={styles.input}
              autoCapitalize="none"
              keyboardType="default"
              textContentType="familyName"
              value={lastName}
              onChangeText={e => setLname(e)}
              returnKeyType="next"
              blurOnSubmit={true}
            />
            <TouchableOpacity
              style={styles.input}
              onPress={() => setModalVisible(!modalVisible)}>
                <Text>{school}</Text>
              </TouchableOpacity>
            
            <TextInput
              placeholder="Enter Email"
              style={styles.input}
              autoCapitalize="none"
              keyboardType="email-address"
              textContentType="emailAddress"
              value={email}
              onChangeText={e => setEmail(e)}
              returnKeyType="next"
              blurOnSubmit={true}
            />
            <View style={{alignSelf: 'flex-end', marginRight: 20}}>
             <Text style={{color: passStrengthColor, fontWeight: '800'}}>{passStrength}</Text>
            </View>
            <TextInput
              placeholder="Password"
              secureTextEntry
              style={styles.input}
              value={password}
              onChangeText={e => StrengthChecker(e)}
              returnKeyType="next"
              textContentType="password"
              blurOnSubmit={true}
            />
            <View style={{alignSelf: 'flex-end', marginRight: 20}}>
              <Text style={{color: '#ad0000', fontWeight: '800'}}>{matchMas}</Text>
            </View>
            <TextInput
              placeholder="Reenter Password"
              secureTextEntry
              style={styles.input}
              value={confirPass}
              onChangeText={e => setConfirPass(e)}
              returnKeyType="next"
              textContentType="password"
              blurOnSubmit={true}
            />
            <TouchableOpacity style={styles.signp_btn} 
              onPress={onSubmit}>
              <Text style={styles.LoginButton}>Signup</Text>
            </TouchableOpacity>

           {(emptyField === true) && 
            <View>
              <Text style={styles.emptyError}>{emptyMsg}</Text>
             </View>}
          </View>
          <Modal 
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
            <View style={styles.picker}>
              <TouchableOpacity style={styles.close} onPress={() => setModalVisible(!modalVisible)}>
                  <EvilIcons name="close" size={35} color="black" />
              </TouchableOpacity>
            <Picker
                selectedValue={school}
                onValueChange={(itemValue, itemIndex) =>
                  setSchool(itemValue)  
                } >
              <Picker.Item label="Bmcc" value="Bmcc"  />
              <Picker.Item label="Brooklyn College" value="Brooklyn College"  />
              <Picker.Item label="City College" value="City College"  />
              <Picker.Item label="City Tech" value="City Tech" onPress/>
            </Picker>
          </View>
        </Modal>
        </ScrollView>

      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //marginTop: Constants.statusBarHeight,
  },
  headerView:{
    top: 0,
    paddingLeft: 10
  },
  logoView:{
    alignItems: 'center',
    marginTop: 50,
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
  inputs:{
    display: 'flex',
    flexDirection:"column",
    alignItems: 'center'
  },
  input: {
    height: 50,
    backgroundColor: "#f5f5f5",
    paddingLeft: 10,
    marginBottom: 5,
    borderRadius: 10,
    borderColor: "#CCC",
    borderWidth: 1,
    width: 400,
    marginTop: 5,
    marginBottom: 5,
    justifyContent: 'center'
  },
  signBtn:{
    marginTop: 10,
    marginBottom: 10
  },
  LoginTitle: {
    fontSize: 16,
    fontWeight: '900',

  },
  LoginButton: {
    fontSize: 18,
    fontWeight: '800',
    textAlign: "center",
    paddingVertical: 3,
    color: "#fff"
  },
  MemberLogin: {
    paddingVertical: 10,
  },
  signp_btn: {
    backgroundColor: '#01294a',
    borderRadius: 18,
    overflow: 'hidden',
    height: 37,
    width: 125,
    color: '#000',
    marginTop: 10,
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
  picker:{
    //margin: 20,
    backgroundColor: "#bdbdbd",
    marginTop: 'auto', 
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 20,
  },
  close:{
    //backgroundColor: 'red'
    margin: 10,
    alignSelf: 'flex-end'
  },
  back_text:{
    fontSize: 18,
    fontWeight: '600',
    color: '#5cacf7'
  },
  emptyError:{
    color: '#d91111',
    fontWeight: '800',
    padding: 20,
    fontSize: 16
  },
});

export default Signup;
