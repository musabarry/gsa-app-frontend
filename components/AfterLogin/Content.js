import React, { useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
  Modal,
  Image,
  ScrollView,
} from "react-native";
import Constants from 'expo-constants';
import authContext  from '../../Context/authContext';
import checkContext  from '../../Context/checkContext';
import AsyncStorage from '@react-native-community/async-storage';
import {  FontAwesome5, SimpleLineIcons } from '@expo/vector-icons';
import NewPassword from  '../Profile/NewPassword';
import EditInfo from '../Profile/EditInfo'
import Loading from '../BeforeLogin/loading';
const  Content = (props) =>  {

  //authanicated state
  const authState = useContext(checkContext);
  //data state
  const dataStates = useContext(authContext);

  // signout state
  const [userOut, setUserOut] = useState(false)

  const data = dataStates.userInfo
  const [modalVisible, setModalVisible] = useState(false);
  //editing infor or password state
  const [isEnabled, setIsEnabled] = useState(false);
  
  //update info event func
  const updateInfo = () =>{
    setModalVisible(true)
    setIsEnabled(true)
  }
  
  //update password event func
  const updatePassword = () =>{
    setModalVisible(true)
    setIsEnabled(false)
  }

  //logout event func 
  const logout = async () =>{
    try {
      setUserOut(true)
      await AsyncStorage.multiRemove(['@token_key', '@userID'])
      .then(res =>{
        authState.setAuthanticated(false)
        authState.setVerifyUser(false)
        //Alert.alert('Logout success')
      })
    } catch (error) {
      
    }
}


// if not data or user login out set to True
if(userOut || !data.userInfo){
  return(
    <Loading />
  )
}

if(data.userInfo){
  const avatar = data.userInfo.avatar
  return (
  <KeyboardAvoidingView behavior="padding" style={styles.container}>       
    <View style={styles.contentsView}>      
      <View st={styles.top}>
      <TouchableOpacity style={styles.btn_back} onPress={() => props.navigation.goBack()}>
        <Text style={styles.back_text}>Back</Text>
      </TouchableOpacity>
    </View>
    {data.userInfo &&     
    <ScrollView style={styles.infoView}>
      <View  style={styles.wrapper_img}>
          { avatar ? <Image source={{uri: avatar }}  style={styles.img}/>: 
            <FontAwesome5 name="user-alt" size={330} color="#01294a" style={{marginLeft: 30}}/>
           }
      </View>
      <View style={styles.info_wrapper}>
        <Text style={styles.name}>
        {data.userInfo ? data.userInfo.firstname: ''} {data.userInfo ? data.userInfo.lastname: ''}
        </Text>
        <View style={styles.school}>
          <FontAwesome5 name="school" size={24} color="black" />
          <Text style={styles.text}>{data.userInfo ? data.userInfo.school: ''}</Text>
        </View>

        <View>
          <View style={styles.candidateInformations}>
            <Text style={styles.label}>Skills:</Text>
            {data.userInfo.skills.map( skill => <Text key={skill}> {skill} </Text>)}
          </View>         
          <View>
            <Text style={styles.label}>Interest:</Text>
              <View >
                {data.userInfo.interest.map(interest => <Text key={interest}> {interest}</Text>)}
              </View>
          </View>
          <View>
            <Text style={styles.label}>Role:</Text>
              <View >
                <Text>{data.userInfo.role}</Text>
              </View>
          </View>
          <Text style={styles.label}>Major:</Text>
          <View>
              <View >
                <Text>{data.userInfo.major}</Text>
              </View>
          </View>
        </View>
      </View>
    </ScrollView>}
      <View style={styles.logoutView}>
        <View style={styles.editBtns}>
          <TouchableOpacity style={styles.btnPass} 
          onPress={() => updatePassword()}>
            <Text style={styles.btnText}>Change Password </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.editInfoBtn} onPress={() => updateInfo()}>
            <FontAwesome5 name="user-edit" size={24} color="#4382e8" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.btnLoug} 
          onPress={logout} >
          <SimpleLineIcons name="logout" size={24} color="black"  />
          <Text style={styles.lougout}>LOGOUT</Text>
        </TouchableOpacity>
      </View>
      </View>

      {/* modal for updating userInfo and password */}
        <Modal 
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
        setModalVisible(!modalVisible);
        }}>

        <View style={styles.editView}>
          <View style={styles.topHeader}>
            <TouchableOpacity  style={styles.btn_back} onPress={() =>  setModalVisible(!modalVisible)} >
                <Text style={styles.back_text}>Cansel</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.editForm}>
            {
            isEnabled ? 
            <EditInfo setModalVisible={setModalVisible}/> :
            <NewPassword email={data.userInfo.email} setModalVisible={setModalVisible} modalVisible={modalVisible}/>
            }
          </View>
          </View>
        </Modal>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  candidateInformations: {
    paddingTop: 10
  },
  container: {
    flex: 1,
  },
  label:{
    fontSize: 18,
    fontWeight: '800',
    marginRight: 25,
  },
  name:{
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    textTransform: 'capitalize'
  },
  content:{
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  data:{
    fontSize: 20,
    fontWeight: '500',
    textTransform: 'capitalize'
  },
  wrapper_img:{
    backgroundColor: "white",
    width: '100%',
    height: 300,
    padding: 10
  },
  img:{
    width: '100%',
    height: '100%'
  },
  info_wrapper:{
    paddingLeft: 10,
  },
  list:{
    fontSize: 17,
    fontWeight: '500',
    margin: 5,
    flexDirection: 'row',
    width: '100%'
  },
  school:{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'baseline'
  },
  text:{
    marginLeft: 5,
    fontSize: 18,
    fontWeight: '600'
  },
  content: {
    height: 40,
    marginBottom: 5,
    borderRadius: 23,
    width: 400,
    borderBottomWidth: 1,
    borderColor: "#d4e3fa",
      
  },
  contentsView:{
    height: '100%',
    backgroundColor: "white",
  },
  infoView:{
    backgroundColor: "#e8e8e8",
  },
  passView:{
    width: '100%',
    marginTop: 10
  },
  btnText:{
    fontSize: 20,
    fontWeight: '700',
    color: '#4382e8'
  },

  logoutView:{
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    bottom: 0,
    width: '100%'
  },
  editBtns:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginRight: 10,
    marginRight: 10
  },
  btnLoug:{
    width: 100,
    alignSelf: 'center',
    borderRadius: 15,
    margin: 5,
    display: 'flex',
    flexDirection: 'row'
  },
  lougout:{
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '600',
    marginLeft: 10
  },
  btn_back:{
    marginLeft: 15,
    marginBottom: 5
  },
  back_text:{
    fontSize: 18,
    fontWeight: '600',
    color: '#5cacf7'
  },
  editView:{
    flex: 1,
    backgroundColor: "#faf9f7",
    marginTop: Constants.statusBarHeight,
  },
  listItem:{
    backgroundColor: "red"
  }
});

export default Content;