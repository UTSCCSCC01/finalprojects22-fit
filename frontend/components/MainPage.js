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
                        title='Track Metrics'>             
                    </Button>
                    <Button
                        title='Log Exercises'                        
                        onPress={() => this.props.navigation.navigate('Exercise Log')}>    
                    </Button>
                    <Button
                        title='Track Body Metrics'                        
                        onPress={() => this.props.navigation.navigate('Body Metric Log')}>    
                    </Button>
                    <Button
                        title='Log Foods'
                        onPress={() => this.props.navigation.navigate('Food Log')}>
                    </Button>
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
        //Returns the progress list. Mock data by now and awaits for further implementation
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
        //Returns the daily goal list. Mock data by now and awaits for further implementation
        return(
            <View>
                <Text>Do 3/5 push-ups</Text>
                <Text>drink 0.6/2L water</Text>
            </View>
        );
        
    }

    longTermGoalList(){
        //Returns the long term goal list. Mock data by now and awaits for further implementation
        return( 
            <View>
                <Text>Lose 10/50 kg</Text>
            </View>
        );
    }


}

export default MainPage;