import React from 'react'
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
const SearchResult = ({searResult}) => {
    const navigation = useNavigation();

    const getUserInfo = async ()=>{
        const authID  = await AsyncStorage.getItem('@userID')
        const userId = searResult._id

        if(authID !== userId){
            return navigation.navigate('User',{
                userID: userId
            })
        }else{
            return navigation.navigate('Profile')
        }
    }
    return (
        <View style={styles.result} >
            <TouchableOpacity style={styles.resImage}>
                <Image style={styles.thumbnail} source={{uri: searResult.avatar !== '' ? searResult.avatar : undefined}}/> 
            </TouchableOpacity>
            <TouchableOpacity style={styles.resInfo} onPress={() => getUserInfo()}>
                <Text style={styles.name}>{searResult.firstname} {searResult.lastname}</Text>
                <Text style={styles.school}>@{searResult.school}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default SearchResult

const styles = StyleSheet.create({
    result:{
        display: 'flex',
        flexDirection: 'row',
        paddingLeft: 10,
        borderWidth: 1,
        borderColor: '#dbdbdb',
        shadowColor: '#CCC',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
    },
    resImage:{
        width: 50,
        height: 50,
        borderWidth: 1,
        borderRadius: 100,
        borderColor: '#CCC',
        backgroundColor: '#01294a',
        marginRight: 20
    },
    thumbnail:{
        width: '100%',
        height: '100%',
        borderRadius: 100
    },
    resInfo:{
        display: 'flex',
        flexDirection: 'column',
        margin: 5
    },
    name:{
        fontSize: 18,
        fontWeight: 'bold',
        textTransform: 'capitalize'
    },
    school:{
        color: '#6084f7'
    }
})