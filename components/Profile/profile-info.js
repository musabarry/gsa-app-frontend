import React, {useState} from "react";
import {TouchableOpacity,StyleSheet,Text,
        View,Dimensions,Image, Modal} from "react-native";
import {  Feather, FontAwesome5 } from '@expo/vector-icons';
import user from '../images/user.png'
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
const ProfileInfo = (props) =>{

    const [modalVisible, setModalVisible] = useState(false);
    const [testImage, setImage] = useState('')
    const [camera, setCamera] = useState(null)
    const handleCameraType=()=>{
        setCameraType(
            cameraType === Camera.Constants.Type.back 
            ? Camera.Constants.Type.front
            : Camera.Constants.Type.back
        )
    }
    const takePicture = async () => {
        if (camera) {
            let photo = await camera.takePictureAsync().then(res =>{
                setImage(res.uri)
            }).catch(err =>{
                setImage('')
            });
        }
    }
    const pickImage = async () => {
        setModalVisible(!modalVisible)
        await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        })
        .then(res =>{
            console.log(res);
            setImage(res.uri)
        }).catch(err =>{ 
        console.log('error');
        })
        // setModalVisible(!modalVisible)
       
    }
    const avatar = props.userInfo.avatar
    return(//setModalVisible(!modalVisible)
        <View>
            <View style={styles.container}>
                <View style={styles.top_wrapper}>
                    <View >
                        <TouchableOpacity onPress={props.naviChangeImg} style={styles.image_wrape}>
                            {avatar ? <Image style={styles.image} source={{uri: avatar}} /> :
                             <FontAwesome5 name="user-alt" size={150} color="#01294a" />}
                        </TouchableOpacity>
                    </View>
                    <View style={styles.name}>
                        <View>
                            <Text style={styles.textName}>{props.userInfo.firstname} {props.userInfo.lastname}</Text>
                        </View>
                        <View style={styles.info}>
                            <View style={styles.school}>
                                <FontAwesome5 name="school" size={24} color="black" />
                                <Text style={styles.schoolName}>{props.userInfo.school}</Text>
                            </View>
                            <TouchableOpacity style={styles.btn_setting} onPress={props.naviSetting}>
                                <Feather name="more-horizontal" size={24} color="black" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#ebebeb',
        borderBottomColor: '#CCC',
        borderBottomWidth: 2,
        borderBottomRightRadius: 25,
        borderBottomLeftRadius: 25,
    
    },
    testPic:{
            backgroundColor: "#ffffff",
            marginTop: 'auto', 
            marginLeft: 5,
            marginRight: 5,
            borderRadius: 20,
    },
    top_wrapper: {
        alignItems: 'center',
        marginTop: 30
    },
    image_wrape:{
        width: 150,
        height: 150
    },
    image:{
        borderRadius: 100,
        height: '100%',
    },
    name:{
        alignItems: 'center',
        marginTop: 10,
    },
    textName:{
        fontWeight: '700',
        fontSize: 20
    },
    info:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',

    },
    school:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'baseline'
    },
    schoolName:{
        fontSize: 15,
        margin: 5,
    },
})

export default ProfileInfo;