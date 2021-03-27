import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, Image, TouchableOpacity, KeyboardAvoidingView, ScrollView,
    TouchableWithoutFeedback, Keyboard, Platform} from 'react-native';
import { RNS3 } from 'react-native-aws3';
import {CREATEPOSTIMAGE} from '../../GraphQl/mutation';
import{useMutation} from '@apollo/client';
import authContext  from '../../authContext';
import Loading from '../01/loading';
import {aws} from '../../keys'
const Modalcom = (props) =>{
    
  const [status, setStatus] = useState(false);
  const [createPostImage, {error, loading}] =  useMutation(CREATEPOSTIMAGE)
  const state = useContext(authContext);
  const [submit, setSubmit] = useState(false)
  const upload =  () =>{
    setSubmit(true)
    const file = {
      uri: props.uri,
      name: `${state.userID}-${new Date().getTime()}`,
      type: "image/jpeg"
    };

    const options = {
      keyPrefix: aws.keyPrefix,
      bucket: aws.bucket,
      region: aws.region,
      accessKey: aws.accessKey,
      secretKey: aws.secretKey,
      successActionStatus: 201
    };

    
    RNS3.put(file, options)
    .then(response => {
      if (response.status !== 201) throw Error('Error uploadting to AWS S3')
      createPostImage({
          variables:{
              owner: `${state.userID}`,
              imageAlbum: [`${response.body.postResponse.location}`],
              text: status
          }
      }).then(res =>{
         
         console.log(res);
         setSubmit(false)
         console.log(submit)
         props.chnageRoute()
       
      }).catch(error =>{
          console.log(error);
      })
    })
    .catch(error => {
      console.log(error);
    });
    
  }

  useEffect(() =>{
    console.log(submit);
  }, [])
 

  if(submit){
    return(
      <Loading />
    )
  }else{
    //setSubmit(false)
    return ( 
      <KeyboardAvoidingView style={{flex: 1}}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      enabled={true}>
      <ScrollView style={styles.centeredView} keyboardShouldPersistTaps='always'>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.wrapper}>
              <View style={styles.imgWrapper}>
                  <Image source={{uri:  `${props.uri}`}}  style={{ width: 300, height: 250 }} />
              </View>
              <View style={styles.textAreaContainer}>
                  <TextInput
                      style={styles.textArea}
                      underlineColorAndroid="transparent"
                      placeholder="Status.........."
                      placeholderTextColor="#599ccf"
                      numberOfLines={10}
                      multiline={true}
                      onChangeText ={(e) => setStatus(e)}
                  />    
              </View>
              <View>
                  <TouchableOpacity style={styles.uploadBtn} onPress={upload}>
                      <Text style={styles.uploadText}>UPLOAD</Text>
                  </TouchableOpacity>
              </View>
          </View>
      </TouchableWithoutFeedback>
      </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
  },
  wrapper:{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
  },
  imgWrapper:{
      margin: 10,
      borderWidth: 1,
      borderColor: '#cfe8e7'
  },
  textAreaContainer: {
    borderColor: '#7e9e9d',
    margin: 10,
    borderWidth: 1,
    width: 310,
    padding: 5
  },
  textArea: {
    height: 150,
    justifyContent: "flex-start"
  },
  uploadBtn:{
      backgroundColor: '#2a9ff7',
      borderWidth: 1,
      borderColor: '#2a9ff7',
      borderRadius: 10
  },
  uploadText:{
      padding: 10,
      fontSize: 18,
      fontWeight: '700'
  }
});

export default Modalcom;