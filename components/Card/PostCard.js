import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity}  from 'react-native';
import { FontAwesome5, Feather } from '@expo/vector-icons';
import CommentLikeIcon from './CommentLikeIcon';


const PostCard = (props) =>{

    return(
        <View style={styles.card_wrapper}>
            <View style={styles.top_wrapper}>
                <View style={styles.thumbnail_wraper}>
                    {
                        props.userInfo.avatar ?
                        <Image style={styles.thumbnail} source={{uri: props.userInfo.avatar}}/> :
                        <FontAwesome5 name="user-alt" size={24} color="black" />
                    }
                    </View>
                <View style={styles.nameBox}>
                    <Text style={styles.name}>{props.userInfo.firstname} {props.userInfo.lastname}</Text>
                    <Text style={styles.school}>@{props.userInfo.school}</Text>
                </View>
            </View >
            <View style={styles.middle_wrapper}>
                <View style={styles.post}>
                {props.uri[0] != null ?
                    (
                    <>
                    <Text style={styles.textPost}>
                        {props.data.text}
                    </Text>
                    <TouchableOpacity style={styles.ImgFrame}>
                        <Image style={styles.img} source={{uri: props.uri[0]}}/>
                    </TouchableOpacity></>
                    ):(
                    <Text style={styles.textPost}>
                        {props.data.text}
                    </Text>
                    )}
                </View>
                <View style={styles.bottom_wrapper}>
                    <CommentLikeIcon likes={props.data.likes.length} 
                                    commnets={props.data.commnets.length}  size={25}  
                                    data={props.data.commnets} id={props.data._id} 
                                    navHome={props.navHome} navScreen={props.navScreen}/>

                    <View style={styles.timeOption}>
                        <Text>{props.data.date}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.more}>
            <Feather name="more-horizontal" size={24} color="black" />
            </View>
        </View>
    )
}

const styles =  StyleSheet.create({
    card_wrapper:{
        borderWidth: 1,
        borderColor: '#dbdbdb',
        shadowColor: '#CCC',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        borderRadius: 15,
        margin: 5,
        marginTop: 20,
    },
    top_wrapper:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'baseline',
        flexWrap: 'wrap',
        margin: 4,
        alignItems: 'center'
    },
    nameBox:{
        marginLeft: 10,
        flexDirection: 'column',
    },
    textPost:{
        marginBottom: 15
    },
    middle_wrapper:{
        borderRadius: 10
    },
    bottom_wrapper:{
        display: 'flex',
        margin: 4,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    num:{
        flexDirection: 'row',
        margin: 3
    },
    post:{
        borderBottomColor: '#000',
        borderRadius: 10,
        padding: 5
    },
    timeOption:{
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    ImgFrame:{
        width: '100%',
        height: 450,
    },
    img:{
        width: '100%',
        height: '100%',
    },
    more:{
        alignItems: 'flex-end',
        marginRight: 5
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

export default PostCard;
