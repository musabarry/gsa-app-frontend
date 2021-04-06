import React, {useState} from 'react';
import {View, StyleSheet, TextInput, TouchableOpacity, Text, Image, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';  
const Statemen = (props) => {

    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <TouchableOpacity >
                    <EvilIcons name="close" size={35} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => props.upload()} >
                    <Text style={styles.post_text}>Post</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.post_wraper}> 
                <TextInput style={styles.input}
                multiline={true}
                placeholder="What do you want to say!"
                placeholderTextColor="#7a7a7a"
                onChangeText={(text) => props.setText(text)}/>
                <Image source={{uri: props.img}}  style={{width: '100%', height: '40%', }} /> 
            </View>
      </View>
      
    );
}

export default Statemen;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        
    },
    top:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5
    },
    post_wraper:{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '90%',
        borderWidth: 1,
        borderColor: '#ddd',
        borderBottomWidth: 2,
        shadowColor: '#CCC',
        shadowOffset: { width: 2, height: 3 },
        shadowRadius: 5,
        elevation: 1,
    },
    input:{
        width: '100%',
        paddingTop: 20,
        marginBottom: 10,
        padding: 10,
        fontWeight: '700'
    },
    post_text:{
        fontSize: 18,
        fontWeight: '600'
    }
})