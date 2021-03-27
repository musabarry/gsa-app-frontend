import React, {Component} from 'react'
import {Text, View, StyleSheet, ScrollView} from 'react-native';
import Constants from 'expo-constants';
import{useQuery} from '@apollo/client';
import {ALLPOST } from "../../GraphQl/query";
import Loading from '..//01/loading';
import PostCard from '../Card/PostCard';
const Home = () => {
    const {error, data, loading} =  useQuery(ALLPOST)

    if(loading){
        return(
            <Loading />
        )
    }
    
    return(
        <View style={styles.container}>
           <ScrollView>
           {data.allPost.map(item =>{
                return <PostCard uri={item.imageAlbum ? item.imageAlbum : ''} 
                        data={item} key={item._id} 
                        navHome={"Home"} navScreen={""}/>
              })}
           </ScrollView>
        </View>
    )
    
}






const styles =  StyleSheet.create({
    container:{
        flex: 1,
        marginTop: Constants.statusBarHeight,
    }
})

export default Home;