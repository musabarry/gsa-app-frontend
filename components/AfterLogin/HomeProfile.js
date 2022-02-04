import React, {useEffect, useState} from 'react'
import {View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Button} from 'react-native';
import{useQuery} from '@apollo/client';
import {GETUSER} from "../../GraphQl/query";
import Loading from '../BeforeLogin/loading'
import { FontAwesome5 } from '@expo/vector-icons';
import PostCard from '../Card/PostCard';
const HomeProfile = (props) => {

    const [personalInfo, setpersonalInfo] = useState([])
    const [postData, setPostData] = useState([])
    

    const user =props.route.params.userID;
   
    const {data, error, loading} = useQuery(
        GETUSER, 
        {
            variables:{user: user}
        }
    );
    

    useEffect(()=>{
        if(!loading && data){
            if(data.getUser.info){
                setpersonalInfo(data.getUser.info)
            }
            if(data.getUser.posts){
                setPostData(data.getUser.posts)
            }
        }
    }, [loading])

    if(loading){
        return(
            <Loading />
        )
    }

    if(data){
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backBtn} onPress={() => props.navigation.goBack()}>
                        <Text style={styles.backText}>Back</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView style={styles.userContainer}>
                    <View style={styles.userInfo}>
                        <View style={styles.image_wrape}>
                            {personalInfo.avatar ? <Image style={styles.image} source={{uri: `${personalInfo.avatar}`}} />:
                             <FontAwesome5 name="user-alt" size={250} color="#01294a" />}
                        </View>
                        <View style={styles.details}>
                            <View style={styles.info}>
                                <Text style={styles.textInfo}>{personalInfo.firstname} {personalInfo.lastname}</Text>
                                <View style={styles.schoolWrap}> 
                                    <FontAwesome5 name="school" size={24} color="#0051ff" />  
                                    <Text  style={styles.school}>{personalInfo.school}</Text>
                                </View>
                                <Text  style={styles.textInfo}>{personalInfo.major}</Text>
                                <Text  style={styles.textInfo}>{personalInfo.role}</Text>
                            </View>
                            <View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.userPosts}>
                        {postData && postData.map(item =>{
                            return <PostCard uri={item.imageAlbum ? item.imageAlbum[0] : null} 
                            data={item} key={item._id} 
                            userInfo={personalInfo}
                            navHome={"Profile"} navScreen={"homeProfile"}/>
                        })}
                    </View>
                </ScrollView>
            </View>
        )
    }
}

export default HomeProfile

const styles = StyleSheet.create({
    userContainer:{
        height: '100%'
    },
    header:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#ededed',
        borderBottomWidth: 1,
        borderBottomColor: '#cae8e8',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity:  0.3,
        shadowRadius: 3,
    },
    backBtn:{
        marginLeft: 5
    },
    backText:{
        fontWeight: '700',
        fontSize: 19,
        color: '#82b5ff'
    },
    image_wrape:{
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 240,
    },
    image:{
        borderRadius: 5,
        height: '100%',
        width: '100%',
    },
    details:{
        display: 'flex',
        flexDirection: 'column'
    },
    info:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        alignItems: 'baseline',
        borderBottomColor: '#c9cfff',
        borderBottomWidth: 1,
        shadowColor: '#c9cfff',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity:  0.2,
        shadowRadius: 3,
        elevation: 1,
    },
    textInfo:{
        fontSize: 16,
        fontWeight: '700'
    },
    schoolWrap:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'baseline',
        alignSelf: 'baseline',
    },
    school:{
        marginLeft: 10
    }
})