import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, FlatList, Platform, TouchableHighlight} from 'react-native';
import Loading from '../BeforeLogin/loading';
import { AntDesign } from '@expo/vector-icons';

const LikesList = ({item}) => {
    
    //return all like from a post 
    return (
        <View style={styles.comment_wrapper}  >
            {/* <View style={styles.info}> */}
                <View style={styles.thumbnail_wraper}>
                    {
                        item.avatar !== '' &&
                        <Image style={styles.thumbnail} source={{uri: item.avatar}}/> 
                    }
                </View>
                <View style={styles.info}>
                    <Text style={styles.name}>{item.firstname} {item.lastname}</Text>
                    <Text>@{item.school}</Text>
                </View>
                <View style={styles.comment}>
                <Text style={styles.date}>{item.date}</Text>
            </View>
            {/* </View> */}
        </View>


    );
}



export default LikesList;

const styles = StyleSheet.create({
    comment_wrapper:{
        backgroundColor: '#e6e6e6',
        display: 'flex',
        flexDirection: 'row',
        alignSelf: 'center',
        borderColor: '#cccccc',
        borderWidth: 1,
        padding: 5,
        shadowOffset:{
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        width: '95%',
        borderRadius: 10,
        marginBottom: 4,

    },
    info:{
        display: 'flex',
        flexDirection: 'column',
        alignSelf: 'center',
        marginLeft: 10,
    },
    name:{
        fontWeight: 'bold',
        textTransform: 'capitalize'
    },
    comment:{
        alignSelf: 'flex-end',
        flex: 1,
    },
    date:{
        alignSelf: 'flex-end',
        fontWeight: 'bold'
    },
    thumbnail_wraper:{
        width: 50,
        height: 50,
        borderWidth: 1,
        borderRadius: 100,
        borderColor: '#CCC',
        backgroundColor: '#01294a'
    },
    thumbnail:{
        width: '100%',
        height: '100%',
        borderRadius: 100
    }

})