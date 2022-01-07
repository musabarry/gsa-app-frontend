import React, {useState, useContext, useEffect } from "react";
import { Text, View,TouchableOpacity,
  TextInput, KeyboardAvoidingView, ScrollView,Modal,Alert, Image, SafeAreaView, Platform} from "react-native";
import checkContext  from '../../Context/checkContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SIGNUP} from '../../GraphQl/mutation';
import{useMutation} from '@apollo/client';
import {Picker} from '@react-native-picker/picker';
import { EvilIcons } from '@expo/vector-icons'; 
import FormStyles from "./Styles/FormStyles";
import Loading from './loading';
import logo from '../images/logo.png'
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
  const [validEmail, setValidEmail] = useState()
  const [validEmailColor, setValidEmailColor] = useState('#000')
  const [matchPass, setMatchPass] = useState(false)
  const state = useContext(checkContext);
  const [emptyField, setEmptyField] = useState(false)
  const [pressSubmit, setPressSubmit] = useState(false)

  const [emptyMsg, setEmptyMsg] = useState()
  const [matchMas, setMatchMasg] = useState()
  const validate = (email) => {
    if(email.length >= 3){
      const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
      if(expression.test(String(email).toLowerCase())){
        setValidEmail('Valid')
        setValidEmailColor('#00f040')
      }else{
        setValidEmail('Not Valid')
        setValidEmailColor('#d40b0b')
      }
    }else{
      setValidEmail()
    }
    setEmail(email)
  }
  
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
      validate(email)

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
            await AsyncStorage.setItem('@userID', res.data.signup._id)
            state.setVerifyUser(true)
            //return props.navigation.navigate('Signup')
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
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? 'padding': null} 
                          keyboardVerticalOffset={Platform.select({ios: 0, android: 500})}
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
            <TextInput
              placeholder="Firstname"
              style={FormStyles.input}
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
              style={FormStyles.input}
              autoCapitalize="none"
              keyboardType="default"
              textContentType="familyName"
              value={lastName}
              onChangeText={e => setLname(e)}
              returnKeyType="next"
              blurOnSubmit={true}
            />
            <TouchableOpacity
              style={FormStyles.input}
              onPress={() => setModalVisible(!modalVisible)}>
                <Text>{school}</Text>
            </TouchableOpacity>
            {validEmail && <View style={{alignSelf: 'flex-end', marginRight: 20}}>
              <Text style={{color: validEmailColor, fontWeight: '800'}}>{validEmail}</Text>
              </View>}
            <TextInput
              placeholder="Enter Email"
              style={FormStyles.input}
              autoCapitalize="none"
              keyboardType="email-address"
              textContentType="emailAddress"
              value={email}
              onChangeText={e => validate(e)}
              returnKeyType="next"
              blurOnSubmit={true}
            />
            {passStrength && <View style={{alignSelf: 'flex-end', marginRight: 20}}>
             <Text style={{color: passStrengthColor, fontWeight: '800'}}>{passStrength}</Text>
            </View>}
            <TextInput
              placeholder="Password"
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
              placeholder="Reenter Password"
              secureTextEntry
              style={FormStyles.input}
              value={confirPass}
              onChangeText={e => setConfirPass(e)}
              returnKeyType="done"
              textContentType="password"
              blurOnSubmit={true}
            />
            <TouchableOpacity style={FormStyles.submitView} 
              onPress={onSubmit}>
              <Text style={FormStyles.submitText}>Signup</Text>
            </TouchableOpacity>

           {(emptyField === true) && 
            <View style={FormStyles.errorView}>
              <Text style={FormStyles.emptyError}>{emptyMsg}</Text>
             </View>}
          </View>
          <Modal 
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          hardwareAccelerated={true}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
            <View style={FormStyles.picker}>
              <TouchableOpacity style={FormStyles.close} onPress={() => setModalVisible(!modalVisible)}>
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


export default Signup;
