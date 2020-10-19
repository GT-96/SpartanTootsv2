import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';

function Item({ item }) {
  return (
    <View style={styles.listItem}>
      <Image source={{uri:item.photo}}  style={{width:65, height:65,borderRadius:30}} />
      <View style={{alignItems:"center",flex:1}}>
        <Text style={{fontWeight:"bold"}}>{item.name}</Text>
        <Text>{item.courses}</Text>
      </View>
      <TouchableOpacity style={{height:50,width:50, justifyContent:"center",alignItems:"center"}}>
      <Image style={styles.logo}source={require("../images/chat3.png")} />
      
      </TouchableOpacity>
    </View>
  );
}

export default class Tutors extends React.Component {
  state = {
    data:[
        {
          
            "name": "Jennifer N.",
            "courses": "CMPE 102, CS 151, MATH 123A",
            "photo": "https:\/\/randomuser.me\/api\/portraits\/women\/27.jpg"
        },
        {
            "name": "Michael C.",
            "courses": "PHYS 51, CS 151, CMPE 120, CMPE 146",
            "photo": "https:\/\/randomuser.me\/api\/portraits\/men\/33.jpg"
        },
        {
            "name": "Karen R.",
            "courses": "CS 174",
            "photo": "https:\/\/randomuser.me\/api\/portraits\/women\/52.jpg"
        },
        {
            "name": "Abby P.",
            "courses": "CS 158B, CMPE 148, CS 157A",
            "photo": "https:\/\/randomuser.me\/api\/portraits\/women\/8.jpg"
        },
        {
            "name": "Thomas S.",
            "courses": "CS 46B, CMPE 165",
            "photo": "https:\/\/randomuser.me\/api\/portraits\/men\/67.jpg"
        },
        {
            "name": "Rohan P.",
            "courses": "CS 149, CS 166, CMPE 172 ",
            "photo": "https:\/\/randomuser.me\/api\/portraits\/men\/77.jpg"
        },
        {
            "name": "Bonnie Y.",
            "courses": "CMPE 102, CS 157A, CMPE 187, CMPE 172",
            "photo": "https:\/\/randomuser.me\/api\/portraits\/women\/26.jpg"
        }
    ]
  }


  render(){
    return (
      <View style={styles.container}>
       <TouchableOpacity>
       <Image style={styles.fil}source={require("../images/filter.png")} />
       </TouchableOpacity>
       
        <FlatList
          style={{flex:1}}
          data={this.state.data}
          renderItem={({ item }) => <Item item={item}/>}
          keyExtractor={item => item.name}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    marginTop:5
  },
  listItem:{
    margin:10,
    padding:10,
    backgroundColor:"#FFF",
    width:"90%",
    flex:1,
    alignSelf:"center",
    flexDirection:"row",
    borderRadius:5
  },

  logo: {
    width: 30,
    height: 25,
    marginTop: 45,
    marginBottom: 40,
  },

  fil: {
    width: 30,
    height: 25,
    marginTop: 5,
    marginBottom: 0,
    marginLeft: 360
  },

}); 
