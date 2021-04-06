import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Platform,
  FlatList
} from "react-native";
import Constants from 'expo-constants';

export default class About extends Component { 
  Data=[
    "For all members to be involved in providing and receiving mentorship",

    "To promote connections between all the members", 

    "For all members to obtain internship/research/similar career-based projects by the end of the academic calendar",

    "To strengthen the leadership qualities of our members, within the club and outside of it",
    
    "To stay up to date in sharing information that will benefit our members",

    "To promote the club and increase our membership",

    "Documentation sharing books and pdfs",
  ]
  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.wrapper}>
          <Text style={styles.title}>WHO WE ARE</Text>
          <Text style={styles.para}>
            Guinean Student Association (GSA) 
            of New York City College of Technology is a group 
            of students who work together to promote the
            academic and professional success of our 
            members and our community at large. 
          </Text>
        </View>
        <View style={styles.wrapper}>
          <Text style={styles.title}>OUR MISSION</Text>
          <Text style={styles.para}>
          Our mission at GSA is to support each other as 
          we work towards academic and professional success.
          We know that a college education is not just about obtaining a 
          diploma and hanging it on the wall. 
          College is the place for defining one’s self, reaching out and networking 
          with other intelligent and passionate people, and making the 
          best use of resources and opportunities to achieve one’s goals. 
          We do this by advertising the various internships, research, and 
          employment opportunities that come up through CUNY and other sources. 
          Moreover, we go the extra mile to help each other build the skills
          necessary to succeed in classes, applications, and future careers.
          </Text>
        <View>
          <Text style={styles.title}>OUR GOALS</Text>
          <FlatList
              data={this.Data}
              renderItem={({item}) => <View style={styles.list}>
                <Text>{'\u2022'}</Text>
                <Text style={styles.item}>{item}</Text>
                </View>}
              keyExtractor={(item, index) => index.toString()}/>
        </View>
  
        </View>
      </ScrollView>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    paddingTop: 50,
  },
  wrapper:{
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "800",

  },
  para: {
    margin: 10,
    fontSize: 15,
    fontWeight: "600",
    justifyContent: "center"
  },
  list: {
    flexDirection: "row",
  },
  item:{
    fontSize: 15,
    fontWeight: "600",
    flex: 1, 
    paddingLeft: 5
  }
});