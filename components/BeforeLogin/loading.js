import React, { useState, useEffect } from "react";
import { StyleSheet, View, ActivityIndicator
} from "react-native";
import Constants from 'expo-constants';

const Loading = () =>{
    const [actiColor, setActColor] = useState(colorLoad)
    const [out, setOut] = useState(outCircle)
    const [inner, setInner] = useState(innerCircle)
    const colorLoad =  'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')'
    const outCircle =  'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')'
    const innerCircle =  'rgb(' + (Math.floor(Math.random() * 250)) + ',' + (Math.floor(Math.random() * 100)) + ',' + (Math.floor(Math.random() * 200)) + ')'
    

    useEffect(() =>{ 
      const interval = setInterval(() => {
        setActColor(colorLoad)
        setInner(innerCircle)
        setOut(outCircle)
      }, 1000);
      return () => clearInterval(interval);
    })

    return (
      <View style={styles.loading}>
        {/* <View style={[styles.center, {backgroundColor: `${out}`}]}>
            <View style={[styles.circle, {backgroundColor: `${inner+out}`}]}>
              <View style={[styles.innerSmal, {backgroundColor:`${out}`}]}>
                <View style={[styles.innerXSmal, {backgroundColor:`${inner}`}]}> */}
                  <ActivityIndicator size="large" color='#0866ff'  animating={true}/>
                {/* </View>
              </View>
            </View>
        </View> */}
      </View>
    )
}

const styles = StyleSheet.create({
    loading:{
      flex: 1,
      alignItems: 'center',
      marginTop: Constants.statusBarHeight,
      opacity: 0.8,
      alignItems:'center',
      justifyContent:"center"  
      },
      center: {
        marginTop: 200,
        width: 200,
        height: 200,
        borderRadius: 100,
        display: 'flex',
        justifyContent: 'center'
      },
      circle:{
        width: 170,
        height: 170,
        borderRadius: 100,
        alignSelf: 'center',
        display: 'flex',
        justifyContent: 'center'
      },
      innerSmal:{
        width: 140,
        height: 140,
        borderRadius: 100,
        alignSelf: 'center',
        display: 'flex',
        justifyContent: 'center'
      },
      innerXSmal:{
        width: 110,
        height: 110,
        borderRadius: 100,
        alignSelf: 'center',
        display: 'flex',
        justifyContent: 'center'
      }
})

export default Loading;
