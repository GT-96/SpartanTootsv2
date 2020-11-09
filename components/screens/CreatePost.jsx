import { StatusBar } from "expo-status-bar";
import React, { useReducer } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  FlatList,
  Button,
} from "react-native";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { color } from "react-native-reanimated";
import { TextInput } from "react-native-paper";
import InputField from "./InputField";
import firebase from "../firebase/Firebase";

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

const submitPost = () => {};
export default function CreatePost(props) {
  const dbService = firebase.firestore();
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

  //    console.log("this is in Create POst");
  //    console.log(props);
  return (
    <View>
      <>
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
      <Button
        title="show props"
        onPress={() => {
          console.log("this is in createPost");
          console.log(props);
        }}
      />

      <Button
        title="show textState"
        onPress={async() => {
          await dbService.collection("feeds").add({ textState, createdAt: Date.now() }),
            //console.log(textState),
            //console.log(dbService)
            console.log("TEST DATABASE");
        }}
      />
      <Button title="submit" onPress={() => {}} />
    </View>
  );
}

const styles = StyleSheet.create({
  input: { height: 40, borderColor: "gray", borderWidth: 1 },
});
