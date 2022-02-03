import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ScrollView} from 'react-native'
import Constants from 'expo-constants';
import { Feather } from '@expo/vector-icons';
import SearchBar from '../SearchBar';
import LookupContact from './LookupContact';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { socket } from '../../../socket';
const Message = () => {

    const navigation = useNavigation();
    const [search, setSearch] = useState('');
    const [searResult, setSearchResult] = useState([])
    const [clicked, setClicked] = useState(false);
    const [toWhom, setToWhom] = useState()
    const [gsaMsg, setGsaMsg] =  useState([])
    
    const toMessage = (avatar, id, firstname, lastname) =>{
        setClicked(!clicked)
        return navigation.navigate('write', {
            avatar: avatar,
            id: id,
            firstname: firstname,
            lastname: lastname, 
            room: null
        })
    }

    const toRoom = (room) =>{
        if(room){
            return navigation.navigate('write', {
                avatar: null,
                id: null,
                firstname: room,
                lastname: '_', 
                room: room
            })
        }
    }


    useEffect(() =>{
        (async () =>{
            const school = await AsyncStorage.getItem('@school')
            setToWhom(school)
        })();
    })

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.editView}>
                    <Text style={styles.editText} >Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.chatView}>
                    <Text style={styles.chatText}>Chats</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.writeView} onPress={() => setClicked(!clicked)}>
                    <Feather 
                        name="edit" 
                        size={25} 
                        color="#05b4ff"
                        style={{fontWeight: 'bold'}}
                    />
                </TouchableOpacity>
            </View>
            <View>
                <LookupContact
                clicked={clicked}
                setClicked={setClicked}
                toMessage={toMessage}/>
                <View style={styles.roomChat}>
                    <TouchableOpacity style={styles.room} onPress={() => toRoom('GSA')}>
                        <Text style={styles.roomText}>GSA</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.room} onPress={() => toRoom(toWhom)}>
                        <Text style={styles.roomText}>{toWhom}</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView style={styles.messages}>
                    <Text>Message</Text>
                </ScrollView>
                
            </View>
        </View>
    );
}

export default Message;

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
    editView:{
        marginLeft: 5
    },
    editText:{
        fontSize: 20,
        fontWeight: 'bold'
    },
    writeView:{
        marginRight: 5
    },
    chatText:{
        fontSize: 24,
        fontWeight: 'bold'
    },
    roomChat:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        padding: 5,
    },
    room:{
        width: '50%',
        backgroundColor: '#ededed',
        borderBottomWidth: 1,
        borderBottomColor: '#cae8e8',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity:  0.3,
        shadowRadius: 3,
        padding: 4
    },
    roomText:{
        textAlign: 'center',
        fontSize: 17,
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },
    messages:{
        height: '100%'
    }
})
