import React, {useState, useEffect, useRef, useContext, useCallback} from 'react'
import {View, Text, TouchableOpacity, StyleSheet,
     Image, ScrollView, KeyboardAvoidingView, Platform, ActivityIndicator} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather, Ionicons, FontAwesome5, FontAwesome } from '@expo/vector-icons';
import InputCom from '../../InputCom';
import { socket } from '../../../socket';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MessageCom from './MessageCom';
import {GETMESSAGES} from '../../../GraphQl/query';
import{useQuery} from '@apollo/client';
import { GiftedChat, Send, Bubble, Day, InputToolbar } from 'react-native-gifted-chat';
import authContext from '../../../Context/authContext';
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
    const states = useContext(authContext)
    const scrollView =  useRef();

    const name =  states.userInfo.userInfo.firstname + ' '+ states.userInfo.userInfo.lastname
    const avatar = states.userInfo.userInfo.avatar
    const _id =  states.userInfo.userInfo._id

    const {data, error, loading, refetch} = useQuery(GETMESSAGES, 
        {
            variables:{room: roomChat}
        },
    )
    const renderSend = (props) => {
        return (
          <Send {...props}>
            <View>
              <Ionicons
                name="send"
                style={{marginBottom: 5, marginRight: 5}}
                size={32}
                color="#2e64e5"
              />
            </View>
          </Send>
        );
    };
    const renderBubble = (props) => {
        return (
          <Bubble
            {...props}
            wrapperStyle={{
              right: {
                backgroundColor: '#2e64e5',
              },
            }}
            textStyle={{
              right: {
                color: '#fff',
              },
            }}
          />

        );
    };

    const scrollToBottomComponent = () => {
        return(
            <View style={styles.bottomComponentContainer}>
                <FontAwesome name='angle-double-down' size={22} color='#6646ee' />
            </View>
        );
    }
    const renderLoading = () => {
        return (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size='large' color='#6646ee' />
          </View>
        );
      }

    const onSend = useCallback(([text]) => {
        const userID = _id
        const date = new Date()
        console.log(messages.length, '1');
        if(text.text && roomChat && userID){
           let data = {
                body: text.text,
                room: roomChat.replace(' ', ''),
                author: userID,
                createdAt:`${date}`
            }
            socket.emit(roomChat, data)
            setMsgText('')
            refetch()
            console.log(messages.length, '2');
        }
    });


    useEffect(() =>{    
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
            <GiftedChat
                messages={messages}
                onSend={(text)  => onSend(text)}
                user={{
                    _id: _id,
                    name: name,
                    avatar: avatar
                }}
                alwaysShowSend={true}
                renderSend={renderSend}
                renderBubble={renderBubble}
                scrollToBottom={true}
                scrollToBottomComponent={scrollToBottomComponent}
                placeholder='Type your message here...'
                // showUserAvatar
                renderLoading={renderLoading}
                showAvatarForEveryMessage={true}
                renderUsernameOnMessage={true}/>
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
    },
    bottom_msg:{
        // position: 'absolute',
        // bottom: 0
    },
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    bottomComponentContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    }

})