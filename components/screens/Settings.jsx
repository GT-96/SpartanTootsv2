import React from 'react';
import { Image, View, StyleSheet, Alert, ScrollView} from "react-native";
import SettingsList from 'react-native-settings-list';
import { Avatar } from 'react-native-paper';

//import Component from 'react';

class Settings extends React.Component {

constructor(){
  super();
  this.onValueChange = this.onValueChange.bind(this);
  this.state = {
    switchValue: false,
  };
  
}
render() {

  return (
    <ScrollView>
    <View style={{flex:1}}>
      <View style={{backgroundColor:'#EFEFF4'}}>

      <Avatar.Image style={styles.iconData} size={240} source={require("../images/prof.png")} />
      

        <SettingsList borderColor='#c8c7cc' defaultItemSize={60}>
          <SettingsList.Header headerStyle={{marginTop:20}}/>
          
          <SettingsList.Item
            title='Name'
            titleInfo='Jane Doe'
            titleInfoStyle={styles.titleInfoStyle}
            
          />
          <SettingsList.Item
            title='Email'
            titleInfo='janedoe333@gmail.com'
            titleInfoStyle={styles.titleInfoStyle}
            onPress={() => Alert.alert('Email is not editable')}
          />
          <SettingsList.Item
            title='Subjects'
            titleInfo='CS 151, CMPE 102, MATH 123A, CS 149'
            titleInfoStyle={styles.titleInfoStyle}
          />
          <SettingsList.Header headerStyle={{marginTop:20}}/>
          
          <SettingsList.Item
            hasSwitch={true}
            switchState={this.state.switchValue}
            switchOnValueChange={this.onValueChange}
            hasNavArrow={false}
            title='Tutor Mode'
          />
          
          <SettingsList.Item
            hasSwitch={true}
            switchState={this.state.switchValue}
            switchOnValueChange={this.onValueChange}
            hasNavArrow={false}
            title='Push Notifications'
          />
          
          <SettingsList.Header headerStyle={{marginTop:75}}/>
         
          <SettingsList.Item
           icon={<Image style={styles.imageStyle} source={require("../images/ST.png")}/>}
            title='Logout'
            //onPress={() => navigation.navigate("Log in")}
            onPress={() => Alert.alert("Are you sure?", "Logging out will require you to reenter your credentials.",
            [ {text: 'Logout', style: 'destructive'}, {text: 'Cancel'},
            ],{cancelable: false}
            )}
          />
        </SettingsList>
      </View>
    </View>
    </ScrollView>
  );
}
onValueChange(value){
  this.setState({switchValue: value});
}
}

const styles = StyleSheet.create({
  imageStyle:{
    marginLeft:5,
    alignSelf:'center',
    height:50,
    width:70
  },
  titleInfoStyle:{
    fontSize:16,
    color: '#000000'
  },
  iconData:{
    //width:15,
    //height:15,
    marginTop:5,
    marginLeft:80
  }
});


export default Settings 