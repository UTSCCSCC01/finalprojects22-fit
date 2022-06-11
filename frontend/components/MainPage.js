import React, { Component } from 'react';
import { Text, View, Button, ScrollView } from 'react-native';

class MainPage extends Component{
    render(){
        return(
            <View>
                <Text>Welcome, User!</Text>
                <View>
                    <Text>Here's your progress today</Text>
                    <ScrollView>
                        {this.progressList()}
                    </ScrollView>
                    <Button
                    title='Track Metrics'></Button>
                </View>
                <View>
                    <Text>Daily Goals</Text>
                    <ScrollView>
                        {this.dailyGoalList()}
                    </ScrollView>
                </View>
                <View>
                    <Text>Long Term Goals</Text>
                    <ScrollView>
                        {this.longTermGoalList()}
                    </ScrollView>
                </View>            
            </View>
        );  
    }

    progressList(){
        return(
            
                <View>
                    <Text>700 calories to burn</Text>
                    <Text>800L water to go</Text>
                    <Text>2km to run</Text>
                    <Text>5 push-ups to do</Text>
                </View>
            
        );
        
        
    }

    dailyGoalList(){
        return(
            <View>
                <Text>Do 3/5 push-ups</Text>
                <Text>drink 0.6/2L water</Text>
            </View>
        );
        
    }

    longTermGoalList(){
        return( 
            <View>
                <Text>Lose 10/50 kg</Text>
            </View>
        );
    }


}

export default MainPage;