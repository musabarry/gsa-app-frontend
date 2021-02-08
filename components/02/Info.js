import React, { useState, useContext  } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
  TextInput
} from "react-native";
import Constants from 'expo-constants';
import { AntDesign} from '@expo/vector-icons';
import authContext  from '../../authContext';
import {CREATEUSER} from '../../GraphQl/mutation';
import{useMutation} from '@apollo/client';
import AsyncStorage from '@react-native-community/async-storage'

const Info = (props) =>{

  const state = useContext(authContext);
  const [firstname, setFirstname] =  useState();
  const [lastname, setLastname] =  useState();
  const [school, setSchool] =  useState();
  const [major, setMajor] =  useState();
  const [role, setRole] =  useState();
  const [skills, setSkills] = useState()
  const [interest, setInterest] = useState()
  const [createUser, {error}] =  useMutation(CREATEUSER);

  
  const onSubmit = async () =>{
    const userID = await AsyncStorage.getItem('@userID')
    if(!firstname || !lastname || !userID || !school){
      console.log('Empty field');
    }else{
    createUser({
        variables:{
            account: userID,
            firstname: firstname,
            lastname: lastname,
            school: school,
            major: major,
            role: role,
            skills: skills.split(','),
            interest: interest.split(',')
          }
      })
      .then((res) =>{
        state.setAccount(true)
      }).catch(error =>{
        Alert.alert('Server error')
      })

    }
  };
   
  
  


    return (
      <KeyboardAvoidingView Behavior="padding" style={styles.container}>
        <ScrollView>
          <View style={styles.logoView}>
            <View style={styles.logo}>
              <Text style={styles.logoText} >IMAGE</Text>
            </View>
            <Text
              style={{ textAlign: "center", fontSize: 16, paddingVertical: 20 }}
            >
              Image
            </Text>
          </View>
            <View style={styles.info}>
              <TextInput
                placeholder="Firstname"
                style={styles.username}
                autoCapitalize={'none'}
                onChangeText={e => setFirstname(e)}
                value={firstname}
              />
              <TextInput
                placeholder="Lastname"
                style={styles.username}
                autoCapitalize={'none'}
                onChangeText={e => setLastname(e)}
                value={lastname}
              />
              <TextInput 
              placeholder="School" 
              autoCapitalize={'none'}
              style={styles.username}
              onChangeText={e => setSchool(e)}
              value={school}
              />
              <TextInput 
              placeholder="Major" 
              autoCapitalize={'none'}
              style={styles.username}
              onChangeText={e => setMajor(e)}
              value={major}
              />
              <TextInput 
              placeholder="Role" 
              autoCapitalize={'none'}
              style={styles.username}
              onChangeText={e => setRole(e)}
              value={role}
              />
              <TextInput
              placeholder="Skills"
              autoCapitalize={'none'}
              style={styles.username}
              onChangeText={e => setSkills(e)}
              value={skills}
              />
              <TextInput
              placeholder="Interst"
              autoCapitalize={'none'}
              style={styles.username}
              onChangeText={e => setInterest(e)}
              value={interest}
              />
              <TouchableOpacity style={styles.LoginView} 
              onPress={onSubmit}>
                <Text style={styles.LoginButton}>Submit</Text>
              </TouchableOpacity>
            </View>
        </ScrollView>
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
  info:{
    alignItems: 'center',
  },
  username: {
    height: 50,
    backgroundColor: "rgba(225, 229, 235,0.8)",
    paddingLeft: 10,
    marginBottom: 5,
    borderRadius: 23,
    width: 400,
    borderColor: '#000',
    borderWidth: 1
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
  about: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
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
  LoginButton: {
    fontSize: 18,
    fontWeight: '800',
    textAlign: "center",
    paddingVertical: 3,
  },
});

export default Info;
