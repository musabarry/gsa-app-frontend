import React, { useState, useEffect, useContext } from 'react';
import {TouchableOpacity,StyleSheet,Text, Platform,
    View,Dimensions,Image, Modal} from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import { EvilIcons, MaterialIcons, Ionicons, FontAwesome, Entypo,MaterialCommunityIcons } from '@expo/vector-icons';  
import{useMutation} from '@apollo/client';
import { RNS3 } from 'react-native-aws3';
import {aws} from '../../keys'
import checkContext  from '../../Context/checkContext';
import { useNavigation } from '@react-navigation/native'
import authContext  from '../../Context/authContext';
import {PROFILEIMAGE} from '../../GraphQl/mutation';
import {ALLPOST, USERINFO} from '../../GraphQl/query';
import Loading from '../BeforeLogin/loading';

const ChangeAvater =(props) => {

    const [hasPermission, setHasPermission] = useState(null)
    const [cameraType, setCameraType] = useState(Camera.Constants.Type.back)
    const [image, setImage] = useState('')
    const [camera, setCamera] = useState(null)
    const [profileImage] =  useMutation(PROFILEIMAGE)
    const state = useContext(checkContext);
    const navigation = useNavigation();
    const update = useContext(authContext);
    const [takeBtn, setTakeBtn] = useState(false)
    const [flash, setFlash] = useState(false)
    const [loading, setLoading] = useState(false)
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
            const options = {quality: 0.5};
            await camera.takePictureAsync(options)
            .then(res =>{
                setImage(res.uri)
                console.log(res.uri);
                setTakeBtn(false)
            }).catch(err =>{
                setImage('')
                setTakeBtn(false)
            });
        }
    }
    
    //select galary image
    const pickImage = async () => {
            console.log("")
            const result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            })
            if(!result.cancelled){
                setImage(result.uri)
                setTakeBtn(false)
            }
        }
    
    const upload =  () =>{
        setLoading(true)
        const file = {
          uri: image,
          name: `${state.userID}-${new Date().getTime()}`,
          type: "profile/jpeg"
        };

        const options = {
            bucket: aws.bucketProfile,
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
                    image: `${response.body.postResponse.key}`,
                },
                refetchQueries: [{query: ALLPOST}, {query: USERINFO}]
            }).then(res =>{
                setTakeBtn(false)
                setImage('')
                setLoading(false)
                return navigation.navigate('homeProfile')
            }).catch(error =>{
                setLoading(false)
            })
        }).catch(error => {
            setLoading(false)
        });
    }

    const cansel = () =>{
        setImage('')
        setTakeBtn(false)
        return props.navigation.goBack()
    }
        if (hasPermission === null) {
        return ( <Camera style={{ flex: 6}} type={cameraType}  autoFocus="on"  ref={ref => setCamera(ref)}>
        <Text>No access to camera</Text>
        </Camera>)
        } else if (hasPermission === false) {
        return ( <Camera style={{ flex: 1}} type={cameraType}  autoFocus="on"  ref={ref => setCamera(ref)}>
            <Text>No access to camera</Text>
        </Camera>)
        } else if(loading){
            return(
                <Loading />
            )
        } else { 
            return(
            // ref={ref => {camera = ref}}
            <View style={styles.container} >
                <View style={styles.top}>
                    <TouchableOpacity onPress={cansel}>
                        <Text style={styles.topText}>Cancel</Text>
                    </TouchableOpacity>
                    {image.length > 1 && <TouchableOpacity onPress={() => upload()} >
                         <Text style={styles.topText}>Post</Text>
                    </TouchableOpacity>}
                </View>
                {!takeBtn &&  !image && <View style={{flex: 1, alignItems: 'flex-start', justifyContent: 'center'}}>
                    <TouchableOpacity style={styles.camaraBtns} onPress={() => setTakeBtn(!takeBtn)}>
                        <Text style={styles.camaraBtns_text}>Take Photo</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.camaraBtns} onPress={() => pickImage()}>
                        <Text style={styles.camaraBtns_text}>Choose Photo</Text>
                    </TouchableOpacity>
                </View>}
                {takeBtn &&
                <>
                    <Camera style={{ flex: 4}} type={cameraType} autoFocus="on"  ref={ref => setCamera(ref)}
                    flashMode={flash ? Camera.Constants.FlashMode.on : Camera.Constants.FlashMode.off}>
                        <View style={styles.cameraIconParent}>
                            <TouchableOpacity style={styles.cameraIcon} onPress={() => setFlash(!flash)}>
                                <MaterialCommunityIcons name={flash ? "flash" : "flash-off"} size={28} color="#f7ff0f" />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.cameraIcon} onPress={() => setTakeBtn(!takeBtn)}>
                                <EvilIcons name="close" size={35} color="#e3e3da" />
                            </TouchableOpacity>
                        </View>
                    </Camera>
                    <View style={{ backgroundColor: '#1e1e1f'}}>
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
                {image.length > 1 && !takeBtn && <View style={styles.takenImg}>
                    <Image source={{uri: `${image}`}}  style={{ width: '100%', height: '100%' }} />
                </View>}
                {/* {
                    image ? 
                    <View style={styles.takenImg}>
                        <View style={styles.top}>
                            <TouchableOpacity onPress={() => props.setModalVisible(!props.modalVisible)}>
                                <EvilIcons name="close" size={35} color="#01294a" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => upload()} >
                                <Text style={styles.post_text}>Post</Text>
                            </TouchableOpacity>
                        </View>
                        <Image source={{uri: `${image}`}}  style={{ width: '100%', height: '100%' }} />
                    </View>
                    :<>
                    {!takeBtn ?
                        <View style={{flex: 1, alignItems: 'flex-start', justifyContent: 'center', backgroundColor: '#edf1f7'}}>
                            <TouchableOpacity style={styles.camaraBtns} onPress={() => setTakeBtn(!takeBtn)}>
                                <Text style={styles.camaraBtns_text}>Take Photo</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.camaraBtns} onPress={() => pickImage()}>
                                <Text style={styles.camaraBtns_text}>Choose Photo</Text>
                            </TouchableOpacity>
                        </View>:
                    <>
                    <Camera style={{ flex: 1}} type={cameraType}   autoFocus="on"  ref={ref => setCamera(ref)}>

                    </Camera>
                    <View style={{ backgroundColor: '#1e1e1f'}}>
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
                    </>}</>} */}
                </View>
            )
        }
}

export default ChangeAvater;

const styles =  StyleSheet.create({
    container:{
        flex: 1,
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
        marginRight: 5,
        //backgroundColor: '#edf1f7'
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
      },
      camaraBtns:{
          marginTop: 10,
         alignSelf: 'center'
      },
      camaraBtns_text:{
          fontWeight: '600',
          fontSize: 19,
      },
      topText:{
        fontSize: 18,
        fontWeight: '700',
        color: '#016191'
      },
      cameraIcon:{
        padding: 10
      },
      cameraIconParent:{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between'
      }
})
