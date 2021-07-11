import React from 'react';
import {View, Text, StyleSheet} from 'react-native'
import Constants from 'expo-constants';
const Message = () => {
    return (
        <View style={styles.container}>
            <Text>Message</Text>
        </View>
    );
}

export default Message;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        //marginTop: Constants.statusBarHeight,
    }
})
