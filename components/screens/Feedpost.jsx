import React from "react";
import { Text, TouchableOpacity, View, InputField } from "react-native";
import firebase from "../firebase/Firebase";

const Feedpost = ({ feedOject, isPostOwner }) => {
  const dbService = firebase.firestore();

  const [edit, setEdit] = React.useState(false);
  const [newEdit, setNewEdit] = React.useState(feedOject.textState.Title);
  //once clicking the edit this will change to true
  const eventEditing = () => setEdit((prev) => !prev);
  //console.log(edit);
  return (
    <View>
      <Text>{feedOject.textState.Title}</Text>
      {isPostOwner && (
        <>
        <TouchableOpacity
                onPress={async () => {
                  await dbService.doc(`feeds/${feedOject.id}`).delete();
                }}
              >
                <Text> Delet</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  eventEditing();
                  //console.log(edit);
                }}
              >
                <Text> Edit</Text>
              </TouchableOpacity>
          {/* {edit ? (
            <>
            
              <InputField
                value={feedOject.textState.Title}
                onChange={(text) =>
                  dispatchText({ textToChange: "Title", valueToApply: text })
                }
              />
            </>
          ) : (
            <>
              <TouchableOpacity
                onPress={async () => {
                  await dbService.doc(`feeds/${feedOject.id}`).delete();
                }}
              >
                <Text> Delet</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  eventEditing();
                  //console.log(edit);
                }}
              >
                <Text> Edit</Text>
              </TouchableOpacity>
            </>
          )} */}
        </>
      )}
    </View>
  );
};

//const styles = StyleSheet.create({});

export default Feedpost;
