import React, { useEffect, useReducer, useState } from "react";
import {
  Image,
  View,
  StyleSheet,
  Alert,
  ScrollView,
  TouchableOpacity,
  Text,
  TextInput,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import SettingsList from "react-native-settings-list";
import { Avatar, Button } from "react-native-paper";
import { authService } from "../firebase/Firebase";
import { storageService } from "../firebase/Firebase";
import firebase from "../firebase/Firebase";

//import { v4 as uuidv4 } from "uuid";
//import 'react-native-get-random-values'
import { AuthContext } from "./AuthCon";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import EditSettings from "./EditSettings";
import InputField from "../screens/InputField";
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

const stackNavigator = createStackNavigator();

const cloudSettingsReducer = (state, action) => {
  console.log("this is hitting in cloud settings reducer");
  switch (action.valueToChange) {
    case "All":
      return {
        ...state,
        tutorMode: action.tutorMode,
        image: action.image,
        tutorClasses: action.tutorClasses,
        tutorName: action.tutorName,
      };
    case "image":
      return { ...state, image: action.valueToApply };
    case "Tutor Mode":
      return { ...state, tutorMode: action.valueToApply };
    case "tutorName":
      return { ...state, tutorName: action.valueToApply };
    case "Courses":
      return { ...state, tutorClasses: action.valueToApply };
    // case "Course":
    //   return { ...state, Course: action.valueToApply };
    // case "Post":
    //   return { ...state, Post: action.valueToApply };
    default:
      return new console.error("Custom Error in cloudSettingsReducer");
  }
};

export default function Settings({ log, setLog }) {
  // <stackNavigator.Navigator>
  //   <stackNavigator.Screen name="Edit" component={EditSettings}/>

  // </stackNavigator.Navigator>
  //tutor info
  const [tutorName, setTutorName] = useState("");
  const [tutorClasses, setTutorClasses] = useState("");
  const [tutorImage, setTutorImage] = useState("");
  // const [cloudSettingsData, setCloudData] = useState({});
  const [cloudSettingsData, dispatchCloudSettings] = useReducer(
    cloudSettingsReducer,
    {}
  );
  const [newImageUploaded, setNewImageBool] = useState(false);
  // tutorImage
  const [tutorInfo, setTutorInfo] = useState({
    tutorName: "",
    tutorClasses: [],
    tutorImage: "",
    tutorMode: false,
  });
  const [pushNotifications, setPushNotifications] = useState(false);
  const [myImage, setMyImage] = React.useState();
  const fbCurrentUser = authService.currentUser.uid;
  const dbService = firebase.firestore();
  const refImageUrl = storageService.ref(`${fbCurrentUser}/profilePic`);
  const [editEnabled, setEditEnabled] = useState(false);

  const responseImage = () => {
    if (tutorImage === "" || newImageUploaded) {
      refImageUrl
        .getDownloadURL()
        .then((url) => {
          //from url you can fetched the uploaded image easily
          console.log("this is the link");
          console.log(url);
          setTutorImage(url);
          setNewImageBool(false);
          dispatchCloudSettings({ valueToChange: "image", valueToApply: url });

          dbService
            .collection("tutors")
            .doc(`${fbCurrentUser}`)
            .set(cloudSettingsData);
        })
        .catch((e) => console.log("getting downloadURL of image error => ", e));
      //const { v4: uuidv4 } = require('uuid');
    }
  };

  responseImage();

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
        .child(`${fbCurrentUser}/profilePic`)
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
      mediaTypes: "Images",
    })
      .then((result) => {
        if (!result.cancelled) {
          // User picked an image
          const { height, width, type, uri } = result;
          return uriToBlob(uri);
        }
      })
      .then((blob) => {
        return uploadToFirebase(blob);
      })
      .then((snapshot) => {
        console.log("File uploaded");
        setNewImageBool(true);
      })
      .catch((error) => {
        throw error;
      });
  };

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

  const modeChange = () => {
    console.log("this is hitting in mode Change");
    // setTutorMode(cloudSettingsData.tutorMode);
    // setTutorMode(!tutorMode);
    // setTutorClasses(cloudSettingsData.tutorClasses);
    // setTutorName(cloudSettingsData.tutorName);
    // setCloudData(cloudSettingsReducer(cloudSettingsData, {valueToChange:"Tutor Mode", valueToApply:!cloudSettingsData.tutorMode}));
    dispatchCloudSettings({
      valueToChange: "Tutor Mode",
      valueToApply: !cloudSettingsData.tutorMode,
    });
    dbService
      .collection("tutors")
      .doc(`${fbCurrentUser}`)
      .set(cloudSettingsData);
    // .set({ tutorName:tutorName, tutorClasses:tutorClasses, tutorMode: tutorMode, image: tutorImage  })
  };

  const fetchTutorCloudData = () => {
    console.log("this is reached in fetchTutorCloudData");
    if (Object.keys(cloudSettingsData).length === 0) {
      var newUser = false;
      dbService
        .collection("tutors")
        .doc(`${fbCurrentUser}`)
        .get()
        .then(function (doc) {
          if (doc.exists) {
            console.log("Document data:", doc.data());
            var image = doc.data().image;
            // var tutorClasses = doc.data().tutorClasses;
            var tutorClasses = ["Default", "Test 1", "Test 2"];
            var tutorMode = doc.data().tutorMode;
            var tutorName = doc.data().tutorName;
            if (image == undefined) {
              image = "empty";
            }
            if (tutorClasses == undefined) {
              tutorClasses = ["Default"];
            }
            if (tutorMode == undefined) {
              tutorMode = true;
            }
            if (tutorName == undefined) {
              newUser = true;
              tutorName = authService.currentUser.email.substring(
                0,
                authService.currentUser.email.indexOf("@")
              );
            }
            console.log("image :", image);
            dispatchCloudSettings({
              valueToChange: "All",
              image: image,
              tutorClasses: tutorClasses,
              tutorMode: tutorMode,
              tutorName: tutorName,
            });

            if (newUser) {
              dbService
                .collection("tutors")
                .doc(`${fbCurrentUser}`)
                .set(cloudSettingsData);

              console.log("this is reached in new user if statement");

              dbService
                .collection("tutors")
                .doc(`${fbCurrentUser}`)
                .get()
                .then(function (doc2) {
                  dispatchCloudSettings({
                    valueToChange: "All",
                    image: doc2.data().image,
                    tutorClasses: doc2.data().tutorClasses,
                    tutorMode: doc2.data().tutorMode,
                    tutorName: doc2.data().tutorName,
                  });
                });
            }
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");

            var image = "empty";
            // var tutorClasses = doc.data().tutorClasses;
            var tutorClasses = ["Default", "Test 1", "Test 2"];
            var tutorMode = false;
            var tutorName = authService.currentUser.email.substring(
              0,
              authService.currentUser.email.indexOf("@")
            );
            // if(image==undefined){
            //   image="empty"
            // }
            // if(tutorClasses==undefined){
            //   tutorClasses = ["Default"];
            // }
            // if(tutorMode==undefined){
            //   tutorMode=true;
            // }
            // if(tutorName==undefined){
            //   newUser = true;
            //   tutorName =authService.currentUser.email.substring(0, authService.currentUser.email.indexOf('@'));
            // }
            console.log("image :", image);
            dispatchCloudSettings({
              valueToChange: "All",
              image: image,
              tutorClasses: tutorClasses,
              tutorMode: tutorMode,
              tutorName: tutorName,
            });
            if (newUser) {
              dbService
                .collection("tutors")
                .doc(`${fbCurrentUser}`)
                .set(cloudSettingsData);

              console.log(
                "this is reached in new user if statement in doc else statement"
              );

              dbService
                .collection("tutors")
                .doc(`${fbCurrentUser}`)
                .get()
                .then(function (doc2) {
                  dispatchCloudSettings({
                    valueToChange: "All",
                    image: doc2.data().image,
                    tutorClasses: doc2.data().tutorClasses,
                    tutorMode: doc2.data().tutorMode,
                    tutorName: doc2.data().tutorName,
                  });
                });
            }
          }
        })
        .catch(function (error) {
          console.log("Error getting document:", error);
        });
    }
  };
  fetchTutorCloudData();
  console.log("this is cloudSettingData");
  console.log(cloudSettingsData);

  // const [tutorMode, setTutorMode] = useState(cloudSettingsData.tutorMode);
  // console.log(tutorMode);

  // React.useEffect(() => {
  //   //getFeeds();
  //   dbService.collection("tutors").doc("image")
  //   .onSnapshot(function(doc) {
  //       console.log("Current data: ", doc.data());
  //   });
  // }, []);

  if (!editEnabled) {
    return (
      <>
        <ScrollView>
          <View style={{ flex: 1 }}>
            <View style={{ backgroundColor: "#EFEFF4" }}>
              <Button
                onPress={() => {
                  setEditEnabled(true);
                  // const tutorsItem = dbService
                  //   .collection("tutors")
                  //   .doc(`${fbCurrentUser}`).get.arguments;
                  // console.log("this is tutorsItem");
                  // console.log(tutorsItem);
                }}
              >
                Edit
              </Button>
              <TouchableOpacity onPress={handleOnPress}>
                <Avatar.Image
                  style={styles.iconData}
                  size={240}
                  source={{ uri: tutorImage }}
                  //source={{uri:myImage.uri}}
                />
              </TouchableOpacity>

              <SettingsList borderColor="#c8c7cc" defaultItemSize={60}>
                <SettingsList.Header headerStyle={{ marginTop: 20 }} />

                <SettingsList.Item
                  title="Name"
                  titleInfo={cloudSettingsData.tutorName}
                  titleInfoStyle={styles.titleInfoStyle}
                />
                <SettingsList.Item
                  title="Email"
                  titleInfo={authService.currentUser.email}
                  titleInfoStyle={styles.titleInfoStyle}
                  onPress={() => Alert.alert("Email is not editable")}
                />
                <SettingsList.Item
                  title="Subjects"
                  titleInfo={cloudSettingsData.tutorClasses}
                  titleInfoStyle={styles.titleInfoStyle}
                />
                <SettingsList.Header headerStyle={{ marginTop: 20 }} />

                <SettingsList.Item
                  hasSwitch={true}
                  switchState={cloudSettingsData.tutorMode}
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
      </>
    );
  } else {
    return (
      <>
        {/* <Text> EDIT IN PROGRESS</Text> */}
        <ScrollView>
          <TouchableOpacity onPress={handleOnPress}>
            <Avatar.Image
              style={styles.iconData}
              size={240}
              source={{ uri: tutorImage }}
              //source={{uri:myImage.uri}}
            />
          </TouchableOpacity>
          <InputField
            Title="Name"
            Description="Name"
            value={cloudSettingsData.tutorName}
            onChange={(text) =>
              dispatchCloudSettings({
                valueToChange: "tutorName",
                valueToApply: text,
              })
            }
          />
          <InputField
            Title="Courses"
            Description="Courses"
            value={cloudSettingsData.tutorClasses}
            onChange={(text) =>
              dispatchCloudSettings({
                valueToChange: "Courses",
                valueToApply: text,
              })
            }
          />

          <Button
            onPress={() => {
              dbService
                .collection("tutors")
                .doc(`${fbCurrentUser}`)
                .set(cloudSettingsData);

              setEditEnabled(false);
            }}
          >
            Submit Changes
          </Button>

          <Button
            onPress={() => {
              setEditEnabled(false);
            }}
          >
            Cancel
          </Button>
        </ScrollView>
      </>
    );
  }
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
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "left",
    marginTop: 10,
    marginLeft: 50,
    color: "black",
    fontStyle: "normal",
    fontFamily: "Gill Sans",
    letterSpacing: 5,
    textDecorationColor: "#fff",
  },
});

// export default Settings;
