
import React, {Component} from 'react'
import {Text, View, StyleSheet} from 'react-native';
import Constants from 'expo-constants';

class Home extends Component{

    render(){
   
        return(
            <View style={styles.container}>
                <Text>Home</Text>
            </View>
        )
    }
}






const styles =  StyleSheet.create({
    container:{
        flex: 1,
        marginTop: Constants.statusBarHeight,
    }
})

export default Home;