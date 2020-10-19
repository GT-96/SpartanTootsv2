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

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
//import Ionicons from "react-native-vector-icons/MaterialIcons";
import { AuthContext } from "./components/screens/AuthCon";

const HomeStack = createStackNavigator();
const SettingStack = createStackNavigator();
const AuthStack = createStackNavigator();

const HomeStackScreen = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen name="Home" component={HomeHome} />
  </HomeStack.Navigator>
);

const SettingStackScreen = () => (
  <SettingStack.Navigator>
    <SettingStack.Screen name="Settings" component={Settings} />
  </SettingStack.Navigator>
);

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

function MyTabs() {
  return (
    <Tab.Navigator
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
      <Tab.Screen name="Settings" component={SettingStackScreen} />
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

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {userToken ? (
          <MyTabs />
        ) : (
          <AuthStack.Navigator initialRouteName="HomeScreen">
            <AuthStack.Screen name="Home" component={HomeScreen} />
            <AuthStack.Screen name="Log in" component={LogIn} />
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
