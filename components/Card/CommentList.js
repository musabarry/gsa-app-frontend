import React, {useState, useCallback, useEffect} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, FlatList, Platform, TouchableHighlight} from 'react-native';
import Loading from '../BeforeLogin/loading';
import { AntDesign } from '@expo/vector-icons';
import TextCom from './TextCom';

//component for rendering comment
const CommentList = ({item}) => {
    const max_num = 2
    const [showText, setShowText] = useState(false);
    const [numberOfLines, setNumberOfLines] = useState(undefined);
    const [showMoreButton, setShowMoreButton] = useState(false);

    const onTextLayout = useCallback(
        (e) => {
          if (e.nativeEvent.lines.length > max_num && !showText) {
            setShowMoreButton(true);
            setNumberOfLines(max_num);
          }
        },
        [showText]
      );

      useEffect(() => {
        if (showMoreButton) {
          setNumberOfLines(showText ? undefined : max_num);
        }
      }, [showText, showMoreButton]);
    return (
        <View style={styles.comment_wrapper}  >
            <View style={styles.info}>
                <View style={styles.thumbnail_wraper}>
                    {
                        item.byUser.avatar !== '' &&
                        <Image style={styles.thumbnail} source={{uri: item.byUser.avatar}}/> 
                    }
                </View>
                <View>
                    <Text style={styles.name}>{item.byUser.firstname} {item.byUser.lastname}</Text>
                    <Text>  @{item.byUser.school}</Text>
                </View>
            </View>
            <View style={styles.comment}>
                <TextCom textData={item.text} max_line={2}/>
                <Text style={styles.date}>{item.date}</Text>
            </View>
        </View>


    );
}



export default CommentList;

const styles = StyleSheet.create({
    comment_wrapper:{
        backgroundColor: '#e6e6e6',
        display: 'flex',
        flexDirection: 'column',
        alignSelf: 'center',
        borderColor: '#cccccc',
        borderWidth: 1,
        padding: 5,
        shadowOffset:{
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        width: '90%',
        borderRadius: 10,
        marginBottom: 4,
       
    },
    info:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    name:{
        marginLeft: 10,
        fontWeight: '700',
        textTransform: 'capitalize'
    },
    comment:{
        display: 'flex',
        flexDirection: 'column',
        padding: 5
    },
    date:{
        alignSelf: 'flex-end'
    },
    thumbnail_wraper:{
        width: 50,
        height: 50,
        borderWidth: 1,
        borderRadius: 100,
        borderColor: '#CCC',
        backgroundColor: '#01294a'
    },
    thumbnail:{
        width: '100%',
        height: '100%',
        borderRadius: 100
    }

})