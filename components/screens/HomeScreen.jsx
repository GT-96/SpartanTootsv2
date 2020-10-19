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

export default function HomeScreen({ navigation }) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#567FED",
      }}
    >
      <Image style={styles.logo} source={require("../images/ST.png")} />
      <Text style={[styles.defaultStyle]}>Welcome to iToots</Text>

      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => navigation.navigate("Log in")}
      >
        <Text style={styles.buttonText}> LOGIN</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.buttonText}> SIGN UP</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  defaultStyle: {
    //fontFamily: "GillSans-Bold",
    fontSize: 35,
    color: "#FFF",
    marginBottom: 75,
  },

  logo: {
    width: 200,
    height: 200,
    marginTop: 0,
    marginBottom: 40,
    marginTop: -170,
  },

  buttonContainer: {
    marginTop: 0,
    marginBottom: 25,
    width: 190,
    backgroundColor: "#fff",
    paddingVertical: 20,
    borderRadius: 10,
  },

  buttonText: {
    textAlign: "center",
    color: "#567FED",
    fontWeight: "900",
  },
});
