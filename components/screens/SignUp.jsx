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
import react from "react";

export default function SignUp({ navigation }) {
  //const { signIn } = React.useContext(AuthContext);

  //this is to set up and get the input out of textInput and store it
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  //for account creation
  const [newAccount, setNameAccount] = React.useState(true);

  //error handeling
  const [error , setError] = React.useState("");

  //firebase authentication var
  const authService = firebase.auth();



  //console.log(authService.currentUser);
  //console.log(password.pass);

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
        placeholder="Username"
        placeholderTextColor="rgba(0,0,0,0.6)"
        style={styles.input}
        onChangeText={(user) => setUsername({ user })}
        //value={username}
      />

      <TextInput
        placeholder="Password"
        placeholderTextColor="rgba(0,0,0,0.6)"
        style={styles.input}
        onChangeText={(pass) => setPassword({ pass })}
        //value={password}
      />

      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={async () => {
          //console.log(username.user);
          try {
              let data;
            if (newAccount) {
              //create account
              //signIn();
               data = await authService.createUserWithEmailAndPassword(
                username.user,
                password.pass
              );
            } else {
              //log in
               data = await authService.signInWithEmailAndPassword(
                username.user,
                password.pass
              );
            }
            console.log(data);
          } catch (error) {
            setError(error.message);
            console.log(error);
          }
        }}
      >
        <Text style={styles.buttonText}> CREATE</Text>
      </TouchableOpacity>
      <Text>{error}</Text>
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
