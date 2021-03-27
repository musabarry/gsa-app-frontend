import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity,
     FlatList, TextInput, Platform, ScrollView, InputAccessoryView} from 'react-native';
import Constants from 'expo-constants';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TabRouter, useNavigation } from '@react-navigation/native';
import CommentList from './CommentList'

const CommentPage = (props) => {
    const data= props.route.params.data
    const navScreen = props.route.params.navScreen
    const navHome = props.route.params.navHome

    const navigation = useNavigation();
    const goBack  = () =>{
        if(navScreen.length > 1){

             return navigation.goBack() //('Profile', {screen: "homeProfile"})
            
        }else{
           return navigation.reset({index: 0, routes: [{name: 'Home'}],}) //navigate("Home")
        }
    }
    const inputAccessoryViewID = 'uniqueID';
    // if(!data){
    //     return(
    //         <Loading />
    //     )
    // }

    return (
        <View style={styles.container} keyboardDismissMode="interactive" >
            <View style={styles.header}>
                <View style={styles.btn}>
                    <TouchableOpacity onPress={goBack} style={styles.back}>
                        <MaterialCommunityIcons name="less-than" size={30} color="black" />
                    </TouchableOpacity>
                    <View style={styles.title}>
                        <Text style={styles.commentText}>Comments</Text>
                    </View>
                    <View>
                    </View>
                </View>
            </View>
            <ScrollView >
                <View>
                {data.map(item => <CommentList item={item} key={data} keys={item._id}/>)} 
                </View>
            </ScrollView>
            <InputAccessoryView 
                    style={styles.keyboardView} 
                    nativeID={inputAccessoryViewID}
                    >
            <View style={styles.comment_box}>
                <TextInput 
                placeholder="Add a comment" 
                style={styles.comment_input}
                inputAccessoryViewID={inputAccessoryViewID}
                blurOnSubmit={false}
                autoFocus={true}
                keyboardType="ascii-capable"
                multiline={true}
                />
                <TouchableOpacity style={styles.post_btn}>
                    <Text style={styles.post_text}>Post</Text>
                </TouchableOpacity>
            </View>
        
            </InputAccessoryView>
        </View>
    );
}

export default CommentPage;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        marginTop: Constants.statusBarHeight,
    },
    header:{
        display: 'flex',
        flexDirection: 'column',
    },
    btn:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#d9d9d9',
        padding: 5
    },
    back:{
        borderColor: '#d9d9d5',
        borderRightWidth: 2,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    title:{
        alignSelf: 'center',
    },
    likes:{
        width: '48%',
        borderColor: '#d9d9d9',
        borderLeftWidth: 2,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    commentText:{
        fontWeight: '600',
        fontSize: 18,
        alignSelf: 'center'
    },
    likeText:{
        fontWeight: '800',
        fontSize: 22,
        alignSelf: 'center'
    },
    comment_wrapper:{
        backgroundColor: '#e6e6e6',
        display: 'flex',
        flexDirection: 'column',
        borderColor: '#000',
        borderWidth: 1
    },
    info:{
        display: 'flex',
        flexDirection: 'row'
    },
    name:{
        marginLeft: 10
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
    },
    comment_box:{
        display: "flex",
        flexDirection: 'row',
    },
    comment_input:{
        borderWidth: 1,
        borderColor: '#595959',
        minHeight: 40,
        maxHeight: 100,
        width: '85%',
        borderRadius: 5,
        padding: 5,
    },
    post_btn:{
        backgroundColor: '#0076d1',
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 11,
        paddingRight: 11,
        borderRadius: 10,
        alignSelf: "flex-end",
        marginLeft: 2,
    },
    post_text:{
        fontSize: 16,
        textAlign: 'center',
        fontWeight: '600',
    },
    keyboardView:{
        //borderColor: "red",
        padding: 2
    }

})
