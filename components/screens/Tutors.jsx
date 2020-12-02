//import React from 'react';
import React, { Component, useState } from "react";
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, Button} from 'react-native';
import { State } from "react-native-gesture-handler";
import firebase from "../firebase/Firebase";
import { storageService } from "../firebase/Firebase";

const Item = ({ item }) => {
 
  const fbCurrentUser = firebase.auth().currentUser.uid;
  const refImageUrl = storageService.ref(`${fbCurrentUser}/profilePic`);
  const responseImage = refImageUrl.getDownloadURL()
  .then((url) => {
    //from url you can fetched the uploaded image easily
     console.log("this is the link");
     console.log(url);
    setAttachment(url);
  })
  .catch((e) => console.log('getting downloadURL of image error => ', e));
 
  // const uploadImage = async (uri, name, firebasePath) => {
  //   const refImageUrl = storageService.ref(`${fbCurrentUser}/sdfsdfsdfsssdsdsd`)
  //   await refImageUrl.putFile(uri, { contentType: 'image/jpg'}).catch((error) => { throw error })
  //   const url = await refImageUrl.getDownloadURL().catch((error) => { throw error });
  //   return url
  // }
  //const uploadedUrl = await uploadImage('uri/of/local/image', 'image.jpg', `${fbCurrentUser}/sdfsdfsdfsssdsdsd`);
  if(!item.tutorMode){
    console.log("this is item.image",item.image);
    return (
    <View style={styles.listItem}>
      {console.log(responseImage)}
      <Image source={{uri:item.image}}  style={{width:65, height:65,borderRadius:30}} />
      <View style={{alignItems:"center",flex:1}}>
        <Text style={{fontWeight:"bold"}}>{item.tutorName}</Text>
        <Text>{item.tutorClasses}</Text>
      </View>
      <TouchableOpacity style={{height:50,width:50, justifyContent:"center",alignItems:"center"}}>
      <Image style={styles.logo}source={require("../images/chat3.png")} />
      
      </TouchableOpacity>
    </View>
  );
    }
}

export default function Tutors(props)  {

  const dbService = firebase.firestore();
  const fbCurrentUser = firebase.auth().currentUser.uid;
  const [tutors, setTutors] = useState([]);
  const [attachment, setAttachment] = React.useState();
  const [dummyStateVar, setDummy] = useState(false);
  React.useEffect(() => {
    //getFeeds();
    dbService.collection("tutors").onSnapshot((snapshot) => {
      const tutorArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTutors(tutorArray);


    });
  }, []);
  
  console.log("below is the tutors object in tutors");
  console.log(tutors);

    return (
      <View style={styles.container}>
       <TouchableOpacity>
       <Image style={styles.fil}source={require("../images/filter.png")} />
       </TouchableOpacity>
       
        <FlatList
          style={{flex:1}}
          data={tutors}
          renderItem={Item}
          keyExtractor={(tutor) => tutor.id}
        />

        <Button title="refresh page" onPress={()=>{
          setDummy(!dummyStateVar);
        }}/>
      </View>
    );
  
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    marginTop:5
  },
  listItem:{
    margin:10,
    padding:10,
    backgroundColor:"#FFF",
    width:"90%",
    flex:1,
    alignSelf:"center",
    flexDirection:"row",
    borderRadius:5
  },

  logo: {
    width: 30,
    height: 25,
    marginTop: 45,
    marginBottom: 40,
  },

  fil: {
    width: 30,
    height: 25,
    marginTop: 5,
    marginBottom: 0,
    marginLeft: 360
  },

}); 
