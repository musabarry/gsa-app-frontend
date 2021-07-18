import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput
} from "react-native";
import {UPDATEINFO} from '../../GraphQl/mutation';
import{useMutation} from '@apollo/client';

import {USERINFO} from '../../GraphQl/query';
const  EditInfo = (props)=>{


    //input field state
    const [role, setRole] = useState([])
    const [major, setMajor]  = useState('')
    const  [interest, setInterest] = useState([])
    const [skills, setSkills] = useState([])

    //grapql mutation for updating user information
    // const [updateUserInfo, {error, loading}] =  useMutation(TEST)

    const [newError, setNewError] = useState('')
    const [updateUserInfo, {error, loading}] = useMutation(UPDATEINFO)
        /* 
        update user information
        -major
        -role
        - skills
        - interest
        */
    const onSubmit = async  () =>{
        console.log('testing____________________________');
        updateUserInfo({
            variables:{
                major: major,
                role: role,
                interest: interest,
                skills: skills
            },
            refetchQueries: [{query: USERINFO}]
        }).then(res =>{
            console.log(res);
            props.setModalVisible(false)
        }).catch(err =>{
            // /console.log({err});
        })
    }
   
    return (
        <KeyboardAvoidingView behavior="padding"  >
            <View style={styles.center}>

                <TextInput placeholder="Role" 
                style={styles.input}
                autoCapitalize="words"
                autoCorrect={true} 
                autoFocus={true}
                returnKeyType='next'
                onChangeText={text => setRole(text)}/>

                <TextInput 
                placeholder="Major"
                style={styles.input}
                autoCapitalize="words"
                autoCorrect={true} 
                returnKeyType='next'
                onChangeText={text => setMajor(text)}/>

                <TextInput 
                placeholder="Interest"
                autoCapitalize="words"
                autoCorrect={true} 
                style={styles.input}
                returnKeyType='next'
                onChangeText={(text) => setInterest(text.split(" "))} />

                <TextInput 
                placeholder="Skills"
                autoCapitalize="words"
                autoCorrect={true} 
                style={[styles.input, {color: '#0a1112'}]}
                returnKeyType='done'
                onChangeText={(text) => setSkills(text.split(" "))}/>

                <TouchableOpacity style={styles.send_btn}
                onPress={() => onSubmit()}>
                    <Text style={styles.send_text}>Submit</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

export default EditInfo

const styles = StyleSheet.create({ 
    center:{
        alignItems: 'center',
        marginTop: 140,
    },
    input:{
        height: 50,
        backgroundColor: "rgba(225, 229, 235,0.8)",
        borderWidth: 1,
        borderColor: '#1c0f0e',
        paddingLeft: 10,
        marginBottom: 5,
        borderRadius: 23,
        width: 400,
        marginTop: 10,
        marginBottom: 10,
        color: '#000',
        fontSize: 15,
        fontWeight: '400'
    },
    send_btn:{
        backgroundColor: '#1c0f0e',
        borderRadius: 18,
        overflow: 'hidden',
        height: 37,
        width: 125,
        marginTop: 5,
        marginBottom: 5,
        justifyContent:'center',
        alignSelf: 'center',
        marginTop: 30
      },
      send_text:{
        fontSize: 18,
        color: '#f7f7f7',
        fontWeight: '800',
        textAlign: "center",
        paddingVertical: 3,
      },
})