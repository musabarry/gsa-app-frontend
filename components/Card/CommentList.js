import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList, Platform, TouchableHighlight} from 'react-native';
import Loading from '..//01/loading';
import { AntDesign } from '@expo/vector-icons';
const CommentList = ({item}) => {
    return (

        <View style={styles.comment_wrapper}  >
            <View style={styles.info}>
                <AntDesign name="user" size={24} color="black"/>
                <View>
                    <Text style={styles.name}>{item.byUser.firstname} {item.byUser.lastname}</Text>
                </View>
            </View>
            <View style={styles.comment}>
                <Text style={styles.text}>{item.text}</Text>
                <Text style={styles.date}>{item.date}</Text>
            </View>
        </View>


    );
}

export default CommentList;

const styles = StyleSheet.create({
    comment_wrapper:{
        backgroundColor: '#e6e6e6',
        display: 'flex',
        flexDirection: 'column',
        borderColor: '#cccccc',
        borderWidth: 1,
        shadowOffset:{
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    info:{
        display: 'flex',
        flexDirection: 'row'
    },
    name:{
        marginLeft: 10,
        fontWeight: '700',
        textTransform: 'capitalize'
    },
    comment:{
        display: 'flex',
        flexDirection: 'column'
    },
    text:{
        marginLeft: 30
    },
    date:{
        alignSelf: 'flex-end'
    }

})