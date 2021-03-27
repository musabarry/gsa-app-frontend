import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity}  from 'react-native';
import { FontAwesome5, EvilIcons } from '@expo/vector-icons';
import FullImage from  './FullImage'
import CommentLikeIcon from './CommentLikeIcon';


const PostCard = (props) =>{
    
 

    return(
        <View style={styles.card_wrapper}>
            <View style={styles.top_wrapper}>
                <View><FontAwesome5 name="user-alt" size={24} color="black" /></View>
                <View style={styles.nameBox}>
                    <Text style={styles.name}>firstname lastname</Text>
                    <Text style={styles.school}>@School</Text>
                </View>
            </View >
            <View style={styles.middle_wrapper}>
                <View style={styles.post}>
                {props.uri[0] != null ?
                    (
                    <TouchableOpacity style={styles.ImgFrame}>
                        <Image style={styles.img} source={{uri: props.uri[0]}}/>
                    </TouchableOpacity>
                    ):(
                    <Text style={styles.textPost}>
                        {props.data.text}
                    </Text>
                    )}
                    <View style={styles.timeOption}>
                        <Text>6:09 pm . May, 5, 2014</Text>
                        <Text>...</Text>
                    </View>
                </View>
                <View style={styles.likes}>
                    <CommentLikeIcon likes={props.data.likes.length} 
                                    commnets={props.data.commnets.length}  size={25}  
                                    data={props.data.commnets} id={props.data._id} 
                                    navHome={props.navHome} navScreen={props.navScreen}/>
                </View>
            </View>
            <View style={styles.bottom_wrapper}>
            </View>
        </View>
    )
}

const styles =  StyleSheet.create({
    card_wrapper:{
        //minHeight: 90,
        backgroundColor: '#dbdbdb',
        borderWidth: 1,
        borderColor: '#dbdbdb',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        //width: '100%',
        borderRadius: 10,
        marginTop: 20
    },
    top_wrapper:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'baseline',
        flexWrap: 'wrap',
        margin: 4,
        alignItems: 'center'
        // borderBottomColor: '#000',
        // borderBottomWidth: 1
    },
    nameBox:{
        marginLeft: 10,
        flexDirection: 'column',
    },
    middle_wrapper:{
        borderRadius: 10
        
    },
    likes:{
        margin: 4,
        flexDirection: 'row',
        alignItems: 'center'
    },
    num:{
        flexDirection: 'row',
        margin: 3
    },
    post:{
        borderBottomColor: '#000',
        borderBottomWidth: 1,
        backgroundColor: '#f2ebdc',
        borderRadius: 10,
        padding: 5
    },
    timeOption:{
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    textPost:{

    },
    ImgFrame:{
        width: '100%',
        height: 500,
    },
    img:{
        width: '100%',
        height: '100%',
    }

})

export default PostCard;
