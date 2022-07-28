import React, { Component } from 'react';
import { Text, View, Button, ScrollView } from 'react-native';
import { retrieveUserId } from '../utility/dataHandler';
import { styles } from '../style/styles';
import { baseURI } from '../utility/constants';

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

    // retrieveGoalId = async() => {
    //     const json = await getUser();
    //     return json.data.goalId;
    // }

    // export const getGoal = async () => {
    //     const userId = await retrieveUserId();
    //     const response = await fetch(baseURI.concat('/longTermGoals/').concat(userId))
    //     const json = await response.json();
    //     return json;
    // }

    retrieveGoalId() {
        const userId = await retrieveUserId();
        const api = axios.create({
            baseURL:baseURI
        })
        api.get('/longTermGoals/'.concat(userId)).then(res => {
            console.log(res.data.goalId);
            return res.data.goalId;
        })
    }
    
    longTermGoalList(){
        //Returns the long term goal list. Mock data by now and awaits for further implementation
        if (this.retrieveGoalId()!==null){
            console.log("here");
            console.log(retrieveGoalId());
            return( 
                <View>
                    <Button style={styles.button} title='Track Long Term Goal' onPress={() => {
                        this.props.navigation.navigate('Track Long Term Goal')
                    }}></Button>
                </View>
            );

        }
        return(
            <View>
                <Text>no long term goal</Text>
            </View>
        )
    }


}

export default MainPage;






// import React, { Component } from 'react';
// import { Text, View, ScrollView } from 'react-native';
// import { getGoal } from "../controller/longTermGoalController";
// import { retrieveGoalId } from '../utility/dataHandler';
// import { cleanNum } from '../utility/format.js';

// class MainPage extends Component{

//     state = {
//         goalType: 'Complete current workout plan',
//         weightGoalType: 'gain',
//         startingWeight: 0,
//         targetWeight: 0,
//         weightDifference: 0
//     }

//     render(){
//         return(
//             <View>
//                 <Text>Welcome, User!</Text>
//                 <View>
//                     <Text>Here's your progress today</Text>
//                     <ScrollView>
//                         {this.progressList()}
//                     </ScrollView>
//                 </View>
//                 <View>
//                     <Text>Daily Goals</Text>
//                     <ScrollView>
//                         {this.dailyGoalList()}
//                     </ScrollView>
//                 </View>
//                 <View>
//                     <Text>Long Term Goals</Text>
//                     <ScrollView>
//                         {this.longTermGoalList()}
//                     </ScrollView>
//                 </View>            
//             </View>
//         );  
//     }

//     progressList(){
//         //Returns the progress list. Mock data by now and awaits for further implementation

//         return(           
//                 <View>
//                     <Text>700 calories to burn</Text>
//                     <Text>800L water to go</Text>
//                     <Text>2km to run</Text>
//                     <Text>5 push-ups to do</Text>
//                 </View>
            
//         );
        
        
//     }

//     dailyGoalList(){
//         //Returns the daily goal list. Mock data by now and awaits for further implementation
//         return(
//             <View>
//                 <Text>Do 3/5 push-ups</Text>
//                 <Text>drink 0.6/2L water</Text>
//             </View>
//         );
        
//     }

//     // longTermGoalList(){

//     //     //Returns the long term goal list. Mock data by now and awaits for further implementation
//     //     return( 
//     //         <View>
//     //             <Text>Lose 10/50 kg</Text>
//     //         </View>
//     //     );
//     // }


//     longTermGoalList = async () => {
//         if (retrieveGoalId()!=='') {
//             // user has a goal
//             if (isWeightGoal()) {
//                 // user has a weight goal
//                 setWeight();
//                 return (
//                     <View>
//                         <Text>Long Term Goal: {goal}. </Text>
//                         <Text>Long Term Goal: {weightGoalType} {weightDifference} out of {startingWeight}. </Text>
//                     </View> 
//                 );
//             }
//             else {
//                 // TODO: user has a plan goal
//                 return;
//             }
//         }
//         // user has no goal
//         return;
//     }

   
//     // true if weightgoal, false if plan
//     isWeightGoal = async() => {
//         const json = await getGoal();
//         return json.data.planId === null;
//     }

//     setWeight = async () => {
//         const json = await getGoal();

//         this.state.goalType = 'Weight Goal';

//         this.state.startingWeight = cleanNum(json.data.startingWeight);
//         this.state.targetWeight = cleanNum(json.data.targetWeight);
    
//         if (this.state.startingWeight-this.state.targetWeight>0) {
//             setWeightGoalType('lose');
//         }
    
//         this.state.weightDifference = Math.abs(startingWeight-targetWeight);
//     }
// }

// export default MainPage;