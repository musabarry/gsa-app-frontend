import React from "react";
import {TouchableOpacity,StyleSheet,Text,
        View,Dimensions,Image} from "react-native";
import {  EvilIcons } from '@expo/vector-icons';



const ProfileInfo = (props) =>{

    return(
        <View>
            <View style={styles.top_wrapper}>
                <View style={styles.img} >
                    <Image style={styles.photo} source={{uri: 'https://media.istockphoto.com/photos/call-center-workers-picture-id903568822'}} />
                </View>
                <View style={styles.name}>
                    <Text style={styles.textName}>{props.data.firstname} {props.data.lastname}</Text>
                </View>
            </View>
            <View style={styles.bottom_wrapper}>
                <View style={styles.listItems}>
                    <View style={styles.info}>
                        <Text style={styles.text}>{props.data.school}</Text>
                        <Text style={styles.text}>{props.data.major}</Text>
                    </View>
                    <TouchableOpacity style={styles.btn_setting} 
                        onPress={props.naviSetting}>
                        <EvilIcons name="arrow-right" size={40} color="black" />
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    )
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
      
        maxWidth: 100,
        maxHeight: 100,
        marginTop: 90,

        borderColor: '#000',
        borderWidth: 1,
        marginBottom: 15
    },
    info:{
        flexDirection: 'row'
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
        alignItems: 'flex-end',
        paddingLeft: 3,
        paddingRight: 3
    },
    text:{
        fontSize: 15,
        fontWeight: '700'
    },
    btn_setting:{
        
    },
    photo:{
        height: '100%',
        width: 90,
        borderRadius: 25,
    }

})

export default ProfileInfo;