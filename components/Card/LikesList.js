import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, FlatList, Platform, TouchableHighlight} from 'react-native';
import Loading from '..//01/loading';
import { AntDesign } from '@expo/vector-icons';

const LikesList = ({item}) => {
    
    return (
        <View style={styles.comment_wrapper}  >
            <View style={styles.info}>
                <View style={styles.thumbnail_wraper}>
                    {
                        item.avatar ?
                        <Image style={styles.thumbnail} source={{uri: item.avatar}}/> :
                         <AntDesign name="user" size={24} color="black"/>
                    }
                </View>
                <View>
                    <Text style={styles.name}>{item.firstname} {item.lastname}</Text>
                    <Text>  @{item.school}</Text>
                </View>
            </View>
            <View style={styles.comment}>
                <Text style={styles.date}>{item.date}</Text>
            </View>
        </View>


    );
}



export default LikesList;

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
        marginLeft: 60,
        fontSize: 14,
        fontWeight: '600'
    },
    date:{
        alignSelf: 'flex-end'
    },
    thumbnail_wraper:{
        width: 50,
        height: 50,
        borderWidth: 1,
        borderRadius: 100,
        borderColor: '#CCC'
    },
    thumbnail:{
        width: '100%',
        height: '100%',
        borderRadius: 100
    }

})