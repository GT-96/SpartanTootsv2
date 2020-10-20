import { StatusBar } from "expo-status-bar";
import React from "react";
import {
    StyleSheet,
    Text,
    View,
    Button,
    Image,
    TouchableOpacity,
    FlatList
} from "react-native";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { color } from "react-native-reanimated";



// function checkID(props){

//     return props.route.item.id
// }

const renderItem = ({ item }) => (
    <View>

        <Text>{item.Comment}</Text>
        {/* <Text>{item.UserID}</Text>
        <Text>{item.CommentID}</Text> */}


    </View>
);

const renderPost = ({ item }) => (
    <View>
        {/* <Button title="renderPost button" onPress={() => { console.log(item) }} />
        <Button title="renderPost item.PostDetails" onPress={() => { console.log(item.PostDetails) }} />
        <Button title="renderPost item.PostDetails.Title" onPress={() => { console.log(item.PostDetails.Title) }} /> */}

        <Text>{item.PostDetails.Title}</Text>
        <Text>{item.PostDetails.Course}</Text>
        <Text>{item.PostDetails.Description}</Text>




    </View>


);

export default function PostScreen(props) {
    const allPosts = require('../../TestData/Posts.json');
    const thisPost = allPosts.Posts.filter(item => item.PostID == props.route.params.item.PostID)
    const { Comments } = thisPost;


    return (
        <>
            {/* <Button title="Show Props" onPress={() => { console.log(props) }} />
            <Button title="Show allPosts.Posts" onPress={() => { console.log(allPosts.Posts) }} />
            <Button title="Show allPosts.Posts[0].PostID" onPress={() => { console.log(allPosts.Posts[0].PostID) }} />

            <Button title="Show thisPost" onPress={() => {

                console.log(thisPost)
            }} />
            <Button title="Show allPosts" onPress={() => {

                console.log(allPosts)
            }} />
            <Button title="Show props.route" onPress={() => {

                console.log(props.route)
            }} />
            <Button title="Show props.route.params.item" onPress={() => {

                console.log(props.route.params.item)
            }} />
            <Button title="Show props.route.params.item.PostID" onPress={() => {

                console.log(props.route.params.item.PostID)
            }} />
            <Button title="Show props.route.params.item.Comments" onPress={() => {

                console.log(props.route.params.item.Comments)
            }} />
            <Button title="Show props.route.params.item.Comments" onPress={() => {

                console.log(props.route.params.item.Comments)
            }} />
            <Button title="Show {Comments}" onPress={() => {

                console.log(Comments)
            }} /> */}
            {renderPost(props.route.params)}
            <View style={styles.container}>
                <FlatList
                    data={props.route.params.item.Comments}
                    renderItem={renderItem}
                    keyExtractor={item => item.CommentID}
                />

            </View>

        </>
    )


}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
    },
    list: {
        paddingHorizontal: 17,
        backgroundColor: "#000000",
    },
    separator: {
        marginTop: 10,
    },
    //card
    card: {
        shadowColor: '#00000021',
        shadowOffset: {
            width: 2
        },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        marginVertical: 8,
        backgroundColor: "white"
    },
    cardHeader: {
        paddingVertical: 17,
        paddingHorizontal: 16,
        borderTopLeftRadius: 1,
        borderTopRightRadius: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cardContent: {
        paddingVertical: 12.5,
        paddingHorizontal: 16,
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 12.5,
        paddingBottom: 25,
        paddingHorizontal: 16,
        borderBottomLeftRadius: 1,
        borderBottomRightRadius: 1,
        backgroundColor: "#EEEEEE",
    },
    cardImage: {
        flex: 1,
        height: 150,
        width: null,
    },
    // details 
    title: {
        fontSize: 18,
        flex: 1,
    },
    description: {
        fontSize: 15,
        color: "#888",
        flex: 1,
        marginTop: 5,
        marginBottom: 5,
    },
    time: {
        fontSize: 13,
        color: "#808080",
        marginTop: 5
    },
    icon: {
        width: 25,
        height: 25,
    },
    iconData: {
        width: 15,
        height: 15,
        marginTop: 5,
        marginRight: 5
    },
    timeContainer: {
        flexDirection: 'row'
    },
    //bar
    BarContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        flex: 1
    },
    BarSection: {
        justifyContent: 'center',
        flexDirection: 'row',
        flex: 1,
    },
    Barlabel: {
        marginLeft: 8,
        alignSelf: 'flex-end',
        justifyContent: 'center',
    },
    BarButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    }
});
