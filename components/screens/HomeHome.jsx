import React, { Component, useState } from "react";
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
} from "react-native";
import firebase from "../firebase/Firebase";
import Feedpost from "./Feedpost";
// export default class HomeHome extends Component {
//   constructor(props) {
//     const allPosts = require("../../TestData/Posts.json");
//     // console.log(props);
//     const navigation = props.navigation;
//     super(props);
//     this.state = {
//       allPosts,
//       // c
//     };
//   }

//   render() {
export default function HomeHome(props) {
  const initPosts = require("../../TestData/Posts.json");
  const navigation = props.navigation;

  const dbService = firebase.firestore();
  const fbCurrentUser = firebase.auth().currentUser.uid;

  const [allPosts, setPosts] = useState(initPosts);
  console.log("this is homehome");
  //console.log(props);

  const [feeds, setFeeds] = useState([]);
  // const getFeeds = async () => {
  //   const dbFeeds = await dbService.collection("feeds").get();
  //   dbFeeds.forEach((document) => {
  //     const feedObject = {
  //       ...document.data(),
  //       id: document.id,
  //     };
  //     setFeeds((prev) => [...prev, feedObject ]);
  //   });
  // };

  //this use effect will creat real time feed posting
  // we can now use it to build group chat or comments for eahc post
  React.useEffect(() => {
    //getFeeds();
    dbService.collection("feeds").onSnapshot(snapshot => {
      
      const feedArray = snapshot.docs.map(doc =>({id: doc.id, ...doc.data()}))
      setFeeds(feedArray);
    })
  }, []);
  console.log("FEEEEDS");
  console.log(fbCurrentUser);

  console.log(feeds.length);

  function renderCategories() {
    return feeds.map((item, index) => <Text key={index}>{item}</Text>);
}
  const renderItem = ({ item }) => (
    <>
      <View style={styles.separator} />
      <View>
        {/* <Button title = {item.PostID}/> */}
        <>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate("PostScreen", { item });
            }}
          >
            <View style={styles.card}>
              <View testID="user Profile" style={styles.container}>
                <Image
                  style={styles.cardImage}
                  source={{ uri: "https://i.imgur.com/DzujRVN.jpg" }}
                />
                {/* User Profile Overview data like the name, number of upvotes and whatever else will go here */}
              </View>
              <Image
                style={styles.cardImage}
                source={{ uri: item.PostDetails.CourseImage }}
              />
              <View style={styles.cardHeader}>
                <View>
                  <Text style={styles.title}>{item.PostDetails.Title}</Text>
                  <Text style={styles.description}>{item.description}</Text>
                  <View style={styles.timeContainer}>
                    <Image
                      style={styles.iconData}
                      source={{
                        uri:
                          "https://img.icons8.com/color/96/3498db/calendar.png",
                      }}
                    />
                    <Text style={styles.time}>{item.DateTime}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.cardFooter}>
                <View style={styles.BarContainer}>
                  <View style={styles.BarSection}>
                    <TouchableOpacity style={styles.BarButton}>
                      <Image
                        style={styles.icon}
                        source={{
                          uri:
                            "https://img.icons8.com/material/96/2ecc71/visible.png",
                        }}
                      />
                      <Text style={styles.BarLabel}>78</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.BarSection}>
                    <TouchableOpacity style={styles.BarButton}>
                      <Image
                        style={styles.icon}
                        source={{
                          uri:
                            "https://img.icons8.com/ios-glyphs/75/2ecc71/comments.png",
                        }}
                      />
                      <Text style={styles.BarLabel}>25</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </>
        
      </View>
            
    </>
    
  );

  const createPostNavi = () => {
    const dummy = [1, 2];
    // const homeState = this.state
    // this.props.navigator.navigate("Create Post")
    props.navigation.navigate("Create Post", allPosts);
    // console.log(this.props.navigate)
  };
  return (
    <View style={styles.container}>
      <View>
      <Text>{feeds.map((feed)=>{return (<Feedpost key={feed.id} feedOject={feed} isPostOwner={feed.postedBy === fbCurrentUser}/>)})} </Text> 


        {/* <Button title="all posts" onPress={()=>{console.log(this.state.allPosts)}}/> */}
        <FlatList
          style={styles.list}
          data={allPosts.Posts}
          renderItem={renderItem}
          keyExtractor={(item) => item.PostID}
        />
         
      </View>
      <View style={styles.plusIconContainer}>
        <TouchableOpacity onPress={() => createPostNavi()}>
          <Image
            style={styles.plusIcon}
            source={require("../images/PlusIcon.png")}
          />
        </TouchableOpacity>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  plusIcon: {
    flex: 1,
    flexDirection: "row",
    resizeMode: "contain",
    // ...StyleSheet.absoluteFillObject,
  },
  plusIconContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    height: "10%",
    width: "15%",
    borderWidth: 1,
    position: "absolute",
    bottom: 0,
    alignSelf: "center",
    borderRadius: 10,
    borderColor: "transparent",
  },
  container: {
    flex: 1,
    marginTop: 20,
  },
  list: {
    paddingHorizontal: 17,
    backgroundColor: "#ffe4c4",
  },
  separator: {
    marginTop: 10,
  },
  //card
  card: {
    shadowColor: "#00000021",
    shadowOffset: {
      width: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    marginVertical: 8,
    backgroundColor: "white",
  },
  cardHeader: {
    paddingVertical: 17,
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
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
    marginTop: 5,
  },
  icon: {
    width: 25,
    height: 25,
  },
  iconData: {
    width: 15,
    height: 15,
    marginTop: 5,
    marginRight: 5,
  },
  timeContainer: {
    flexDirection: "row",
  },
  //bar
  BarContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    flex: 1,
  },
  BarSection: {
    justifyContent: "center",
    flexDirection: "row",
    flex: 1,
  },
  Barlabel: {
    marginLeft: 8,
    alignSelf: "flex-end",
    justifyContent: "center",
  },
  BarButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
