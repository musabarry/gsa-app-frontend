import React, {useState, useContext, useEffect} from 'react'
import {View, StyleSheet, ScrollView, Keyboard, Text, Platform} from 'react-native';
import PostCard from '../Card/PostCard';
//import { SearchBar } from 'react-native-elements';
import authContext  from '../../Context/authContext';
import Loading from '../BeforeLogin/loading';
import{useQuery} from '@apollo/client';
import {SEARCHUSER} from "../../GraphQl/query";
import SearchResult from './SearchResult';
import SearchBar from './SearchBar'
const Home = (props) => {
    
    const [search, setSearch] = useState('');
    const [searResult, setSearchResult] = useState([])
    const [showResult, setShowResult] = useState(false);

    const [clicked, setClicked] = useState(false);

    //state data for post and user info
    const states = useContext(authContext);

    const {data, error, loading} = useQuery(
        SEARCHUSER, 
        {
            variables:{name: search}
        }
    );

    useEffect(()=>{
        if(data){
            setSearchResult(data.searchUser)
        }
        (async () =>{
            await Keyboard.addListener('keyboardDidShow', () =>{
                setShowResult(true)
        })
        })()
        
    },[search, showResult, data])
    
    
    return(
        <View style={styles.container}>
            {/* search bar by user firstname and lastname */}
            <SearchBar 
                search={search}
                setSearch={setSearch}
                clicked={clicked}
                setClicked={setClicked}
                setShowResult={setShowResult}
            />
            {/* <SearchBar
                round
                searchIcon={{ size: 24 }}
                onChangeText={(text) => setSearch(text)}
                onClear={() =>  setSearch('')}
                placeholder="Search"
                value={search}
                containerStyle={{backgroundColor: '#1e1e1f'}}
                inputStyle={{backgroundColor: 'white'}}
                autoCorrect={false}
                inputContainerStyle={{backgroundColor: 'white', borderWidth: 1}}
                onCancel={() => setShowResult(false)}
                //cancelIcon={platform=""}
            /> */}
            {(!states.allPost) ?  <Loading /> :
            <ScrollView>
                {showResult && 
                    <View style={states.result}>
                        {
                            loading? 
                            <Loading />:
                            searResult.map(item=><SearchResult key={item._id}  searResult={item}/>)
                        }
                    </View>
                }
                {!showResult && <View>
                    {states.allPost && states.allPost.allPost.map(item =>{
                        return <PostCard uri={item.imageAlbum ? item.imageAlbum[0] : null} 
                                data={item} key={item._id} 
                                userInfo={item.owner} fromHome={true}/>
                    })}
                    {!states.allPost.allPost && 
                    <View>
                        <View>
                            <Text>No Post Yet</Text>
                        </View>
                    </View>}
                </View>}
            </ScrollView>
            }
        </View>
    )
    
}



const styles =  StyleSheet.create({
    container:{
        flex: 1,
    },
    searchResult:{
        backgroundColor: '#000',
        width: '100%',
        minHeight: 100
    },
    result:{
        marginTop: 20
    }
})

export default Home;