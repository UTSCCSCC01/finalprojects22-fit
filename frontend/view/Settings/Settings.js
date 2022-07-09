import React, { Component } from 'react';
import { Text, View, Button, ScrollView } from 'react-native';

class Settings extends Component{
    render(){
        return(
            <View>
                <Text>Settings</Text>
                <Button title='Color Theme' onPress={()=>{
                    this.props.navigation.navigate('Color Theme')
                }}></Button>
                <Button title='Set Exercise Plan' onPress={()=>{
                    this.props.navigation.navigate('Optional Survey')
                }}></Button>
                <Button title='Set Calories Budget' onPress={()=>{
                    //this.props.navigation.navigate('Color Theme')
                }}></Button>
            </View>
        );  
    }

}

export default Settings;