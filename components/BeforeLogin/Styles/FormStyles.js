import { StyleSheet } from "react-native";

const FormStyles = StyleSheet.create({
    container: {
      flex: 1,
      //marginTop: Constants.statusBarHeight,
    },
    headerView:{
      top: 0,
      paddingLeft: 10
    },
    login:{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      paddingTop: 20
    },
    logoWraper:{
      alignItems: 'center',
    },
    logo:{
      height: 100,
      backgroundColor: '#000',
      width: 100,
      borderRadius: 25,
      justifyContent: 'center'
    },
    logoText:{
      color: '#fff',
      textAlign: 'center'
    },
    inputs:{
      display: 'flex',
      flexDirection:"column",
      alignItems: 'center',
      marginBottom: 20
    },
    input: {
      height: 50,
      backgroundColor: "#f5f5f5",
      paddingLeft: 10,
      marginBottom: 5,
      borderRadius: 10,
      borderColor: "#CCC",
      borderWidth: 1,
      width: '98%',
      marginTop: 10,
      marginBottom: 10,
      justifyContent: 'center'
    },
    logoTextView:{
      marginTop: 10,
      marginBottom: 10
    },
    logoText: {
      fontSize: 16,
      fontWeight: 'bold',

    },
    submitView: {
      height: 50,
      backgroundColor: '#01294a',
      marginBottom: 5,
      borderRadius: 10,
      borderColor: "#CCC",
      borderWidth: 1,
      width: '95%',
      marginTop: 10,
      marginBottom: 10,
      justifyContent: 'center'
    },
    submitText: {
      fontSize: 25,
      fontWeight: 'bold',
      textAlign: "center",
      color: "#fff"
    },
    ForgotPasswordView: {
      borderRadius: 18,
      overflow: 'hidden',
      height: 37,
      width: 165,
      color: '#000',
      marginTop: 5,
      marginBottom: 5,
      justifyContent:'center',
      alignSelf: 'center'
    },
    ForgotPasswordBttn: {
      fontSize: 12,
      fontWeight: '600',
      textAlign: "center",
      paddingVertical: 3,
      color: "#000"
    },
    loading:{
      flex: 1,
      backgroundColor: '#c9d9f2',
      justifyContent: "center",
    },
    horizontal: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 10,
    },
    back_text:{
      fontSize: 18,
      fontWeight: '600',
      color: '#5cacf7'
    },

    picker:{
    //margin: 20,
      backgroundColor: "#f2f0f0",
      marginTop: 'auto', 
      marginLeft: 5,
      marginRight: 5,
      borderColor: "#bdbdbd",
      borderWidth: 1, 
      borderRadius: 20,
    },
    errorView:{
      marginTop: 10,
      marginBottom: 20,
      justifyContent: 'center'
    },
    emptyError:{
      color: '#ed0000',
      fontSize: 21,
      fontWeight: 'bold'
    },

    close:{
    //backgroundColor: 'red'
    margin: 10,
    alignSelf: 'flex-end'
    },
    //FORGOT PAGE
    forgotPage:{
      alignItems: 'center',
     marginTop: 100
    },
  });
  
  export default FormStyles