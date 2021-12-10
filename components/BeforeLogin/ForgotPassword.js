import React, { useState } from "react";
import {
  Keyboard,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput, Platform
} from "react-native";
import Constants from 'expo-constants';
import { AntDesign} from '@expo/vector-icons';
import FormStyles from "./Styles/FormStyles";
import logo from '../images/logo.png'
const  ForgotPassword = (props) => {


  const [email, setEmail] = useState('');

    return (
      <KeyboardAvoidingView  behavior={Platform.OS === 'ios'? 'padding' : 'height'} 
      style={FormStyles.container}>
         <View style={FormStyles.headerView}>
          <TouchableOpacity onPress={() => props.navigation.navigate('Login')} style={FormStyles.back_btn}>
          <Text style={FormStyles.back_text}>Back</Text>
          </TouchableOpacity>
        </View>
        <View style={FormStyles.forgotPage}>
          <View style={FormStyles.logoWraper}>
              <View style={FormStyles.logoView}>
                <Image source={logo} style={FormStyles.logo} />
              </View>
              <TouchableOpacity  style={FormStyles.logoTextView}
               onPress={() => props.navigation.navigate('Login')}>
                <Text style={FormStyles.logoText}>Login</Text>
              </TouchableOpacity>
          </View>
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
          <TouchableOpacity style={FormStyles.submitView}
           onPress={() => props.navigation.navigate("NewPassword")}>
            <Text style={FormStyles.submitText}>Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
}
export default ForgotPassword
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     //marginTop: Constants.statusBarHeight,
//   },
//   headerView:{
//     top: 0,
//     paddingLeft: 10
//   },
//   center:{
//     alignItems: 'center',
//     marginTop: 100
//   },
//   logoView:{
//     alignItems: 'center',
//     marginTop: 100,
//   },
//   logo:{
//     height: 100,
//     backgroundColor: '#000',
//     width: 100,
//     borderRadius: 25,
//     justifyContent: 'center'
//   },
//   logoText:{
//     color: '#fff',
//     textAlign: 'center'
//   },
//   signBtn:{
//     marginTop: 10,
//     marginBottom: 10
//   },
//   LoginTitle: {
//     fontSize: 16,
//     fontWeight: '900'
//   },
//   email:{
//     height: 40,
//     backgroundColor: "rgba(225, 229, 235,0.8)",
//     paddingLeft: 10,
//     marginBottom: 5,
//     borderRadius: 23,
//     width: 400
//   },
//   send_btn:{
//     backgroundColor: '#fff',
//     borderRadius: 18,
//     overflow: 'hidden',
//     height: 37,
//     width: 125,
//     color: '#000',
//     marginTop: 5,
//     marginBottom: 5,
//     justifyContent:'center',
//     alignSelf: 'center'
//   },
//   send_text:{
//     fontSize: 18,
//     fontWeight: '800',
//     textAlign: "center",
//     paddingVertical: 3,
//   },
//   back_text:{
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#5cacf7'
//   }
  // login_btn:{
  //   justifyContent: 'center',
  //   backgroundColor: '#fff',
  //   borderRadius: 18,
  //   overflow: 'hidden',
  //   height: 30,
  //   width: 125,
  //   color: '#000',
  //   marginBottom: 25
  // },
  // login_text: {
  //   fontSize: 18,
  //   fontWeight: '800',
  //   textAlign: "center",
  //   paddingVertical: 3,
  // },
  // email: {
  //   height: 40,
  //   backgroundColor: "rgba(225, 229, 235,0.8)",
  //   paddingLeft: 10,
  //   marginBottom: 5,
  //   borderRadius: 23,
  //   width: 400
  // },
  // logocontainer: {
  //   flexGrow: 1,
  //   alignItems: "center",
  //   justifyContent: "center",
  // },
  // logo: {
  //   width: 100,
  //   height: 100,
  // },
  // send_btn:{
  //   backgroundColor: '#fff',
  //   borderRadius: 18,
  //   overflow: 'hidden',
  //   height: 30,
  //   width: 125,
  //   color: '#000'
  // },
  // send_text: {
  //   fontSize: 18,
  //   fontWeight: '800',
  //   textAlign: "center",
  //   paddingVertical: 3,
  // },
  // citytech: {
  //   color: "rgba(90, 145, 109,0.8)",
  // },
  // buttontext: {
  //   paddingVertical: 50,
  // },
// });