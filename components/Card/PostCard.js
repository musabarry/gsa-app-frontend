import React, {useState, useContext, useEffect} from 'react';
import {View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Modal}  from 'react-native';
import { FontAwesome5, Feather, EvilIcons, Entypo } from '@expo/vector-icons';
import checkContext  from '../../Context/checkContext';
import {CREATELIKE, DELETEPOST} from '../../GraphQl/mutation';
import {ALLPOST, USERINFO} from '../../GraphQl/query';
import{useMutation} from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import TextCom from './TextCom';

const PostCard = (props) =>{
    const state = useContext(checkContext);
    const navigation = useNavigation();
    //determine if the user liked a post or not

    const [modalVisible, setModalVisible] = useState(false);
    const [like, {error: likeError, loading: likeLoading}] =  useMutation(CREATELIKE)
    const [deletePost, {error: deleteError, loading: deleteLoading}] = useMutation(DELETEPOST)

    useEffect(() =>{
 
    }, [updateLike])



    const routeToComment = async ()=>{
        return navigation.navigate('commentpage',{
             id: props.data._id,
        })

    }

    const routeToLikes =  async () =>{
        return navigation.navigate('likepage',{
             likes: props.data.likes,
             id: props.data._id,
        })
    }

    //check card owner
    const owner  = props.userInfo._id == state.userID ? true : false
    
    //double tap image like
    let lastImagePress = 0
    const doubleLike = ()=>{
        const time = new Date().getTime();
        const delta = time - lastImagePress

        const double_press_delay = 300;
        if (delta < double_press_delay) {
            updateLike()
        }else {
            lastImagePress = time;
        }
    }
    // add or remove like on a post
    const updateLike = async () =>{
        const id =  await AsyncStorage.getItem('@userID')
        const post = props.data._id
        if(id && post){
            like({
                variables:{
                    post: post
                },
                refetchQueries: [{query: ALLPOST}, {query: USERINFO}]
            }).then(res =>{

            }).catch(error =>{
    

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
                setModalVisible(!modalVisible)
            }).catch(error =>{
                setModalVisible(!modalVisible)
            })
        }
    }

    const getUserInfo = ()=>{
        let home =  props.fromHome
        if(!owner && home){
            return navigation.navigate('User',{
                userID: props.userInfo._id
            })
        }else{
            return navigation.navigate('Profile')
        }
    }

return(
    <View>
        <View style={styles.card_wrapper}>
            <View style={styles.top_wrapper}>
                <View style={styles.thumbnail_wraper}>
                    {
                        props.userInfo.avatar !== '' &&
                        <Image style={styles.thumbnail} source={{uri: `${props.userInfo.avatar}`}}/> 
                    }
                </View>
                <View style={styles.nameBox}>
                    <TouchableOpacity style={styles.NameContainer} onPress={() => getUserInfo()}>
                        <Text style={styles.name}>{props.userInfo.firstname} {props.userInfo.lastname}</Text>
                    </TouchableOpacity>
                    <Text style={styles.school}>@{props.userInfo.school}</Text>
                </View>
            </View >
            <View style={styles.middle_wrapper}>
                <View style={styles.post}>
                {props.uri != null ?
                    (
                    <>
                    <TextCom  textData={props.data.text} max_line={5} />
                    <TouchableOpacity style={styles.ImgFrame} activeOpacity={0.3}
                        onPress={() => doubleLike()}>
                            {
                            <Image style={styles.img} source={{uri: `${props.uri}`}}/>
                            }
                    </TouchableOpacity></>
                    ):(
                        <TextCom  textData={props.data.text} max_line={5} />
                    )}
                </View>
                <View style={styles.bottom_wrapper}>
                    <View style={styles.wrap}>
                        <TouchableOpacity style={styles.num} onPress={() => updateLike()}>
                            <Entypo name={props.data.userLiked ? 'heart' : 'heart-outlined'} size={26} color={props.data.userLiked ? 'red' : 'black'} />
                        </TouchableOpacity>
                        <TouchableOpacity   
                            style={styles.num}
                            onPress={() => routeToComment()}>
                            <FontAwesome5 name="comment" size={24} color="black" />
                            <Text style={styles.commnets}>{props.data.commnets}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.timeOption}>
                        <Text>{props.data.date}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.bottomView}>
                <TouchableOpacity style={styles.likeNum} onPress={() => routeToLikes()}>
                    <Text>{ props.data.likes.length > 0? props.data.likes.length + ' likes' :''}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.more} onPress={() => setModalVisible(!modalVisible)}>
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
                        <View style={styles.more_setting}>
                        <TouchableOpacity style={styles.close} onPress={() => setModalVisible(!modalVisible)}>
                            <EvilIcons name="close" size={35} color="black" />
                        </TouchableOpacity>
                        <View>
                            <TouchableOpacity style={styles.deleteBtn} onPress={() => postDelete()}>
                                <Text style={styles.deleteText}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/* // } */}
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
        marginBottom: 15,
        fontSize: 14,
        flexShrink: 1,
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
    post:{
        padding: 5,
    },
    timeOption:{
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    ImgFrame:{
        width: '100%',
        height: 450,
        alignItems:'center',
        justifyContent:"center"  
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
        backgroundColor: '#01294a',
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
    },
    name:{
        fontWeight: '700',
        color: '#0263eb'
    },
    NameContainer:{
        marginBottom: 5
    }
})

export default PostCard;
