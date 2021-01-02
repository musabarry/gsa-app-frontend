import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Button,
  TextInput
} from "react-native";
import Constants from 'expo-constants';
import { AntDesign} from '@expo/vector-icons';

export default class Info extends Component {
  // state = {
  //   photo: null,
  // };
  // handleChoosePhoto = () => {
  //   const options = {
  //     noData: true,
  //   };
  //   ImagePicker.launchImageLibrary(options, (response) => {
  //     if (response.uri) {
  //       this.setState({ photo: response });
  //     }
  //   });
  // };
  render() {

    return (
      <KeyboardAvoidingView Behavior="padding" style={styles.container}>
        <ScrollView>
       
          <View style={styles.headerView}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')}>
            <AntDesign name="back" size={24} color="black" />
            </TouchableOpacity>
          </View>
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
              ></TextInput>
              <TextInput
                placeholder="Lastname"
                style={styles.username}
              ></TextInput>
              <TextInput placeholder="School" style={styles.username}></TextInput>
              <TextInput placeholder="Major" style={styles.username}></TextInput>
              <TextInput placeholder="Role" style={styles.username}></TextInput>
              <TextInput
                placeholder="Interst"
                style={styles.username}
              ></TextInput>
              <TouchableOpacity style={styles.LoginView} 
              onPress={() => this.props.navigation.navigate('auth')}>
                <Text style={styles.LoginButton}>Signup</Text>
              </TouchableOpacity>
            </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
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
