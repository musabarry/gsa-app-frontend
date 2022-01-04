import React, {useState, useEffect} from 'react'
import {View, Text, FlatList, SafeAreaView, Image, Modal, StyleSheet, TouchableOpacity} from 'react-native';
import SearchBar from '../SearchBar';
import{useQuery} from '@apollo/client';
import {LOOKUP} from "../../../GraphQl/query";
import Loading from '../../BeforeLogin/loading';
const Item = ({ avatar, firstname, lastname, school, toMessage, id}) => (
   
    <View style={styles.result} >
        <TouchableOpacity style={styles.resImage}>
            <Image style={styles.thumbnail} source={{uri: avatar !== '' ?  avatar : undefined}}/> 
        </TouchableOpacity>
        <TouchableOpacity style={styles.resInfo} onPress={() => toMessage(avatar, id, firstname, lastname)}>
            <Text style={styles.name}>{firstname} {lastname}</Text>
            <Text style={styles.school}>@{school}</Text>
        </TouchableOpacity>
    </View>
);

const LookupContact = (props) => {


    
    const [search, setSearch] = useState('all');
    const [searResult, setSearchResult] = useState([])
    const [clicked, setClicked] = useState(false);

    const {data, error, loading} = useQuery(
        LOOKUP, 
        {
            variables:{name: search}
        }
    );

    useEffect(()=>{
        if(data){
            setSearchResult(data.lookUp)
        }
        
    },[search, data, clicked])

    const renderItem = ({item}) => (
        <Item firstname={item.firstname} lastname={item.lastname} 
        school={item.school} avatar={item.avatar} id={item._id} toMessage={props.toMessage}/>
    );

    return (
        <Modal
        animationType="slide"
        transparent={true}
        visible={props.clicked}
        hardwareAccelerated={true}
        onRequestClose={() => {
            props.setClicked(!props.clicked);
        }}>
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.btn_back} onPress={() => props.setClicked(!props.clicked)}>
                    <Text style={styles.back_text}>Back</Text>
                </TouchableOpacity>
                <SearchBar 
                    search={search === 'all' ? '' : search}
                    setSearch={setSearch}
                    clicked={clicked}
                    setClicked={setClicked}
                    />
            </View>
            <View style={styles.contact}>
                {loading ?
                <Loading /> :
                <FlatList
                    data={searResult}
                    renderItem={renderItem}
                    keyExtractor={item => item._id}
                    />}
            </View>
        </SafeAreaView>
        </Modal>
    )
}

export default LookupContact


const styles  = StyleSheet.create({
    container:{
        flex: 1,
        height: '100%',
        backgroundColor: '#ededed'
    },
    header:{
        display: 'flex'
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
      result:{
        display: 'flex',
        flexDirection: 'row',
        paddingLeft: 10,
        borderColor: '#dbdbdb',
        shadowColor: '#CCC',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        borderWidth: 1,
    },
    resImage:{
        width: 50,
        height: 50,
        borderWidth: 1,
        borderRadius: 100,
        borderColor: '#CCC',
        backgroundColor: '#01294a',
        marginRight: 20,
    },
    thumbnail:{
        width: '100%',
        height: '100%',
        borderRadius: 100
    },
    resInfo:{
        display: 'flex',
        flexDirection: 'column',
        width: '80%',
        borderColor: '#cfcfcf',
        borderTopWidth: 2,
        borderBottomWidth: 2,
    },
    name:{
        fontSize: 18,
        fontWeight: 'bold',
        textTransform: 'capitalize'
    },
    school:{
        color: '#6084f7'
    },
    contact:{
        paddingTop: 15
    }
})