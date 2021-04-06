import React, { useState, useEffect, useContext } from 'react';
import {TouchableOpacity,StyleSheet,Text, Platform,
    View,Dimensions,Image, Modal} from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import { EvilIcons } from '@expo/vector-icons';  
import { Ionicons } from '@expo/vector-icons';
import{useMutation} from '@apollo/client';
import { RNS3 } from 'react-native-aws3';
import {PROFILEIMAGE} from '../../GraphQl/mutation';
import {aws} from '../../keys'
import checkContext  from '../../Context/checkContext';
const ProfileImg =(props) => {

    const [hasPermission, setHasPermission] = useState(null)
    const [cameraType, setCameraType] = useState(Camera.Constants.Type.back)
    const [image, setImage] = useState('')
    const [camera, setCamera] = useState(null)
    const [profileImage, {error, loading}] =  useMutation(PROFILEIMAGE)
    const state = useContext(checkContext);
    
    useEffect(() =>{
        (async () =>{
            if (Platform.OS === 'ios') {
                const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
                if (status !== 'granted') {
                  alert('Sorry, we need camera roll permissions to make this work!');
                }
              }
              // Camera Permission
              const { status } = await Permissions.askAsync(Permissions.CAMERA);
              setHasPermission(status === 'granted')
        })();
    })

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
                console.log(res.uri);
                setImage(res.uri)
            }).catch(err =>{
                setImage('')
            });
        }
    }
    
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        }).then(res =>{
            setImage(res.uri)
        }).catch(err =>{ 
            setImage('')
        })
    }

    const upload =  () =>{
        const file = {
          uri: image,
          name: `${state.userID}-${new Date().getTime()}`,
          type: "profile/jpeg"
        };

        const options = {
            keyPrefix: "profileImg/",
            bucket: aws.bucket,
            region: aws.region,
            accessKey: aws.accessKey,
            secretKey: aws.secretKey,
            successActionStatus: 201
        };
        RNS3.put(file, options)
        .then(response => {
            if (response.status !== 201) throw Error('Error uploadting to AWS S3')
            profileImage({
                variables:{
                    image: `${response.body.postResponse.location}`,
                }
        }).then(res =>{
            console.log(res);
        }).catch(error =>{
            console.log(error);
        })
        })
        .catch(error => {
            console.log(error);
        });
    }

    if (hasPermission === null) {
    return <View />;
    } else if (hasPermission === false) {
    return <Text>No access to camera</Text>;
    } else { 
        return(
            // ref={ref => {camera = ref}}
            <View style={styles.container} >
                <View style={styles.top}>
                        <TouchableOpacity onPress={() => props.setModalVisible(!props.modalVisible)}>
                            <EvilIcons name="close" size={35} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => upload()} >
                            <Text style={styles.post_text}>Post</Text>
                        </TouchableOpacity>
                </View>
                 <Camera style={{flex: 1}} type={cameraType}  autoFocus="on"  ref={ref => setCamera(ref)}>
                    <View style={{flex:1, flexDirection:"column",margin:20}}>
                        <View style={{flex:6, flexDirection:"row", justifyContent:"center"}} >
                            <TouchableOpacity  style={styles.camera} onPress={takePicture} >
                                <Ionicons name="ios-camera" size={50} color="white" />
                            </TouchableOpacity>
                        </View>
                        <View style={{flex:1, flexDirection:"row",justifyContent:"space-between"}}>  
                            <TouchableOpacity style={styles.btn} onPress={pickImage}>
                                <Ionicons name="ios-photos" size={30} color="white" />
                            </TouchableOpacity>
                            { image.length != 0 && image.length != undefined?
                            <TouchableOpacity style={styles.takenImg}>
                                <Image source={{uri: `${image}`}}  style={{ width: 50, height: 45 }} />
                            </TouchableOpacity>:<></>
                            }
                            <TouchableOpacity style={styles.btn} onPress={handleCameraType}>
                                <Ionicons name="ios-reverse-camera" size={35} color="white" />
                            </TouchableOpacity>
                        </View> 
                    </View>
                </Camera>
            </View>
        )
    }
}

export default ProfileImg;

const styles =  StyleSheet.create({
    container:{
        flex: 1,
        //backgroundColor: "#bdbdbd",
        marginTop: Constants.statusBarHeight,
        //backgroundColor: 'red'
        // marginTop: 'auto', 
        // marginLeft: 5,
        // marginRight: 5,
        // borderRadius: 20,
    },
    camera:{
        alignSelf: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'transparent' 
    },
    top:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5
    },
    post_text:{
        fontSize: 18,
        fontWeight: '600'
    },
    takenImg:{
        backgroundColor: 'red',
        height: 50,
        width: 40,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    btn:{
        alignSelf: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'transparent' 
    }
})