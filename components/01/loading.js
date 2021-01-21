import React, { useState, useContext } from "react";
import { StyleSheet, View, ActivityIndicator
} from "react-native";


const Loading = () =>{
    const color =  'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')'
    return (
      <View style={[styles.loading, styles.horizontal]}>
        <ActivityIndicator size="large" color={color} />
      </View>
    )
}

const styles = StyleSheet.create({
    loading:{
        flex: 1,
        backgroundColor: '#c9d9f2',
        justifyContent: "center",
      },
      horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
      },
})

export default Loading;