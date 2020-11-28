import { StatusBar } from "expo-status-bar";
import React from "react";

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthContext } from "./AuthCon";
import firebase from "../firebase/Firebase";
import { auth } from "firebase";


export default function LogIn({ navigation }) {
  const { signIn } = React.useContext(AuthContext);

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error , setError] = React.useState("");
  
  //firebase authentication
  const authService = firebase.auth();
  
  // console.log(authService.currentUser);
  //console.log(username);

  // const user1 = "saoud";
  // const pass1 = "123abc";


  return (
    <View
      style={{
        flex: 1,
        
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#3F51B5",
      }}
    >
      <Image style={styles.logo} source={require("../images/ST.png")} />

      <TextInput
        textAlign={'center'}
        placeholder="Email"
        placeholderTextColor="rgba(0,0,0,0.6)"
        style={styles.input}
        onChangeText={(user) => setUsername({ user })}
        //value={username}
      />

      <TextInput 
        textAlign={'center'}
        secureTextEntry={true}
        placeholder="Password"
        placeholderTextColor="rgba(0,0,0,0.6)"
        style={styles.input}
        onChangeText={(pass) => setPassword({ pass })}
        //value={password}
      />

      <TouchableOpacity
        style={styles.buttonContainer}
        
        onPress={async () => {
          console.log(authService.currentUser);
          try {
              let data;

              //log in
               data = await authService.signInWithEmailAndPassword(
                username.user,
                password.pass
              );
            
            console.log(data);
          } catch (error) {
            setError(error.message);
            console.log(error);
          }
        }}
      >
        <Text style={styles.buttonText}> LOGIN</Text>
      </TouchableOpacity>

      {/* <TouchableOpacity
      
        style={styles.buttonContainer}
        onPress={ async() => {
          var provider = new firebase.auth.GoogleAuthProvider();
          const data= await authService.signInWithPopup(provider);
          console.log(data);
        }}
      >
        <Text style={styles.buttonText}> Google Login</Text>
      </TouchableOpacity> */}
      <Text style={styles.plaintxt}> Forgot Password?</Text>
      <Text> {error}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  defaultStyle: {
    // fontFamily: "GillSans-Bold",
    fontSize: 35,
    color: "#FFF",
    marginBottom: 75,
  },

  logo: {
    width: 200,
    height: 200,
    marginTop: 0,
    marginBottom: 40,
    marginTop: -100,
  },

  buttonContainer: {
    marginTop: 0,
    marginBottom: 25,
    width: 190,
    backgroundColor: "#fff",
    paddingVertical: 20,
    borderRadius: 10,
    borderWidth: 3.5,
    borderColor: "#303f9f",
  },

  buttonText: {
    textAlign: "center",
    color: "#3F51B5",
    fontWeight: "900",
    
  },

  input: {
    height: 40,
    borderWidth: 3.5,
    borderColor: "#303f9f",
    marginTop: 15,
    marginBottom: 30,
    paddingHorizontal: 20,
    width:"80%",
    backgroundColor:"#E9F2FD",
    borderRadius:20,
    height:65,
    marginBottom:25,
    justifyContent:"center",
    padding:20
  
  },
  
  plaintxt: {
    height: 40,
    marginTop: 15,
    marginBottom: 30,
    color: "#fff",
    paddingHorizontal: 100,
    textAlignVertical: "top",
    fontWeight: "bold",
  },
});
