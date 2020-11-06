import React from 'react'
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
    TextInput
  } from "react-native";

export default function InputField({Title, Description, onChange, value}){
    return(
    <>
        <View>
            <Text>{Description}</Text>
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
    input: { height: 40, borderColor: "gray", borderWidth: 1 }
})