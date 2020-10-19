import { StatusBar } from "expo-status-bar";
import React from "react";
import {
    StyleSheet,
    Text,
    View,
    Button,
    Image,
    TouchableOpacity,
} from "react-native";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { color } from "react-native-reanimated";

export default function PostScreen(props) {

    const allPosts = require('../../TestData/Posts.json')

    return (
        <>
            <Button title="Show Props" onPress={() => { console.log(props) }} />
            <Button title="Show allPosts" onPress={() => { console.log(allPosts) }} />
            
            <View>

            </View>
        </>
    )


}