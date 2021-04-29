import React, {useState, useContext} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, Modal}  from 'react-native';
import { FontAwesome5, Feather, EvilIcons, Entypo } from '@expo/vector-icons';
import CommentPage from './CommentPage';
import checkContext  from '../../Context/checkContext';
import {CREATELIKE} from '../../GraphQl/mutation';
import {ALLPOST, USERINFO} from '../../GraphQl/query';
import{useMutation} from '@apollo/client';

const PostCard = (props) =>{
    const state = useContext(checkContext);
    const userLike = () =>{
        let found = false;
        for(var i = 0; i < props.data.likes.length; i++) {
            if (props.data.likes[i]._id === state.userID) {
                found = true;
                break;
            }
        }
        return found
    }

    const [modalVisible, setModalVisible] = useState(false);
    const [showLikes, setShowLikes] = useState(false)
    const [showComments, setShowComments] =  useState(false)
    const [like, {error, loading}] =  useMutation(CREATELIKE)
    const [likeIcon , setLikeIcon] = useState( userLike() ? 'heart' : 'heart-outlined' )

    const likes = () =>{
        setModalVisible(true) 
        setShowComments(false)
        setShowLikes(!showLikes)       
    }
 

    const comments = () =>{
        setModalVisible(true)
        setShowLikes(false)
       setShowComments(!showComments)
    }

    const close = () =>{
        setModalVisible(false)
        setShowComments(false)
        setShowLikes(false)
    }

    const updateLike = () =>{
        const id = state.userID
        const post = props.data._id
        if(id && post){
            like({
                variables:{
                    post: post
                },
                refetchQueries: [{query: ALLPOST}, {query: USERINFO}]
            }).then(res =>{
                userLike()
            }).catch(error =>{
                console.log(error);
            })
        }
    }



    return(
        <View>
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
                        <TouchableOpacity style={styles.ImgFrame} activeOpacity={0.3}>
                            <Image style={styles.img} source={{uri: props.uri[0]}}/>
                        </TouchableOpacity></>
                        ):(
                        <Text style={styles.textPost}>
                            {props.data.text}
                        </Text>
                        )}
                    </View>
                    <View style={styles.bottom_wrapper}>
                        <View style={styles.wrap}>
                            <TouchableOpacity style={styles.num} onPress={ () => updateLike()}>
                                <Entypo name={userLike() ? 'heart' : 'heart-outlined'} size={26} color={userLike() ? 'red' : 'black'} />
                            </TouchableOpacity>
                            <TouchableOpacity   
                                style={styles.num}
                                onPress={() => comments()}>
                                <EvilIcons name="comment" size={29} color={"black"} /> 
                                <Text style={styles.commnets}>{props.data.commnets.length}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.timeOption}>
                            <Text>{props.data.date}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.bottomView}>
                    <TouchableOpacity style={styles.likeNum} onPress={() => likes()}>
                        <Text>{ props.data.likes.length > 0? props.data.likes.length :''}</Text>
                    </TouchableOpacity>
                    <View style={styles.more}>
                                <Feather name="more-horizontal" size={24} color="black" />
                    </View>
                </View>
            </View>
                <Modal 
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                    setModalVisible(!modalVisible);
                    }}>
                    <CommentPage  comments={props.data.commnets} likes={props.data.likes}
                         id={props.data._id} close={close} showLikes={showLikes} 
                         showComments={showComments}likesBtn={likes} commentsBtn={comments} />
                </Modal>
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
    // num:{
    //     flexDirection: 'row',
    //     margin: 3
    // },
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
    },
    modalView:{
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: '#dbdbdb'
    },
    wrap:{
        flexDirection: 'row',
        alignItems: 'center'
    },
    num:{
        flexDirection: 'row',
        margin: 3,
    
    },
    commnets:{
        color: '#000'
    },
    bottomView:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    likeNum:{
        marginLeft: 10
    },
    more:{
        marginRight: 5
    },
})

export default PostCard;
