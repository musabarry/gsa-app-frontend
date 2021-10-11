import React, {useState, useContext} from 'react'
import {View, StyleSheet, ScrollView} from 'react-native';
import PostCard from '../Card/PostCard';
import { SearchBar } from 'react-native-elements';
import authContext  from '../../Context/authContext';
import Loading from '../BeforeLogin/loading';

const Home = (props) => {
    const [search, setSearch] = useState('');

    //state data for post and user info
    const states = useContext(authContext);

    if(!states.allPost){
        return(
            <Loading />
        )
    }
    return(
        <View style={styles.container}>
            <View>
                {/* search bar by user firstname and lastname */}
            <SearchBar
                round
                searchIcon={{ size: 24 }}
                onChangeText={(text) => setSearch(text)}
                onClear={text =>  setSearch('')}
                placeholder="Search"
                value={search}
                containerStyle={{backgroundColor: '#1e1e1f'}}
                inputStyle={{backgroundColor: 'white'}}
                inputContainerStyle={{backgroundColor: 'white', borderWidth: 1}}
            />
            </View>
            {/* render all post */}
           <ScrollView>
           {states.allPost && states.allPost.allPost.map(item =>{
                return <PostCard uri={item.imageAlbum ? item.imageAlbum[0] : null} 
                        data={item} key={item._id} 
                        userInfo={item.owner}/>
              })}
           </ScrollView>
        </View>
    )
    
}






const styles =  StyleSheet.create({
    container:{
        flex: 1,
    }
})

export default Home;