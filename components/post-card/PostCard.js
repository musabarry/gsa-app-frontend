import React from 'react';
import {View, Text, StyleSheet, Image}  from 'react-native';
import { FontAwesome5, EvilIcons } from '@expo/vector-icons';


const textPost =() =>(
    <View>
        <Text style={styles.textPost}>
            Hello, Everyone. I hope you are doing well.
            Hello, Everyone. I hope you are doing well.
            Hello, Everyone. I hope you are doing well.
            Hello, Everyone. I hope you are doing well.
        </Text>
    </View>
)
const imagePost =(image) =>(
    <View>


    </View>
)
const PostCard = (props) =>{



    // if(props.uri){
    //     console.log(true);
    // }

    return(
        <View style={styles.card_wrapper}>
            <View style={styles.top_wrapper}>
                <View><FontAwesome5 name="user-alt" size={24} color="black" /></View>
                <View style={styles.nameBox}>
                    <Text style={styles.name}>Cellou Diallo</Text>
                    <Text style={styles.school}>@citytech</Text>
                </View>
            </View >
            <View style={styles.middle_wrapper}>
                <View style={styles.post}>
                {props.uri ?
                    (
                        <Image   style={styles.img} 
                             source={{uri: props.uri}} />
                                    
                    ):(
                    <Text style={styles.textPost}>
                        Hello, Everyone. I hope you are doing well.
                        Hello, Everyone. I hope you are doing well.
                        Hello, Everyone. I hope you are doing well.
                        Hello, Everyone. I hope you are doing well.
                    </Text>

                    )}
                    <View style={styles.timeOption}>
                        <Text>6:09 pm . May, 5, 2014</Text>
                        <Text>...</Text>
                    </View>
                </View>
                <View style={styles.likes}>
                    <View style={styles.num}>
                        <EvilIcons name="heart" size={24} color="black" /> 
                        <Text>6K</Text>
                    </View>
                    <View  style={styles.num}>
                        <EvilIcons name="comment" size={24} color="black" /> 
                        <Text>4.7K</Text>
                    </View>
                </View>
            </View>
            <View style={styles.bottom_wrapper}>
            </View>
        </View>
    )
}

const styles =  StyleSheet.create({
    card_wrapper:{
        minHeight: 40,
        backgroundColor: '#dbdbdb',
        borderWidth: 1,
        borderColor: '#dbdbdb',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        width: '95%',
        margin: 10,
        borderRadius: 10,
        padding: 10
    },
    top_wrapper:{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'baseline',
        flexWrap: 'wrap',
        margin: 4,
        // borderBottomColor: '#000',
        // borderBottomWidth: 1
    },
    nameBox:{
        marginLeft: 10,
        flexDirection: 'column',
    },
    middle_wrapper:{
        borderRadius: 10
        
    },
    likes:{
        margin: 4,
        flexDirection: 'row',
        alignItems: 'center'
    },
    num:{
        flexDirection: 'row',
        margin: 3
    },
    post:{
        borderBottomColor: '#000',
        borderBottomWidth: 1,
        backgroundColor: '#f2ebdc',
        borderRadius: 10,
        padding: 5
    },
    timeOption:{
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    textPost:{

    },
    img:{
        width: '100%',
        height: 150,
    }

})

export default PostCard;