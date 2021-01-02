import React, { Component } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Dimensions
} from "react-native";
import { AntDesign,Ionicons } from '@expo/vector-icons';


const ProfileInfo = (props) =>{

    return(
        <View>
            <View style={styles.top_wrapper}>
                <View style={styles.img} >
                   <AntDesign name="user" size={24} color="black" />              
                </View>
                <View style={styles.name}>
                <Text style={styles.textName}>Kadiatou Bah</Text>
                </View>
            </View>
            <View style={styles.bottom_wrapper}>
                <View>
                    <Text>School</Text>
                    <Text>Major</Text>
                    <TouchableOpacity><Ionicons name="arrow-forward-circle-outline" size={24} color="black" /></TouchableOpacity>
                </View>
            </View>

        </View>
    )
}

const wight = Dimensions.get('window').width

const styles = StyleSheet.create({
    top_wrapper: {
        height: 200,
        borderBottomColor: '#000',
        borderBottomWidth: 1,
        width: wight,
        alignItems: 'center',
        backgroundColor: "#DCD6D6",
    

    },

    img:{
        marginTop: 35,
        alignItems: 'center',
        width: 80,
        height: 80,
        borderRadius: 25,
        borderColor: '#000',
        borderWidth: 1,
        marginBottom: 15
    },
    name:{
        alignItems: 'center',
        marginTop: 10,
    },
    textName:{
        fontWeight: '900',
        fontSize: 25
    },
    bottom_wrapper:{
        backgroundColor: "#DCD6D6",
        borderBottomColor: '#000',
        borderBottomWidth: 1,
        
    }
})

export default ProfileInfo;
