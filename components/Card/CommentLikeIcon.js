import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import {EvilIcons } from '@expo/vector-icons';

//comment & like button component
const CommentLike = (props) => {

    
    return (
        <View style={styles.wrap}>
            <TouchableOpacity style={styles.num} onPress={ () => props.updateLike() }>
                <EvilIcons name="heart" size={props.size}  color="black" /> 
                <Text>{props.likes}</Text>
            </TouchableOpacity>
            <TouchableOpacity   
                style={styles.num}
                onPress={() => props.comments()}>
                <EvilIcons name="comment" size={props.size} color={"black"} /> 
                <Text style={styles.commnets}>{props.commnets}</Text>
            </TouchableOpacity>
        </View>
    );
}

export default CommentLike;

const styles =  StyleSheet.create({
    wrap:{
        flexDirection: 'row',
        alignItems: 'center'
    },
    num:{
        flexDirection: 'row',
        margin: 3
    },
    commnets:{
        color: '#000'
    }
})