import React, {useState, useEffect} from 'react'
import {View, Text, TouchableOpacity, StyleSheet,
     Image, ScrollView, KeyboardAvoidingView, Platform} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather, Ionicons } from '@expo/vector-icons';
import InputCom from '../../InputCom';
import { KeyboardAccessoryView } from 'react-native-keyboard-accessory'

const WriteMessage = (props) => {
    const navigation = useNavigation();
    const routeData = props.route.params
    const flName = routeData.firstname[0] + routeData.lastname[0]
    const [msgText, setMsgText] = useState('');

    const navBarHeight = (Platform.OS === 'ios') ? 47 : 100;
    const submit = () =>{

        console.log('hello, send');
    }
    return (
        <View  style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                    <Ionicons name="ios-chevron-back" size={30} color="#82b5ff" />
                </TouchableOpacity>
                <View style={styles.info}>
                    <View style={styles.resImage}>
                       {routeData.avatar ? <Image style={styles.thumbnail} source={{uri: routeData.avatar}}/> :
                       <Text style={styles.flName}>{flName}</Text> }
                    </View>
                    <View>
                        <Text style={styles.name}>{routeData.firstname} {routeData.lastname}</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.writeView} >
                    <Feather 
                        name="more-vertical" 
                        size={30} 
                        color="#05b4ff" />
                </TouchableOpacity>
            </View>
            <ScrollView>

            </ScrollView>
            <KeyboardAvoidingView 
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={navBarHeight}>
                <InputCom  
                textPlaceholder={'Message'}
                msgText={msgText}
                setMsgText={setMsgText}
                submit={submit}
                btnText={'Send'}/>
            </KeyboardAvoidingView>
        </View>
    )
}

export default WriteMessage

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    header:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#ededed',
        borderBottomWidth: 1,
        borderBottomColor: '#cae8e8',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity:  0.3,
        shadowRadius: 3,
    },
    backBtn:{
        marginLeft: 5
    },
    backText:{
        fontWeight: '700',
        fontSize: 19,
        color: '#82b5ff'
    },
    info:{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    resImage:{
        width: 50,
        height: 50,
        borderWidth: 1,
        borderRadius: 100,
        borderColor: '#05b4ff',
        marginBottom: 3,
        justifyContent: 'center',
        alignItems: 'center'
    },
    thumbnail:{
        width: '100%',
        height: '100%',
        borderRadius: 100
    },
    flName:{
        justifyContent: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },
    writeView:{
        marginRight: 5
    },
    name:{
        fontSize: 15,
        textTransform: 'capitalize'
    },
    keyboardView:{
        display: 'flex',
        // flexDirection: 'column',
        // marginBottom: 10,
        // marginLeft: 10,
        // marginRight: 10
    },
})