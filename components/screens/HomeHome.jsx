import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  FlatList,
  Button
} from 'react-native';

export default class HomeHome extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [
        {id:1, title: "CS157A Professor Recommendation",    time:"08-01-20 12:15 pm",   image:"https://via.placeholder.com/400x200/DE836F/FFFFFF/?text=CS157A", description:"What was your experience with any 157a professor. Going to be taking it this fall and kind of nervous."},
        {id:2, title: "CS 149 Threads and Locks",           time:"08-29-20 10:43 am",   image:"https://via.placeholder.com/400x200/C188F6/FFFFFF/?text=CS149", description:"Any good youtube videos on threads and locks, had a hard time following in class"} ,
        {id:3, title: "CMPE 172 Springboot",                time:"09-09-20 6:28  pm",    image:"https://via.placeholder.com/400x200/88F6AE/FFFFFF/?text=CMPE172", description:"Have any of you used Spring Boot before? Need a little bit of help on my project"}, 
        {id:4, title: "CS 158B Raspberry Pi's",             time:"09-17-20 1:17  am",   image:"https://via.placeholder.com/400x200/F688BA/FFFFFF/?text=CS158B", description:"How have you configured your VM settings before booting your Pi's?"}, 
        {id:5, title: "CS157A Professor Recommendation",    time:"09-01-20 11:15 am",   image:"https://via.placeholder.com/400x200/DE836F/FFFFFF/?text=CS157A", description:"What was your experience with any 157a professor...."},
      ]
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList style={styles.list}
          data={this.state.data}
          //keyExtractor= {(item) => {
            //return item.id.toString;
            
            keyExtractor={(item, index) => String(index)}
          
            ItemSeparatorComponent={() => {
            return (
              <View style={styles.separator}/>
            )
          }}
          renderItem={(post) => {
            const item = post.item;
            return (
              <View style={styles.card}>
                <Image style={styles.cardImage} source={{uri:item.image}}/>
                <View style={styles.cardHeader}>
                  <View>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.description}>{item.description}</Text>
                    <View style={styles.timeContainer}>
                      <Image style={styles.iconData} source={{uri: 'https://img.icons8.com/color/96/3498db/calendar.png'}}/>
                      <Text style={styles.time}>{item.time}</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.cardFooter}>
                  <View style={styles.BarContainer}>
                    <View style={styles.BarSection}>
                      <TouchableOpacity style={styles.BarButton}>
                        <Image style={styles.icon} source={{uri: 'https://img.icons8.com/material/96/2ecc71/visible.png'}}/>
                        <Text style={styles.BarLabel}>78</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.BarSection}>
                      <TouchableOpacity style={styles.BarButton}>
                        <Image style={styles.icon} source={{uri: 'https://img.icons8.com/ios-glyphs/75/2ecc71/comments.png'}}/>
                        <Text style={styles.BarLabel}>25</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            )
          }}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    marginTop:20,
  },
  list: {
    paddingHorizontal: 17,
    backgroundColor:"#000000",
  },
  separator: {
    marginTop: 10,
  },
  //card
  card:{
    shadowColor: '#00000021',
    shadowOffset: {
      width: 2
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    marginVertical: 8,
    backgroundColor:"white"
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
  cardFooter:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12.5,
    paddingBottom: 25,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
    backgroundColor:"#EEEEEE",
  },
  cardImage:{
    flex: 1,
    height: 150,
    width: null,
  },
  // details 
  title:{
    fontSize:18,
    flex:1,
  }, 
  description:{
    fontSize:15,
    color:"#888",
    flex:1,
    marginTop:5,
    marginBottom:5,
  },
  time:{
    fontSize:13,
    color: "#808080",
    marginTop: 5
  },
  icon: {
    width:25,
    height:25,
  },
  iconData:{
    width:15,
    height:15,
    marginTop:5,
    marginRight:5
  },
  timeContainer:{
    flexDirection:'row'
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
  BarButton:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }
});  
                                            