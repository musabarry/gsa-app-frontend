import React, {useState,  useContext, useEffect} from 'react'
import {Text, View, StyleSheet, TouchableOpacity, Modal, Image, Alert, TouchableWithoutFeedback, Keyboard} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import { FontAwesome, Ionicons, EvilIcons,MaterialIcons } from '@expo/vector-icons';
import Statemen from '../Post/Statemen';
import {aws} from '../../keys'
import{useMutation} from '@apollo/client';
import {CREATEPOSTIMAGE, CREATEPOSTTEXT} from '../../GraphQl/mutation';
import {ALLPOST, USERINFO} from '../../GraphQl/query';
import checkContext  from '../../Context/checkContext';
import authContext  from '../../Context/authContext';
import { RNS3 } from 'react-native-aws3';
import AsyncStorage from '@react-native-community/async-storage';
import Loading from '../BeforeLogin/loading';
const Post = (props) =>{
  // camera access
  const [hasPermission,  setHasPermission] = useState(null)
  const[switchCamera, setSwitchCamera]  =  useState(Camera.Constants.Type.back)
  const [image, setImage] = useState('#.png')

  const [text, setText] =  useState('')
  const [modalVisible, setModalVisible] =  useState(false)
  const [takeBtn, setTakeBtn] = useState(false)

  const state = useContext(checkContext);
  const [loading, setLoading] =  useState(false)
  const [camera, setCamera] = useState(null)

  //graphql mutation function
  const [createPostImage] =  useMutation(CREATEPOSTIMAGE)
  const [createPostText] =  useMutation(CREATEPOSTTEXT)

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
    
    //switch between front and back camera
    const handleCameraType=()=>{
      setSwitchCamera(
          cameraType === Camera.Constants.Type.back 
          ? Camera.Constants.Type.front
          : Camera.Constants.Type.back
      )
  }


  //take a picture event fun
  const takePicture = async () => {
      if (camera) {
          let photo = await camera.takePictureAsync().then(res =>{
              setImage(res.uri)
              setTakeBtn(false)
          }).catch(err =>{
            console.log('error');
          });
      }
  }

  //select galary image
  const pickImage = async () => {
      const result  = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
      })

      if(!result.cancelled) {
        setImage(result.uri);
      }
  }

  //upload picture
  const upload = async () =>{
      setLoading(true)
      const file = {
        uri: image,
        name: `${state.userID}-${new Date().getTime()}`,
        type: "image/jpeg"
      };
      
      const userID =   await AsyncStorage.getItem("@userID")
      //aws authanication keys for S3 bucket
      const options = {
        // keyPrefix: "postsImg/",
        bucket: aws.bucketPost,
        region: aws.region,
        accessKey: aws.accessKey,
        secretKey: aws.secretKey,
        successActionStatus: 201
      };

      //upload and post the picture
      if(image != '#.png' && image.length > 7){
      RNS3.put(file, options)
        .then(response => {
          if (response.status !== 201) throw Error('Error uploadting to AWS S3')
          //else get the image link and save to DB
          createPostImage({
              variables:{
                  owner: `${userID}`,
                  imageAlbum: [`${response.body.postResponse.key}`],
                  text: text
              },
              //refresh post data
              refetchQueries: [{query: ALLPOST}, {query: USERINFO}]
          }).then(res =>{
            setImage('#.png')
            setText('')
            setLoading(false)
            return props.navigation.navigate("Home")
          }).catch(err =>{
            setLoading(false)
          })
        })
        .catch(error => {
          setLoading(false)
        });
      }else{
        createPostText({
          variables:{
            owner: `${userID}`,
            text: text
          },
          refetchQueries: [{query: ALLPOST}, {query: USERINFO}]
        }).then(res =>{
          setText('')
          setLoading(false)
          return props.navigation.navigate("Home")
         
        }).catch(error =>{
          setLoading(false)
          console.log(error);
        })
      }
      
      //setInterval(() => { setLoading(false)}, 1000);
    }


    if (hasPermission === null) {
      return <View />;
    } else if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    } else if(loading){
      return(
          <Loading />
      )
    }else{
        return(
          <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
            <View style={styles.container}  >
              {/* if button camera is  false show test post compoenet else show the camera component */}
              {!takeBtn  ?
              <>
                <View style={styles.statement_box}>
                  <Statemen  image={image} setText={setText} text={text} upload={upload}/>
                </View>
                <View style={styles.btns}>
                  <TouchableOpacity style={styles.add} onPress={() => setTakeBtn(!takeBtn)}>
                    <FontAwesome name="camera" size={24} color="#01294a"/>
                    <Text style={styles.add_text}>take a photo</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.add} onPress={() => pickImage()}>
                    <MaterialIcons name="photo-library" size={24} color="#01294a" />
                    <Text style={styles.add_text}>Select a photo</Text>
                  </TouchableOpacity>
                </View>
                </>:
              <>
                <Camera style={{ flex: 6}} type={switchCamera}  autoFocus="on"  ref={ref => setCamera(ref)}>
                  <View style={styles.top}>
                      <TouchableOpacity style={styles.btn} onPress={() => setTakeBtn(!takeBtn)}>
                          <EvilIcons name="close" size={35} color="white" />
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
        </TouchableWithoutFeedback>
      )
  }
}

const styles =  StyleSheet.create({
  container:{
      flex: 1,
  },
  top:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: '#1e1e1f', 
  },
  btn:{
    marginRight: 5,
    marginBottom: 5
  },
  image_wraper:{
    marginBottom: 40,
    borderRadius: 4
  },
  image:{
    width: '100%', 
    height: '100%'
  },
  statement_box:{
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
  },
  canselBtn:{
    padding: 10,
    borderRadius: 10
  },
  nextBtn:{
    padding: 10,
    borderRadius: 10
  },
  canselText:{
    fontSize: 18,
    fontWeight: '600'
  },
  nextText:{
    fontSize: 18,
    fontWeight: '600'
  
  },
  btn_wrape:{
    display: 'flex', 
    flexDirection:"row", 
    justifyContent: 'space-between',
    margin: 10,
    padding: 10
  },
  takenImg:{
    backgroundColor: '#d9d9d9',
    borderWidth: 2,
    borderColor: '#CCC',
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  btns:{
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 20
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

export default Post;