import React, { useState, useEffect, useContext } from 'react';
import {TouchableOpacity,StyleSheet,Text, Platform,
    View,Dimensions,Image, Modal} from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import { EvilIcons, MaterialIcons, Ionicons } from '@expo/vector-icons';  
import{useMutation} from '@apollo/client';
import { RNS3 } from 'react-native-aws3';
import {aws} from '../../keys'
import checkContext  from '../../Context/checkContext';
import { useNavigation } from '@react-navigation/native'
import authContext  from '../../Context/authContext';
import {PROFILEIMAGE} from '../../GraphQl/mutation';
import {ALLPOST, USERINFO} from '../../GraphQl/query';
const ProfileImg =(props) => {

    const [hasPermission, setHasPermission] = useState(null)
    const [cameraType, setCameraType] = useState(Camera.Constants.Type.back)
    const [image, setImage] = useState('')
    const [camera, setCamera] = useState(null)
    const [profileImage, {error, loading}] =  useMutation(PROFILEIMAGE)
    const state = useContext(checkContext);
    const navigation = useNavigation();
    const update = useContext(authContext);

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
                setImage(res.uri)
            }).catch(err =>{
                setImage('')
            });
        }
    }
    
    const pickImage = async () => {
        console.log('pick');
       let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        })
        if(!result.cancelled){
            setImage(result.uri)
        }
            // setImage('')
            // console.log('error');
        
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
                },
                refetchQueries: [{query: ALLPOST}, {query: USERINFO}]
        }).then(res =>{
            props.setModalVisible(!props.modalVisible)
            navigation.navigate('homeProfile')
        }).catch(error =>{
            console.log(error);
            
        })
        })
        .catch(error => {
            console.log(error);
        });
    }

    if (hasPermission === null) {
    return ( <Camera style={{ flex: 6}} type={cameraType}  autoFocus="on"  ref={ref => setCamera(ref)}>
    <Text>No access to camera</Text>
    </Camera>)
    } else if (hasPermission === false) {
    return ( <Camera style={{ flex: 6}} type={cameraType}  autoFocus="on"  ref={ref => setCamera(ref)}>
        <Text>No access to camera</Text>
    </Camera>)
    } else { 
        return(
            // ref={ref => {camera = ref}}
            <View style={styles.container} >

                {
                    image ? 
                    <View style={styles.takenImg}>
                        <View style={styles.top}>
                            <TouchableOpacity onPress={() => props.setModalVisible(!props.modalVisible)}>
                                <EvilIcons name="close" size={35} color="black" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => upload()} >
                                <Text style={styles.post_text}>Post</Text>
                            </TouchableOpacity>
                        </View>
                        <Image source={{uri: `${image}`}}  style={{ width: '100%', height: '100%' }} />
                    </View>:
                <>
                <Camera style={{ flex: 6}} type={cameraType}  autoFocus="on"  ref={ref => setCamera(ref)}>
                    <View style={styles.top}>
                         <TouchableOpacity onPress={() => props.setModalVisible(!props.modalVisible)}>
                             <EvilIcons name="close" size={35} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => upload()} >
                            <Text style={styles.post_text}>Post</Text>
                        </TouchableOpacity>
                    </View>
                </Camera>
                <View style={{flex: 1,  backgroundColor: '#1e1e1f'}}>
                  <View style={styles.btn_wrape}>  
                      <TouchableOpacity style={styles.add} onPress={() => pickImage()}>
                        <MaterialIcons name="photo-library" size={40} color="white" />
                      </TouchableOpacity>
                      <TouchableOpacity  style={styles.snap} onPress={()=>  takePicture()} >
                        <Ionicons name="ios-camera" size={50} color="white" />
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.flip} onPress={()=> handleCameraType()}>
                        <Ionicons name="ios-reverse-camera" size={50} color="white" />
                      </TouchableOpacity>
                  </View>
                </View>
                </>
                }

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
        marginLeft: 5,
        marginRight: 5
    },
    post_text:{
        fontSize: 18,
        fontWeight: '600'
    },
    takenImg:{
      flex: 5,
        width: '100%',
    },
    btn:{
        alignSelf: 'flex-end',
        marginBottom: 5
       
    },
    btn_wrape:{
        display: 'flex', 
        flexDirection:"row", 
        justifyContent: 'space-between',
        margin: 10,
        padding: 10
    },
    add:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'baseline',
        padding: 5,
        marginTop: 8,
        marginBottom: 8,
      },
      add_text:{
       marginLeft: 10
      }
})