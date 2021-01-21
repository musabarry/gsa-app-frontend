import React, { Component, useEffect, useState } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Dimensions
} from "react-native";
import{useQuery} from '@apollo/client';
import { USERINFO } from "../../GraphQl/query";
import { AntDesign, EvilIcons } from '@expo/vector-icons';
import Loading from '..//01/loading'


const ProfileInfo = (props) =>{
    const {error, data, loading} =  useQuery(USERINFO)
    const [info, setInfo] = useState([])

    useEffect(() => {
        if(data){
          setInfo(data.userInfo[0])
          
        }
       
      }, [data]);
    
    if(loading){
        return(
            <Loading />
        )
    }
    if(data.userInfo[0]){
        return(
            <View>
                <View style={styles.top_wrapper}>
                    <View style={styles.img} >
                    <AntDesign name="user" size={40} color="black" />              
                    </View>
                    <View style={styles.name}>
                        <Text style={styles.textName}>{data.userInfo[0].firstname} {data.userInfo[0].lastname}</Text>
                    </View>
                </View>
                <View style={styles.bottom_wrapper}>
                    <View style={styles.listItems}>
                        <Text style={styles.text}>{data.userInfo[0].school}</Text>
                        <Text style={styles.text}>{data.userInfo[0].major}</Text>
                        <TouchableOpacity style={styles.btn_setting}>
                            <EvilIcons name="arrow-right" size={40} color="black" />
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        )
    }
}

const wight = Dimensions.get('window').width
const height = Dimensions.get('window').height
const styles = StyleSheet.create({
    top_wrapper: {
        borderBottomColor: '#000',
        borderBottomWidth: 1,
        width: wight,
        alignItems: 'center',
    },

    img:{
        marginTop: 35,
        alignItems: 'center',
        width: 80,
        height: 90,
        marginTop: 90,
        backgroundColor: 'red',
        borderRadius: 25,
        borderColor: '#000',
        borderWidth: 1,
        marginBottom: 15
    },
    name:{
        alignItems: 'center',
        marginTop: 10,
    },
    textName:{
        fontWeight: '800',
        fontSize: 25
    },
    bottom_wrapper:{
        borderBottomColor: '#000',
        borderBottomWidth: 1,
        height: 60,
        
    },
    listItems:{
        justifyContent: 'space-between',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'baseline',
        paddingLeft: 3,
        paddingRight: 3
    },
    text:{
        fontSize: 15,
        fontWeight: '700'
    },
    btn_setting:{
        
    }

})

export default ProfileInfo;