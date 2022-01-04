import React from 'react'
import {View, StyleSheet} from 'react-native'
const Header = (props) => {
    return (
        <View style={styles.header}>
           {props}
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    backgroundColor: '#dfede2',
    height: '20%'
})