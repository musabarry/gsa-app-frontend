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

const CommentPage = (props) => {

    const data= props.route.params.data
    const navScreen = props.route.params.navScreen
    const navHome = props.route.params.navHome
    const [createCommnet, {error, loading}] =  useMutation(CREATECOMMENT)

    const navigation = useNavigation();

    const goBack  = () =>{
        if(navScreen.length > 1){
             return navigation.goBack() //('Profile', {screen: "homeProfile"})
        }else{
           return navigation.reset({index: 0, routes: [{name: 'Home'}],}) //navigate("Home")
        }
    }

    const [commenText, setComentText] = useState('');

    const submit = () =>{
        //if(commenText.length > 1 && props.route.params.id){
            createCommnet({
                variables:{
                    post: `${props.route.params.id}`,
                    text: commenText
                }
            }).then(res =>{
                console.log(res);
            }).catch(error =>{
                console.log(error);
            })
        }

    return (
        <View style={styles.container}  >
            <View style={styles.header}>
                <View style={styles.btn}>
                    <TouchableOpacity onPress={goBack} style={styles.back}>
                        <MaterialCommunityIcons name="less-than" size={30} color="black" />
                    </TouchableOpacity>
                    <View style={styles.title}>
                        <Text style={styles.titleText}>Comments</Text>
                    </View>
                    <View>
                    </View>
                </View>
            </View>
            <ScrollView keyboardShouldPersistTaps="always">
                <View>
                {data.map(item => <CommentList item={item} key={item._id} keys={item._id}/>)} 
                </View>
            </ScrollView>
            <KeyboardAccessoryView 
                    style={styles.keyboardView} 
                    alwaysVisible={true}
                    avoidKeyboard>
                 {({ isKeyboardVisible }) => (
            <View style={styles.comment_box}>
                <TextInput 
                placeholder="Add a comment" 
                style={styles.comment_input}
                //blurOnSubmit={false}
                keyboardAppearance="default"
                autoFocus={true}
                multiline={true}
                maxLength={250}
                onChangeText={(text) =>  setComentText(text)}
                placeholderTextColor="#243333"
                spellCheck={true}
                />
                 {isKeyboardVisible && (
                <TouchableOpacity style={styles.post_btn} onPress={() => submit()}>
                    <Text style={styles.post_text}>Post</Text>
                </TouchableOpacity>
                 )}
            </View>
            )}
            </KeyboardAccessoryView>
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
    titleText:{
        fontWeight: '600',
        fontSize: 18,
        alignSelf: 'center'
    },
    comment_box:{
        padding: 5,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "flex-end",
        backgroundColor: '#ededed',
        marginBottom: -75,
       // display: "flex",
      
    },
    comment_input:{
        //flexGrow: 1,
        borderWidth: 2,
        borderRadius: 10,
        borderColor: "#CCC",
        backgroundColor: "#f0eded",
        padding: 10,
        fontSize: 16,
        marginRight: 10,
        textAlignVertical: "top",
        
        // borderWidth: 1,
        // borderColor: '#595959',
        minHeight: 70,
        maxHeight: 100,
        width: '85%',
        // borderRadius: 5,
        // padding: 5,
    },
    post_btn:{
        backgroundColor: '#0076d1',
        paddingTop: 6,
        paddingBottom: 6,
        paddingLeft: 12,
        paddingRight: 12,
        borderRadius: 10,
        alignSelf: "flex-end",
        //marginLeft: 2,
    },
    post_text:{
        fontSize: 16,
        textAlign: 'center',
        fontWeight: '600',
    },

})
