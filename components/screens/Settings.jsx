import React, { useEffect, useState } from "react";
import { Image, View, StyleSheet, Alert, ScrollView, TouchableOpacity } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import SettingsList from "react-native-settings-list";
import { Avatar } from "react-native-paper";
import { authService } from "../firebase/Firebase";
import { AuthContext } from "./AuthCon";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


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
  export default function Settings({log, setLog}){

    const[tutorMode, setTutorMode]= useState(false);
    const[pushNotifications, setPushNotifications]= useState(false);

    pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      console.log(result);

      if (!result.cancelled) {
        setImage(result.uri);
      }
    };

    // console.log("this is settings");
    // console.log(log);
    // console.log(setLog);
    return (

      <ScrollView>
        <View style={{ flex: 1 }}>
          <View style={{ backgroundColor: "#EFEFF4" }}>
          <TouchableOpacity onPress={pickImage}>
            <Avatar.Image
              style={styles.iconData}
              size={240}
              source={require("../images/prof.png")}
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
                switchOnValueChange={()=>{
                  setTutorMode(!tutorMode);
                }}
                hasNavArrow={false}
                title="Tutor Mode"
              />

              <SettingsList.Item
                hasSwitch={true}
                switchState={pushNotifications}
                switchOnValueChange={()=>{setPushNotifications(!pushNotifications)}}
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
