import React from 'react';
import {View, Text, StyleSheet, ImageBackground, TouchableOpacity} from 'react-native';
import Constants from 'expo-constants';
import { EvilIcons } from '@expo/vector-icons';
import CommentLikeIcon from './CommentLikeIcon'
const FullImage = (props) => {


    const goBack  = () =>{
        return props.navigation.navigate("homeProfile")
    }

    const naviCommentPage = () =>{
        return props.navigation.navigate("commentpage")
    }
    console.log({props});
    return (
        <View style={styles.container}>
            <ImageBackground source={{uri: 'https://gsa-image-store.s3.amazonaws.com/images%2F601818e784cca73928b61016-1615045264156'}} style={styles.image}>
                <View style={styles.closeView}>
                    <TouchableOpacity onPress={goBack}>
                        <EvilIcons name="close" size={35} color="black" style={styles.closeIcon}/>
                    </TouchableOpacity>
                </View>
                <View>
                   <CommentLikeIcon  size={35} naviCommentPage={naviCommentPage} commnets={1} likes={1}/>
                </View>
            </ImageBackground>
        </View>
    );
}

export default FullImage;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      //flexDirection: 'column',
      marginTop: Constants.statusBarHeight,
      width: '100%',
      height: '100%'
    },
    image: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'flex-start'
        // resizeMode: 'cover',
        // justifyContent: 'center',
        // width: null,
        // height: null,
      },
    closeView:{
        height: 'auto',
    },
    closeIcon:{
        shadowColor: "#000",
        // shadowOffset: {
        //     width: 0,
        //     height: 2,
        // },
        // color: '#b5381f',
        // fontWeight: '800',
        // shadowOpacity: 0.25,
        // shadowRadius: 3.84,
        
        // elevation: 5,
    }

})