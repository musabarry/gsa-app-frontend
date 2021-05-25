import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Alert,
  FlatList,
  Modal,
  Image,
  Switch,
  ScrollView,
  SafeAreaView
} from "react-native";
import Constants from 'expo-constants';
import authContext  from '../../Context/authContext';
import checkContext  from '../../Context/checkContext';
import AsyncStorage from '@react-native-community/async-storage';
import {  FontAwesome5, SimpleLineIcons, EvilIcons } from '@expo/vector-icons';
import ProfileImg from '../Profile/ProfileImage';
import NewPassword from  '../Profile/NewPassword';
import EditInfo from '../Profile/EditInfo'
import Loading from '../01/loading';
const  Content = (props) =>  {

  const authState = useContext(checkContext);
  const dataStates = useContext(authContext);
  //const {error, data, loading} =  useQuery(USERINFO)
  const [info, setInfo] = useState([]);
  const [userOut, setUserOut] = useState(false)
  const data = dataStates.userInfo
  const [modalVisible, setModalVisible] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  
  const updateInfo = () =>{
    setModalVisible(true)
    setIsEnabled(true)
  }
  
  const updatePassword = () =>{
    setModalVisible(true)
    setIsEnabled(false)
  }

  const logout = async () =>{
    try {
      setUserOut(true)
      await AsyncStorage.multiRemove(['@token_key', '@userID'])
      .then(res =>{
        authState.setAuthanticated(false)
        Alert.alert('Logout success')
      })
    } catch (error) {
      console.log(error);
    }
}

const renderList = (listData) =>{
  listData.map(e=> <View >
    <Text>{e}</Text>
  </View>)
}

if(userOut || !data.userInfo){
  return(
    <Loading />
  )
}

if(data.userInfo){
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
          <Image source={{uri: data.userInfo.avatar }}  style={styles.img}/>
      </View>
      <View style={styles.info_wrapper}>
        <Text style={styles.name}>
        {data.userInfo ? data.userInfo.firstname: ''} {data.userInfo ? data.userInfo.lastname: ''}
        </Text>
        <View style={styles.school}>
          <FontAwesome5 name="school" size={24} color="black" />
          <Text style={styles.text}>{data.userInfo ? data.userInfo.school: ''}</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.data}>{data.userInfo ? data.userInfo.major: ''}</Text>
        </View>
          <View style={styles.content}>
            <Text style={styles.data}>{data.userInfo ? data.userInfo.role: ''}</Text>
          </View>
          {/* {data.userInfo.skills &&
            <View>
              <Text style={styles.label}>Skills:</Text>
              <FlatList
              data={data.userInfo.skills}
              renderItem={({item}) => <Text style={styles.list}>{item}</Text>}
              keyExtractor={(item, index) => index.toString()}/>
            </View>
          } */}
          {data.userInfo.interest  &&
            <View>
              <Text style={styles.label}>Interest:</Text>
              {renderList(data.userInfo.interest)}
            </View>
          }
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
            <EditInfo /> :
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
    height: '100%'
  },
  infoView:{
    //padding: 15,
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
  }
});

export default Content;