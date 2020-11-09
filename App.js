import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LogIn from "./components/screens/LogIn";
import HomeScreen from "./components/screens/HomeScreen";
import HomeHome from "./components/screens/HomeHome";
import Settings from "./components/screens/Settings";
import Tutors from "./components/screens/Tutors";
import Chat from "./components/screens/Chat";
import SignUp from "./components/screens/SignUp";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
//import Ionicons from "react-native-vector-icons/MaterialIcons";
import { AuthContext } from "./components/screens/AuthCon";
import PostScreen from "./components/screens/PostScreen";
import CreatePost from "./components/screens/CreatePost";
//import firebase from './components/firebase/Firebase';
import firebase from "./components/firebase/Firebase";
import { authService } from "./components/firebase/Firebase";

//console.log(firebase);
//console.log(firebase.auth().currentUser);

const HomeStack = createStackNavigator();
const SettingStack = createStackNavigator();
const AuthStack = createStackNavigator();

const HomeStackScreen = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen name="Home" component={HomeHome} />

    <HomeStack.Screen name="PostScreen" component={PostScreen} />
    <HomeStack.Screen name="Create Post" component={CreatePost} />
  </HomeStack.Navigator>
);

const SettingStackScreen = ({ log, setLog }) => {
  console.log("this is in SettingStackScreen");
  console.log(log);
  console.log(setLog);
  return (
    <>
      <SettingStack.Navigator>
        {/* <SettingStack.Screen name="Settings" component={Settings} /> */}
        <SettingStack.Screen name="Settings">
          {(idk) => <Settings log={log} setLog={setLog} />}
        </SettingStack.Screen>
        <SettingStack.Screen name="HomeScreen" component={HomeScreen} />
      </SettingStack.Navigator>
    </>
  );
};

const TutorsStackScreen = () => (
  <SettingStack.Navigator>
    <SettingStack.Screen name="Tutors" component={Tutors} />
  </SettingStack.Navigator>
);

const ChatStackScreen = () => (
  <SettingStack.Navigator>
    <SettingStack.Screen name="Chat" component={Chat} />
  </SettingStack.Navigator>
);
//=====================
const Tab = createBottomTabNavigator();

function MyTabs(props) {
  //Shows props and whos authenticated
  // console.log("mytabbs");
  // console.log(props);
  // console.log(authService.currentUser);

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "ios-home" : "ios-home";
          } else if (route.name === "Settings") {
            iconName = focused ? "ios-settings" : "ios-settings";
          } else if (route.name === "Chat") {
            iconName = focused ? "ios-chatbubbles" : "ios-chatbubbles";
          } else if (route.name === "Tutors") {
            iconName = focused ? "ios-people" : "ios-people";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "tomato",
        inactiveTintColor: "gray",
      }}
    >
      {/* <Tab.Screen name="Settings" component={SettingStackScreen}/> */}
      <Tab.Screen name="Settings">
        {/* this is how to pass props to a screen */}
        {(idk) => <SettingStackScreen log={props.log} setLog={props.setLog} />}
        {/* {props=> <SettingStackScreen {...props}/>} */}
      </Tab.Screen>
      <Tab.Screen name="Chat" component={ChatStackScreen} />
      <Tab.Screen name="Tutors" component={TutorsStackScreen} />
      <Tab.Screen name="Home" component={HomeStackScreen} />
    </Tab.Navigator>
  );
}

//=====================
export default function App() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [userToken, setUserToken] = React.useState(null);

  const authContext = React.useMemo(() => {
    return {
      signIn: () => {
        setIsLoading(false);
        setUserToken("abcd");
      },
      signUp: () => {
        setIsLoading(false);
        setUserToken("abcd");
      },
      singOut: () => {
        setIsLoading(false);
        setUserToken(null);
      },
    };
  }, []);

  //this is for initilize the user and navigates them.
  const [init, setInit] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  // React.useEffect(() => {
  //   authService.onAuthStateChanged((user)=> console.log(user));
  //   return () => {

  //   }
  // }, [])
  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoading(false);
      }
      setInit(true);
    });
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {userToken || isLoggedIn ? (
          <MyTabs log={isLoggedIn} setLog={setIsLoggedIn} />
        ) : (
          <AuthStack.Navigator initialRouteName="HomeScreen">
            <AuthStack.Screen name="Home" component={HomeScreen} />
            <AuthStack.Screen name="Log in" component={LogIn} />
            <AuthStack.Screen name="Sign up" component={SignUp} />
          </AuthStack.Navigator>
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
