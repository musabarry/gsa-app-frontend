import React, {useState, useEffect} from 'react'
import {View, Text, TouchableOpacity, StyleSheet,
     Image, ScrollView, KeyboardAvoidingView, Platform} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather, Ionicons, FontAwesome5 } from '@expo/vector-icons';
import InputCom from '../../InputCom';
import { socket } from '../../../socket';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MessageCom from './MessageCom';
import {GETMESSAGES} from '../../../GraphQl/query';
import{useQuery} from '@apollo/client';
const WriteMessage = (props) => {
    const navigation = useNavigation();
    const routeData = props.route.params
    const flName = routeData.firstname[0] + routeData.lastname[0]
    const [msg, setMsgText] = useState('');
    const [messages, setMessages] =  useState([])
    const [mySchool, setMyschool] = useState()
    const navBarHeight = (Platform.OS === 'ios') ? 47 : 100;
    const roomChat =  routeData.room
    const [newMsg, setNewMsg] = useState()

    const {data, error, loading, refetch} = useQuery(GETMESSAGES, 
        {
            variables:{room: roomChat}
        },
    )

    const submit =  async () =>{  
        const userID =await  AsyncStorage.getItem("@userID")

        if(msg && roomChat){
           let data = {
                body: msg,
                room: roomChat.replace(' ', ''),
                author: userID,
                createAt:`${Date.now()}`
                //args.input.createAt
            }
            socket.emit(roomChat, data)
            setMsgText('')
            //refetch()
        }
    }

    const storeData = async (data) =>{
       
        let oldData =  await AsyncStorage.getItem(`@${roomChat}`)
        oldData =  JSON.parse(oldData)
        if(oldData){
            let addMsg = [...oldData, data]
            await AsyncStorage.setItem(`@${roomChat}`, JSON.stringify(addMsg))
        }else{
            let addMsg = [data]
            await AsyncStorage.setItem(`@${roomChat}`, JSON.stringify(addMsg))
        }
    }
    
    useEffect(() =>{  
        refetch()   
        if(roomChat){
            socket.on(roomChat, payload =>{ 
                refetch()
                if(data){
                    setMessages(data.getMessage)
                }
            })

        } 
        if(data){
            setMessages(data.getMessage)
        }
    }, [data])

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
                <View>
                    {messages &&
                        messages.map(e =>{
                        return(<MessageCom 
                            avatar={e.author.avatar}
                            firstname={e.author.firstname}
                            lastname={e.author.lastname}
                            msg={e.body}  key={e._id}
                            date={e.createAt} auth_id={e.author._id}/>)
                        
                        })}
                </View>
            </ScrollView>
            <KeyboardAvoidingView 
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={navBarHeight}>
                <InputCom  
                textPlaceholder={'Message'}
                msgText={msg}
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