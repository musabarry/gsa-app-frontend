import React from "react";
import { StyleSheet, TextInput, View, Keyboard, Button } from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";

const SearchBar = (props) => {

    const goBack = () =>{
        Keyboard.dismiss();
        props.setClicked(!props.clicked);
    }
 
    return (
        <View style={styles.container}>
            <View style={styles.searchBar}>
                {/* search Icon */}
                <Ionicons
                    name={props.clicked ? "arrow-back" : "search"}
                    size={30}
                    color='#6796db'
                    onPress={() => goBack()}
                    style={{marginLeft: 5}}
                />
                {/* Input field */}
                <TextInput
                    style={styles.input}
                    placeholder="Search"
                    value={props.search}
                    onChangeText={props.setSearch}
                    autoCorrect={false}
                    onFocus={() => {
                        props.setClicked(true);
                    }}
                />
                {/* cross Icon, depending on whether the search bar is clicked or not */}
                {props.clicked && (
                    <AntDesign 
                        name="close" 
                        size={25} 
                        color="#b59f9e" 
                        style={{marginRight: 5,position: 'absolute', right: 0}}
                        onPress={() => {
                        props.setSearch("")
                        
                    }}/>
                )}
            </View>
        </View>
    );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    backgroundColor: '#ededed',
    borderBottomWidth: 1,
    borderBottomColor: '#cae8e8',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity:  0.3,
    shadowRadius: 3,
  },
  searchBar: {
    marginTop: 2,
    marginBottom: 5,
    height: 50,
    display: 'flex',
    flexDirection: "row",
    // justifyContent: "space-between",
    alignItems: "center",
    width: "98%",
    backgroundColor: "#f7f5f5",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#c9c7c7',
  },
  input: {
    fontSize: 20,
    justifyContent: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    width: "85%",
  },
});