import React, {useContext} from 'react';
import {Text, Image, View, StyleSheet} from 'react-native'
import checkContext  from '../../../Context/checkContext';
const MessageCom = ({avatar, name, msg, date, auth_id}) => {

    const states = useContext(checkContext);
    const msgBoxStyle = states.userID === auth_id  ? styles.myMsgView : styles.otherMsgView
    const msgTextStyle = states.userID === auth_id  ? styles.myMsgText : styles.otherMsgText
    const dateStyle = states.userID === auth_id ? styles.myDate : styles.otherDate
    return(
        <View style={styles.msgBox}>
            <View style={styles.userInfo}>
                {states.userID !==   auth_id && <View style={styles.imageWraper}>
                    <Image style={styles.image} source={{uri: avatar !== '' ? avatar : undefined}}/>
                </View>}
                {states.userID !== auth_id &&<View style={styles.nameView}>
                    <Text style={styles.name}>{name}</Text>
                </View>}
            </View>
            <View style={msgBoxStyle}>
                <Text style={msgTextStyle}>{msg}</Text>
            </View>
            <View style={dateStyle}>
                    <Text style={styles.date}>{date}</Text>
            </View>
        </View>
  );
};

export default MessageCom;

const styles = StyleSheet.create({
    msgBox:{
        display: 'flex',
        margin: 5,
        flexDirection: 'column',
    },
    otherUserInfo:{
        borderTopWidth: 1,
        borderTopColor: '#d6d6d6',
    },
    userInfo:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    imageWraper:{
        width: 30,
        height: 30,
        borderWidth: 1,
        borderRadius: 100,
        borderColor: '#CCC',
        backgroundColor: '#01294a',
    },
    image:{
        borderRadius: 100,
        width: '100%',
        height: '100%',
    },
    nameView:{
        marginLeft: 10,
        padding:0
    },
    name:{
       textAlign: 'center',
       color: '#2baeff',
       margin: 0,
    },
    myMsgView:{
        alignSelf: 'flex-end',
        backgroundColor: '#0472b5',
        maxWidth: '75%',
        marginTop: 5,
        borderRadius: 10,
        padding: 5,
        minHeight: 25,
        marginLeft: 10,
    },
    otherMsgView:{
        alignSelf: 'flex-start',
        backgroundColor: '#cfcfcf',
        maxWidth: '75%',
        marginTop: 5,
        borderRadius: 10,
        padding: 5,
        minHeight: 25,
        marginLeft: 10,
    },
    myMsgText:{
        color: '#fff',
        fontSize: 15
    },
    otherMsgText:{
        color: '#000',
        fontSize: 15
    },
    myDate:{
        alignSelf: 'flex-end',
    },
    otherDate:{
        alignSelf: 'flex-start',
    },
    date:{
        fontSize: 11
    }
})
