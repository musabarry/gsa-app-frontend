import React from "react";
import { StyleSheet, TextInput, View, Keyboard, Button } from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";

const SearchBar = (props) => {

    const goBack = () =>{

        Keyboard.dismiss();
        props.setClicked(false);
        props.setShowResult(false);
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
                    size={25} color="#590e00" 
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
    backgroundColor: '#1e1e1f',
  },
  searchBar: {
    marginTop: 2,
    marginBottom: 2,
    height: 50,
    flexDirection: "row",
    width: "95%",
    backgroundColor: "#f7f5f5",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "space-between",
  },
  input: {
    fontSize: 20,
    width: "85%",
  },
});