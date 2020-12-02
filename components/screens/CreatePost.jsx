import { StatusBar } from "expo-status-bar";
import React, { useReducer, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
} from "react-native";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { color } from "react-native-reanimated";
import { TextInput } from "react-native-paper";
import Emoji from 'react-native-emoji';
import InputField from "./InputField";
import firebase from "../firebase/Firebase";
import { TouchableOpacity } from "react-native-gesture-handler";

const textInputReducer = (state, action) => {
  switch (action.textToChange) {
    case "Title":
      return { ...state, Title: action.valueToApply };
    case "Course":
      return { ...state, Course: action.valueToApply };
    case "Post":
      return { ...state, Post: action.valueToApply };
    default:
      return new console.error("Custom Error in textInputReducer");
  }
};

 const submitPost =  async (props, textState) => {
  const dbService = firebase.firestore();
  const fbCurrentUser = firebase.auth().currentUser.uid;
    await dbService
      .collection("feeds")
      .add({textState, createdAt: Date.now(), postedBy: fbCurrentUser }),
      //console.log(feeds),
      //console.log(fbCurrentUser);
      console.log("TESTsss DATABASE");
  props.navigation.navigate("Home");

};
export default function CreatePost(props) {

  const initialTextInputStates = {
    Title: "",
    Course: "",
    Post: "",
    Username: "",
    UserID: "",
    PostID: "",
  };

  const [textState, dispatchText] = useReducer(
    textInputReducer,
    initialTextInputStates
  );

  const { Title, Course, Post, Username, UserID } = textState;

  // const [feeds, setFeeds] = useState([]);
  // const getFeeds = async () => {
  //   const dbFeeds = await dbService.collection("feeds").get();
  //   dbFeeds.forEach((document) => {
  //     const feedObject = {
  //       ...document.data(),
  //       id: document.id,
  //     };
  //     setFeeds((prev) => [feedObject, ...prev]);
  //   });
  // };
  // React.useEffect(() => {
  //   getFeeds();
  // }, []);
  //console.log(feeds);
  //    console.log("this is in Create POst");
  //    console.log(props);

  return (
    <View style = { styles.container}>
      <>
      <Text style={styles.title}>
        Get help, get connected!
        <Emoji name="brain" style={{fontSize: 30}} />
        <Emoji name="sunglasses" style={{fontSize: 30}} />
        </Text>
        <InputField
          Title="Title"
          Description="Title"
          value={Title}
          onChange={(text) =>
            dispatchText({ textToChange: "Title", valueToApply: text })
          }
        />
        <InputField
          Title="Course"
          Description="Course"
          value={Course}
          onChange={(text) =>
            dispatchText({ textToChange: "Course", valueToApply: text })
          }
        />
        <InputField 
          Title="Post"
          Description="Post"
          value={Post}
          onChange={(text) =>
            dispatchText({ textToChange: "Post", valueToApply: text })
          }
        />
      </>

     {/* <Button 
        title="show props"
        onPress={() => {
          console.log("this is in createPost");
          console.log(props);
        }}
      />*/}

      {/* <TouchableOpacity
          onPress={() => {
          console.log("this is in createPost");
          console.log(props);
        }}
        style={styles.button}
      >
        <Text style={styles.buttonText}>show props</Text>
        </TouchableOpacity> */}

      {/* <Button
        title="show textState"
        onPress={async () => {
          await dbService
            .collection("feeds")
            .add({ textState, createdAt: Date.now(), postedBy: fbCurrentUser }),
            //console.log(feeds),
            //console.log(fbCurrentUser);
            console.log("TESTsss DATABASE");
        }}
      /> */}
      
      {/*<Button title="submit" onPress={() => {
        submitPost(props, textState);
      }} /> */}

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
        submitPost(props, textState);
      }} >
         <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  input: { height: 40, borderColor: "gray", borderWidth: 1 },
  container:
  {
      backgroundColor: '#D6DAF1' // Set your own custom Color

  },
  title:{
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 20,
    color: "black",
    fontStyle: "normal",
    fontFamily: "Helvetica",
    letterSpacing: 2,
    textDecorationColor: "#fff",
 },
 button: {
    marginTop: -30,
    marginBottom: 45,
    width: 140,
    backgroundColor: "#303f9f",
    paddingVertical: 15,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: "#303f9f",
    marginLeft: 135
  
},
buttonText: {
  textAlign: "center",
  color: "#FFFFFF",
  fontWeight: "900",
}
});