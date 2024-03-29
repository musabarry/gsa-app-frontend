import React, {useState, useContext} from 'react'
import {Text, View, StyleSheet, ScrollView, StatusBar, SafeAreaView} from 'react-native';

const MyStatusBar = ({backgroundColor, ...props}) => (
    <View style={[styles.statusBar, { backgroundColor }]}>
      <SafeAreaView>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
      </SafeAreaView>
    </View>
);

const STATUSBAR_HEIGHT = StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;


class Theme extends Component {
    render() {
      return (
        <View style={styles.container}>
          <MyStatusBar backgroundColor="#5E8D48" barStyle="light-content" />
          <View style={styles.appBar} />
          <View style={styles.content} />
        </View>
      );
    }
  }

const styles =  StyleSheet.create({
    container:{
        flex: 1,
        marginTop: Constants.statusBarHeight,
    },
    statusBar: {
        height: STATUSBAR_HEIGHT,
    },
    appBar: {
        backgroundColor:'#79B45D',
        height: APPBAR_HEIGHT,
      },
      content: {
        flex: 1,
        backgroundColor: '#33373B',
      },
})

export default Theme;