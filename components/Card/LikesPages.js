import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LikesList from './LikesList';
const LikesPages = (props) => {

    const navigation = useNavigation();

    const likes = props.route.params.likes

    const goBack =() =>{
        return navigation.goBack()
    }

    //return either the comments or users like base on which button(like | comment) is clicked
    return (
        <SafeAreaView style={styles.container}  >
            <View style={styles.header}>
                <TouchableOpacity onPress={() => goBack()}>
                    <Text style={styles.backText}>Back</Text>
                </TouchableOpacity>
                <View style={{flex:1,justifyContent: "center",alignItems: "center"}}>
                    <Text style={{textAlign: 'center', 
                    textAlignVertical: 'center',
                     fontSize: 21,
                     fontWeight: 'bold'}}>Likes</Text>
                </View>
            </View>
            <ScrollView >
                <View>
                {/* return either the comments or users like base on which button(like | comment) is clicked */}
                {likes && likes.map(item => <LikesList item={item} 
                        key={item._id} keys={item._id} />)
                }
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default LikesPages;

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    header:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'baseline',
        backgroundColor: '#ededed',
        borderBottomWidth: 1,
        borderBottomColor: '#cae8e8',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity:  0.3,
        shadowRadius: 3,
        marginBottom: 10,
    },
    backText:{
        fontSize: 18,
        fontWeight: '600',
        color: '#5cacf7',
        marginLeft: 6
    }

})
