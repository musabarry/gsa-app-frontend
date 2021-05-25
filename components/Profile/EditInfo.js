import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput
} from "react-native";

export default function EditInfo() {
    return (
        <KeyboardAvoidingView>
            <View style={styles.center}>
                <TextInput placeholder="Role" 
                style={styles.input}/>
                <TextInput placeholder="Major"
                style={styles.input}/>
                <TextInput placeholder="Interest"
                style={styles.input}/>
                <TextInput placeholder="Skills"
                style={styles.input}/>
                <TouchableOpacity style={styles.send_btn}
                onPress={() => this.props.navigation.navigate("auth")}>
                    <Text style={styles.send_text}>Submit</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}


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
        fontSize: 19,
        fontWeight: '600'
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