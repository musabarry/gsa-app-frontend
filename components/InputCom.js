import React from 'react'
import {View, TextInput, TouchableOpacity, Text, StyleSheet, Dimensions} from 'react-native'
const InputCom = (props) => {



    
    return (
            <View style={styles.comment_box}>
                <TextInput 
                    placeholder={props.textPlaceholder}
                    style={styles.comment_input}
                    keyboardAppearance="default"
                    autoFocus={true}
                    multiline={true}
                    maxLength={250}
                    value={props.msgText}
                    onChangeText={(text) =>  props.setMsgText(text)}
                    placeholderTextColor="#243333"
                    spellCheck={true}
                    dataDetectorTypes={'all'}
                    returnKeyType='done'
                />
                <TouchableOpacity style={styles.post_btn} onPress={() => props.submit()}>
                    <Text style={styles.post_text}>{props.btnText}</Text>
                </TouchableOpacity>
            </View>
    )
}

export default InputCom;
const width = Dimensions.get('window').width
const styles = StyleSheet.create({
    comment_box:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'baseline',
        alignSelf: 'stretch',
        padding: 5,
    },
    comment_input:{
        borderWidth: 2,
        borderRadius: 25,
        borderColor: "#CCC",
        backgroundColor: "#f0eded",
        padding: 15,
        fontSize: 16,
        marginRight: 10,
        minHeight: 10,
        maxHeight: 90,
        width: '80%',
        flex: 1,
    },
    post_btn:{
        backgroundColor: '#0076d1',
        borderRadius: 10,
    },
    post_text:{
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
        fontWeight: '600',
        paddingTop: 6,
        paddingBottom: 7,
        paddingLeft: 10,
        paddingRight: 10 
    },
})
