import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity,ScrollView, 
    SafeAreaView, KeyboardAvoidingView, Platform} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CommentList from './CommentList'
import{useMutation} from '@apollo/client';
import {CREATECOMMENT} from '../../GraphQl/mutation';
import {ALLPOST, USERINFO, GETCOMMENTS} from '../../GraphQl/query';
import InputCom from '../InputCom';
import{useQuery} from '@apollo/client';
import Loading from '../BeforeLogin/loading';

const CommentPage = (props) => {

    const navigation = useNavigation();
    const [createCommnet, {error: createError , loading: createLoading}] =  useMutation(CREATECOMMENT)
    const [msgText, setMsgText] = useState('');
    const [comments, setComments] = useState([])
    const postID = props.route.params.id
    const navBarHeight = (Platform.OS === 'ios') ? 47 : 100;
    //const comments = props.route.params.comments

    const {data, error, loading} = useQuery(GETCOMMENTS, 
        {
            variables:{post: postID}
        }
    )

    const submit = () =>{
        if(msgText.length > 1){
            createCommnet({
                variables:{
                    post: `${postID}`,
                    text: msgText
                },
                refetchQueries: [{query: ALLPOST}, {query: USERINFO}]
            }).then(res =>{
                console.log(res);
                setMsgText('')
            }).catch(error =>{
                console.log({error});
            }) 
        }
    }

    useEffect(() =>{
        if(data){
            setComments(data.getComments)
        }
    }, [data, postID])

    const goBack =() =>{
        return navigation.goBack()
    }

    //return either the comments or users like base on which button(like | comment) is clicked
    return (
        <SafeAreaView style={styles.container}  >
            <View style={styles.header}>
                <TouchableOpacity onPress={() => goBack()}>
                    <Text style={styles.backText}>Back</Text>
                </TouchableOpacity>
                <View style={{flex:1,justifyContent: "center",alignItems: "center"}}>
                    <Text style={{textAlign: 'center', 
                    textAlignVertical: 'center',
                     fontSize: 21,
                     fontWeight: 'bold'}}>Comments</Text>
                </View>
            </View>
            <ScrollView>
             
                {/* return either the comments or users like base on which button(like | comment) is clicked */}
                { loading?   <Loading /> :  comments.map(item => <CommentList item={item} 
                        key={item._id} keys={item._id}/>)
                }
            </ScrollView>
            {/* comment page is true, show comment input*/}
            <KeyboardAvoidingView 
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={navBarHeight}>
                <InputCom 
                    textPlaceholder={'Add a comment'}
                    msgText={msgText}
                    setMsgText={setMsgText}
                    submit={submit}
                    btnText={'Post'}/>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

export default CommentPage;

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    header:{      
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'baseline',
        backgroundColor: '#ededed',
        borderBottomWidth: 1,
        borderBottomColor: '#cae8e8',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity:  0.3,
        shadowRadius: 3,
        marginBottom: 10,
    },
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
    backText:{
        fontSize: 18,
        fontWeight: '600',
        color: '#5cacf7',
        marginLeft: 6
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
    },
    keyboardStyle:{
        backgroundColor: 'red'
    }

})
