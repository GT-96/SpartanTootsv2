import React, { useEffect, useState } from "react";
import {
  Image,
  View,
  StyleSheet,
  Alert,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import SettingsList from "react-native-settings-list";
import { Avatar } from "react-native-paper";
import { authService } from "../firebase/Firebase";
import { storageService } from "../firebase/Firebase";
import firebase from "../firebase/Firebase";

//import { v4 as uuidv4 } from "uuid";
//import 'react-native-get-random-values'
import { AuthContext } from "./AuthCon";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

//import Component from 'react';

// class Settings extends React.Component {

//   constructor(props) {

//    //console.log(authService.currentUser);

//     super(props);
//     this.onValueChange = this.onValueChange.bind(this);
//     this.state = {
//       switchValue: false,
//     };
//   }
// function onValueChange(value) {
//   this.setState({ switchValue: value });
// }
//   render() {
export default function Settings({ log, setLog }) {
  const [tutorMode, setTutorMode] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [myImage, setMyImage] = React.useState();
  const fbCurrentUser = authService.currentUser.uid;
  const dbService = firebase.firestore();
  //const { v4: uuidv4 } = require('uuid');
  



  uriToBlob = (uri) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.onload = function () {
        // return the blob
        resolve(xhr.response);
      };

      xhr.onerror = function () {
        // something went wrong
        reject(new Error("uriToBlob failed"));
      };

      // this helps us get a blob
      xhr.responseType = "blob";

      xhr.open("GET", uri, true);
      xhr.send(null);
    });
  };
  uploadToFirebase = (blob) => {
    return new Promise((resolve, reject) => {
      //var storageRef = firebase.storage().ref();

      storageService
        .ref()
        .child(`${fbCurrentUser}/sdfsdfsdfsssdsdsd`)
        .put(blob, {
          contentType: "image/jpeg",
        })
        .then((snapshot) => {
          blob.close(); // let's free up the blob

          resolve(snapshot);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  handleOnPress = () => { 

    ImagePicker.launchImageLibraryAsync({ 
      mediaTypes: "Images"
    }).then((result)=>{ 

      if (!result.cancelled) {
        // User picked an image
        const {height, width, type, uri} = result;
        return uriToBlob(uri);

      }

    }).then((blob)=>{

      return uploadToFirebase(blob);

    }).then((snapshot)=>{

      console.log("File uploaded");
   
    }).catch((error)=>{

      throw error;

    }); 

  }

  // pickImage = async () => {
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.All,
  //     allowsEditing: true,
  //     aspect: [4, 3],
  //     quality: 1,
  //   });
  //   setMyImage(result);
  //   console.log("myImage");
  //   console.log(myImage);

  //   const fileRef = storageService.ref().child(`${fbCurrentUser}`);
  //   const response = await fileRef.put(myImage.uri, {
  //     contentType: "image/jpeg",
  //   });
  //   console.log("respoooooonse");
  //   console.log(response);
  //   if (!result.cancelled) {
  //     setImage(result.uri);
  //     setMyImage(result);
  //   }
  // };

  // console.log("this is settings");
  // console.log(log);
  //console.log("myImage");
  //console.log(myImage);
  console.log(tutorMode);

   const modeChange = ()=>{
    setTutorMode(!tutorMode);
     dbService
    .collection("tutors").doc(`${fbCurrentUser}`)
    .set({tutorMode: tutorMode  })
    
  }; 
  return (
    <ScrollView>
      <View style={{ flex: 1 }}>
        <View style={{ backgroundColor: "#EFEFF4" }}>
          <TouchableOpacity onPress={handleOnPress}>
            <Avatar.Image
              style={styles.iconData}
              size={240}
              source={require("../images/prof.png")}
              //source={{uri:myImage.uri}}
            />
          </TouchableOpacity>

          <SettingsList borderColor="#c8c7cc" defaultItemSize={60}>
            <SettingsList.Header headerStyle={{ marginTop: 20 }} />

            <SettingsList.Item
              title="Name"
              titleInfo="Jane Doe"
              titleInfoStyle={styles.titleInfoStyle}
            />
            <SettingsList.Item
              title="Email"
              titleInfo="janedoe333@gmail.com"
              titleInfoStyle={styles.titleInfoStyle}
              onPress={() => Alert.alert("Email is not editable")}
            />
            <SettingsList.Item
              title="Subjects"
              titleInfo="CS 151, CMPE 102, MATH 123A, CS 149"
              titleInfoStyle={styles.titleInfoStyle}
            />
            <SettingsList.Header headerStyle={{ marginTop: 20 }} />

            <SettingsList.Item
              hasSwitch={true}
              switchState={tutorMode}
              // switchOnValueChange={() => {
              //   setTutorMode(!tutorMode);
              // }}
              // switchOnValueChange={ () => {
              //    dbService
              //     .collection("tutorMode")
              //     .add({ textState, createdAt: Date.now(), postedBy: fbCurrentUser, })},
              //     setTutorMode(!tutorMode)
              //   }
              //modeChange
              switchOnValueChange={modeChange}
              hasNavArrow={false}
              
              title="Tutor Mode"
            />

            <SettingsList.Item
              hasSwitch={true}
              switchState={pushNotifications}
              switchOnValueChange={() => {
                setPushNotifications(!pushNotifications);
              }}
              hasNavArrow={false}
              title="Push Notifications"
            />

            <SettingsList.Header headerStyle={{ marginTop: 75 }} />

            <SettingsList.Item
              icon={
                <Image
                  style={styles.imageStyle}
                  source={require("../images/ST.png")}
                />
              }
              title="Logout"
              //onPress={() => navigation.navigate("Log in")}
              // onPress={() => Alert.alert("Are you sure?", "Logging out will require you to reenter your credentials.",
              // [ {text: 'Logout', style: 'destructive'}, {text: 'Cancel'},
              // ],{cancelable: false}
              // )}
              onPress={() => {
                Alert.alert(
                  "Are you sure?",
                  "Logging out will require you to reenter your credentials.",
                  [
                    {
                      text: "Logout",
                      style: "destructive",
                      onPress: () => {
                        authService.signOut();
                        setLog(!log);
                        console.log(authService.currentUser);
                      },
                    },
                    { text: "Cancel" },
                  ],
                  { cancelable: false }
                );

                //console.log(authService.currentUser);
                //navigation.navigate('Log in');
                // this.props.navigation.navigate('HomeScreen');
                //AuthContext.signOut();
              }}
            />
          </SettingsList>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  imageStyle: {
    marginLeft: 5,
    alignSelf: "center",
    height: 50,
    width: 70,
  },
  titleInfoStyle: {
    fontSize: 16,
    color: "#000000",
  },
  iconData: {
    //width:15,
    //height:15,
    marginTop: 5,
    marginLeft: 80,
  },
});

// export default Settings;
