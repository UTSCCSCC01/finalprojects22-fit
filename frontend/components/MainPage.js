import React, { Component } from 'react';
import { Text, View, Button, ScrollView, Pressable} from 'react-native';
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import { styles } from '../style';
const baseURL = 'http://10.0.2.2:3000';

class MainPage extends Component{
    static contextType = UserContext;

    state = {
        displayName: ''
    }

    render(){
        const api = axios.create({
            baseURL: baseURL
        })
        var loginIndicator = 0;
        if(this.state.displayName == ''){
            api.get('/users/list').then((res) => {
                for(var i = 0; i < res.data.data.length; i++){
                    if(res.data.data[i].email == this.context){
                        this.setState({displayName: res.data.data[i].display_name});
                        loginIndicator = 1;
                        break;
                    }
                }
                if(loginIndicator == 0){
                    alert('Login error, please log in again!');
                    this.props.navigation.navigate('Welcome');
                }
            })
        }
        
    

        return(
            <ScrollView style={{
                padding: 5,
                margin: 5
            }}>
                <this.WelcomeText/>
                {this.progressList()}
                <this.TrackMetrics/>
                <Text style={styles.mainPageText}>Daily Goals</Text>
                {this.dailyGoalList()}
                <Text style={styles.mainPageText}>Long Term Goals</Text>
                {this.longTermGoalList()}       
            </ScrollView>
        );  
    }

    WelcomeText = ()=>{
        return(
            <View>
                <Text style={styles.primaryOrangeText}>Welcome, {this.state.displayName}!</Text>
                <Text style={styles.mainPageText}>Here's your progress today</Text>
            </View>
        );
    }

    TrackMetrics = ()=>{
        return(
            <View style={styles.mainPageElement}>
                <Pressable
                    >
                        <Text>Track Metrics</Text>
                    </Pressable>
            </View>
        )
    }

    progressList(){
        //Returns the progress list. Mock data by now and awaits for further implementation
        return(           
                <View style={styles.mainPageElement}>
                    <Text>700 calories to burn</Text>
                    <Text>800L water to go</Text>
                    <Text>2km to run</Text>
                    <Text>5 push-ups to do</Text>
                </View>
            
        );
        
        
    }

    dailyGoalList(){
        //Returns the daily goal list. Mock data by now and awaits for further implementation
        return(
            <View style={styles.mainPageElement}>
                <Text>Do 3/5 push-ups</Text>
                <Text>drink 0.6/2L water</Text>
            </View>
        );
        
    }

    longTermGoalList(){
        //Returns the long term goal list. Mock data by now and awaits for further implementation
        return( 
            <View style={styles.mainPageElement}>
                <Text>Lose 10/50 kg</Text>
            </View>
        );
    }


}

export default MainPage;