import React, {useState, useContext} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, Modal}  from 'react-native';
import { FontAwesome5, Feather, EvilIcons, Entypo } from '@expo/vector-icons';
import CommentPage from './CommentPage';
import checkContext  from '../../Context/checkContext';
import {CREATELIKE, DELETEPOST} from '../../GraphQl/mutation';
import {ALLPOST, USERINFO} from '../../GraphQl/query';
import{useMutation} from '@apollo/client';

const PostCard = (props) =>{
    const state = useContext(checkContext);

    //determine if the user liked a post or not
    const userLike = () =>{
        let found = false;
        for(var i = 0; i < props.data.likes.length; i++) {
            if (props.data.likes[i]._id === state.userID) {
                found = true;
                break;
            }
        }

        // user id not in the like array ID
        return found
    }

    const [modalVisible, setModalVisible] = useState(false);
    const [showLikes, setShowLikes] = useState(false)
    const [showComments, setShowComments] =  useState(false)
    const [like, {error: likeError, loading: likeLoading}] =  useMutation(CREATELIKE)
    const [deletePost, {error: deleteError, loading: deleteLoading}] = useMutation(DELETEPOST)
    
    //like click event
    const likes = () =>{
        setModalVisible(true) 
        setShowComments(false)
        setShowLikes(!showLikes)       
    }
    
    //comment click event
    const comments = () =>{
        setModalVisible(true)
        setShowLikes(false)
       setShowComments(!showComments)
    }

    const open = () =>{
        setModalVisible(true)
    }
    //close click event
    const close = () =>{
        setModalVisible(false)
        setShowComments(false)
        setShowLikes(false)
    }

    //check card owner
    const owner  = props.userInfo._id == state.userID ? true : false

    // add or remove like on a post
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

    //delete a post 
    const postDelete = () =>{
        const id = state.userID
        const post = props.data._id
        if(id && post){
            deletePost({
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
                            props.userInfo.avatar !== '' &&
                            <Image style={styles.thumbnail} source={{uri: props.userInfo.avatar}}/> 
                            // <FontAwesome5 name="user-alt" size={30} color="#01294a" style={{marginLeft: 9, marginTop:5,}}/>
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
                                <FontAwesome5 name="comment" size={24} color="black" />
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
                        <Text>{ props.data.likes.length > 0? props.data.likes.length + ' likes' :''}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.more} onPress={() => open()}>
                        { owner && <Feather name="more-horizontal" size={24} color="black" />}
                    </TouchableOpacity>
                </View>
            </View>
                {/* modal for deletin a post */}
                <Modal 
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                    setModalVisible(!modalVisible);
                    }}>
                        { showLikes || showComments ? 
                    <CommentPage comments={props.data.commnets} likes={props.data.likes}
                         id={props.data._id} close={close} showLikes={showLikes} 
                         showComments={showComments}likesBtn={likes} commentsBtn={comments} />
                         :
                         <View style={styles.more_setting}>
                            <TouchableOpacity style={styles.close} onPress={() => setModalVisible(!modalVisible)}>
                                <EvilIcons name="close" size={35} color="black" />
                            </TouchableOpacity>
                            <View>
                                <TouchableOpacity style={styles.deleteBtn} onPress={() => postDelete()}>
                                    <Text style={styles.deleteText}>Delete</Text>
                                </TouchableOpacity>
                            </View>
                        </View>}
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
        borderColor: '#CCC',
        backgroundColor: '#01294a'
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
        alignItems: 'center'
    },
    commnets:{
        marginLeft: 5
    },
    bottomView:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
        marginRight: 5
    },
    likeNum:{
        marginLeft: 10
    },
    more:{
        marginRight: 5
    },
    more_setting:{
        backgroundColor: "#f0f0f0",
        marginTop: 'auto', 
        marginLeft: 5,
        marginRight: 5,
        borderRadius: 25,
        minHeight: '20%'
    },
    close:{
        margin: 10,
        alignSelf: 'flex-end'
    },
    deleteBtn:{
        alignSelf: 'center'
    },
    deleteText:{
        fontWeight: '700',
        fontSize: 21,
        color: '#d6281c'
    }
})

export default PostCard;
