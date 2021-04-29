import React, {useState, useContext} from 'react';
import {View, Text, StyleSheet, TouchableOpacity,
 TextInput, ScrollView} from 'react-native';
import Constants from 'expo-constants';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import CommentList from './CommentList'
import { KeyboardAccessoryView } from 'react-native-keyboard-accessory'
import{useMutation} from '@apollo/client';
import {CREATECOMMENT} from '../../GraphQl/mutation';
import {ALLPOST, USERINFO} from '../../GraphQl/query';
import LikesList from './LikesList';
const CommentPage = (props) => {

    //const data= props.route.params.data
    //const navScreen = props.route.params.navScreen
    //const navHome = props.route.params.navHome
    const [createCommnet, {error, loading}] =  useMutation(CREATECOMMENT)
    const initialText = '';
    const [commenText, setComentText] = useState(initialText);
    
    const submit = () =>{
        
        if(commenText.length > 1){
            createCommnet({
                variables:{
                    post: `${props.id}`,
                    text: commenText
                },
                refetchQueries: [{query: ALLPOST}, {query: USERINFO}]
            }).then(res =>{
                setComentText(initialText)
            }).catch(error =>{
                console.log({error});
            }) 
        }
    }
    return (
        <View style={styles.container}  >
            <View style={styles.top}>
                <TouchableOpacity onPress={() => props.close()}>
                    <Text style={styles.backText}>Back</Text>
                </TouchableOpacity>
                <View style={styles.likeComment}>
                    <TouchableOpacity style={styles.btn} onPress={() => props.likesBtn()}>
                        <Text style={styles.btn_text}>Likes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn} onPress={() => props.commentsBtn()}>
                        <Text style={styles.btn_text}>Comments</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView  keyboardShouldPersistTaps='handled'>
                <View>
                {  props.showComments && !props.showLikes ? props.comments.map(item => <CommentList item={item} 
                        key={item._id} keys={item._id}/>) : props.likes.map(item => <LikesList item={item} 
                        key={item._id} keys={item._id} />) 
                }
                </View>
            </ScrollView>
            {!props.showLikes && <KeyboardAccessoryView 
                    style={styles.keyboardView} 
                    alwaysVisible={true}
                    avoidKeyboard={true}
                    >
                 {({ isKeyboardVisible }) => (
            <View style={styles.comment_box} >
                <TextInput 
                placeholder="Add a comment" 
                style={styles.comment_input}
                //blurOnSubmit={false}
                keyboardAppearance="default"
                autoFocus={true}
                multiline={true}
                maxLength={250}
                value={commenText}
                onChangeText={(text) =>  setComentText(text)}
                placeholderTextColor="#243333"
                spellCheck={true}
                />
                 
                <TouchableOpacity style={styles.post_btn} onPress={() => submit()}>
                    <Text style={styles.post_text}>Post</Text>
                </TouchableOpacity>
                 
            </View>
            )}
            </KeyboardAccessoryView>}
        </View>
    );
}

export default CommentPage;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "#f2f1ed",
        marginTop: Constants.statusBarHeight,
    },
    header:{
        display: 'flex',
        flexDirection: 'column',
    },
    // btn:{
    //     display: 'flex',
    //     flexDirection: 'row',
    //     justifyContent: 'space-between',
    //     backgroundColor: '#d9d9d9',
    //     padding: 5
    // },
    back_Btn:{
        marginLeft: 10,
    },
    back:{
        fontSize: 18,
        fontWeight: '700',
        color: '#016191'
    },
    title:{
        alignSelf: 'center',
    },
    titleText:{
        fontWeight: '600',
        fontSize: 18,
        alignSelf: 'center'
    },
    keyboardView:{
        display: 'flex',
        flexDirection: 'column',
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10
    },
    comment_box:{
        margin: 5,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "flex-end",
        backgroundColor: '#ededed',
       // marginBottom: 75,
       //display: "flex",
      
    },
    comment_input:{
        borderWidth: 2,
        borderRadius: 10,
        borderColor: "#CCC",
        backgroundColor: "#f0eded",
        padding: 10,
        fontSize: 16,
        marginRight: 10,
        textAlignVertical: "top",
        minHeight: 70,
        maxHeight: 100,
        width: '85%',
    },
    post_btn:{
        backgroundColor: '#0076d1',
        paddingTop: 6,
        paddingBottom: 6,
        paddingLeft: 12,
        paddingRight: 12,
        borderRadius: 10,
    
        //alignSelf: "flex-end",
        //marginLeft: 2,
    },
    post_text:{
        fontSize: 16,
        textAlign: 'center',
        fontWeight: '600',
    },

    //
    top:{
        display: 'flex',
        flexDirection: 'column',
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 10
    },
    backText:{
        fontSize: 18,
        fontWeight: '600'
    },
    likeComment:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        paddingTop: 8
    },
    btn:{
        width: '49%',
        backgroundColor: '#a6a5a1',
        alignItems: 'center'
    },
    btn_text:{
        padding: 5,
        fontSize: 18,
        fontWeight: '700'
    }

})
