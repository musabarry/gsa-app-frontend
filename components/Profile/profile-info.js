import React, {useState} from "react";
import {TouchableOpacity,StyleSheet,Text,
        View,Dimensions,Image, Modal} from "react-native";
import {  Feather, FontAwesome5 } from '@expo/vector-icons';
import ProfileImg from './ProfileImage';


const ProfileInfo = (props) =>{

    const [modalVisible, setModalVisible] = useState(false);
    
    const img = '#.png'
 
    return(
        <View>
            <View style={styles.container}>
                <View style={styles.top_wrapper}>
                    <View >
                        <TouchableOpacity onPress={() => setModalVisible(!modalVisible)} style={styles.image_wrape}>
                        <Image style={styles.image} source={{uri: props.userInfo.avatar}} />
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
                <Modal 
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                    setModalVisible(!modalVisible);
                    }}>
                    <ProfileImg  
                    setModalVisible={setModalVisible} 
                    modalVisible={modalVisible}/>
                </Modal>
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