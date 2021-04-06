import React, {useContext} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import {EvilIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import authContext  from '../../Context/authContext';
const CommentLike = (props) => {
    const navigation = useNavigation();

    
    return (
        <View style={styles.wrap}>
            <TouchableOpacity style={styles.num} onPress={() => console.log(props.id)}>
                <EvilIcons name="heart" size={props.size}  color="black" /> 
                <Text>{props.likes}</Text>
            </TouchableOpacity>
            <TouchableOpacity   
                style={styles.num} 
                onPress={() => navigation.navigate('Profile', {
                    screen: 'commentpage',
                    params: {data: props.data, navHome: props.navHome, navScreen: props.navScreen, id: props.id}
                })}>
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