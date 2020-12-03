import React from 'react'
import {
    StyleSheet,
    Text,
    View,
    TextInput
  } from "react-native";

export default function InputField({Title, Description, onChange, value}){
    return(
    <>
        <View style = { styles.container}>
            <Text style={styles.title}>{Description}</Text>
                <TextInput
                name = {Title}
                style = {styles.input}
                onChangeText ={(text)=> onChange(text)}
                value = {value}
            />
        </View>
        
    </>
    )
}

const styles = StyleSheet.create({
    input: { 
        borderWidth: 3.5,
        borderColor: "#303f9f",
        marginTop: 0,
        marginBottom: 0,
        marginLeft: 30,
        paddingHorizontal: 20,
        width:"80%",
        backgroundColor:"#E9F2FD",
        borderRadius:10,
        height:65,
        justifyContent:"center",
        padding:20
    },
    container:
     {
         backgroundColor: '#D6DAF1', // Set your own custom Color
         marginBottom: 40,
     },

     title:{
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "left",
        marginTop: 0,
        marginLeft: 50,
        color: "black",
        fontStyle: "normal",
        fontFamily: "Gill Sans",
        letterSpacing: 5,
        textDecorationColor: "#fff",
     }

})