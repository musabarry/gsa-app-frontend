import React from 'react';
import {Text, Image, View, StyleSheet} from 'react-native'
import AutoNavigation from '../../../AutoNavigation/AutoNavigation';

const MessageCom = ({avatar, firstname, lastname, msg}) => {

  return(
    <View style={styles.msgBox}>
        <View style={styles.userInfo}>
            <View style={styles.imageWraper}>
                <Image style={styles.image} source={{uri: avatar !== '' ? avatar : undefined}}/>
            </View>
            <View style={styles.nameView}>
                <Text style={styles.name}>{firstname} {lastname}</Text>
            </View>
        </View>
        <View style={styles.msgView}>
            <Text style={styles.msgText}>{msg}</Text>
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
    userInfo:{
        display: 'flex',
        width: '100%',
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
        width: '90%',
        borderBottomWidth: 1,
        borderBottomColor: '#d6d6d6',
        padding:0
    },
    name:{
       textAlign: 'center',
       color: '#999999',
       margin: 0,
    },
    msgView:{
        marginTop: 5,
        borderRadius: 10,
        borderWidth: .3,
        padding: 3,
        borderColor: '#05b4ff',
        minWidth: 10,
        maxWidth: '60%',
        minHeight: 25,
        marginLeft: 20
    },
    msgText:{
        margin: 0
    }
})
