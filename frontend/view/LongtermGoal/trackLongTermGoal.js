// import * as React from 'react';
// import { Text, View, Button, TextInput, TouchableOpacity, Alert } from 'react-native';
// import { styles } from '../../style/styles';
// import { cleanNum } from '../../utility/format.js';
// import { getUser, getGoal, deleteGoal, postGoal, patchUser} from "../../controller/longTermGoalController";
// import { retrieveGoalId } from '../../utility/dataHandler';

// export function MainPage ({ navigation }) {
    
//     const [goalType, setGoalType] = React.useState('Complete current workout plan');

//     const [weightGoalType, setWeightGoalType] = React.useState('gain');
//     const [startingWeight, setStartingWeight] = React.useState(0);
//     const [targetWeight, setTargetWeight] = React.useState(0);
//     const [currentWeight, setCurrentWeight] = React.useState(0);

//     const [weightDifference, setWeightDifference] = React.useState(0);

//     // const progressList = () => {
//     //     //Returns the progress list. Mock data by now and awaits for further implementation
//     //     return(           
//     //             <View>
//     //                 <Text>700 calories to burn</Text>
//     //                 <Text>800L water to go</Text>
//     //                 <Text>2km to run</Text>
//     //                 <Text>5 push-ups to do</Text>
//     //             </View>
            
//     //     );
        
        
//     // }

//     // const dailyGoalList = () => {
//     //     //Returns the daily goal list. Mock data by now and awaits for further implementation
//     //     return(
//     //         <View>
//     //             <Text>Do 3/5 push-ups</Text>
//     //             <Text>drink 0.6/2L water</Text>
//     //         </View>
//     //     );
        
//     // }

    
//     const longTermGoalList = async () => {
//         if (retrieveGoalId()!=='') {
//             // user has a goal
//             if (isWeightGoal()) {
//                 // user has a weight goal
//                 setWeight();
//                 return (
//                     <View>
//                         <Text>Long Term Goal: {goalType}. </Text>
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
//     const isWeightGoal = async() => {
//         const json = await getGoal();
//         return json.data.planId === null;
//     }

//     const setWeight = async () => {
//         const json = await getGoal();

//         setGoalType("Weight Goal");

//         setStartingWeight(cleanNum(json.data.startingWeight));
//         setTargetWeight(cleanNum(json.data.targetWeight));

//         if (startingWeight-targetWeight>0) {
//             setWeightGoalType('lose');
//         }
    
//         setWeightDifference(Math.abs(startingWeight-targetWeight));
//     }

//     return(
//         <View>
//             {/* <Text>Welcome, User!</Text>
//             <View>
//                 <Text>Here's your progress today</Text>
//                 <ScrollView>
//                     {progressList()}
//                 </ScrollView>
//             </View>
//             <View>
//                 <Text>Daily Goals</Text>
//                 <ScrollView>
//                     {dailyGoalList()}
//                 </ScrollView>
//             </View> */}
//             <View>
//                 {/* <ScrollView>
//                     {longTermGoalList()}
//                 </ScrollView> */}
//                 <Text>{"Current Weight"}</Text>
//                 <View style={styles.exerciseInputContainer}>
//                     <TouchableOpacity
//                         style={styles.sideButton}
//                         onPress={() => targetWeight <= 0 ? setTargetWeight(0) : setTargetWeight(targetWeight - 1)}
//                     >
//                         <Text style={styles.sideButtonFont}>-</Text>
//                     </TouchableOpacity>
//                     <TextInput
//                         style={styles.exerciseMetricsInput}
//                         value={cleanString(targetWeight) + "KG"}
//                         onChangeText={text => text === "CM" || text === "KG" ? setCurrentWeight(0) : setCurrentWeight(parseInt(text))}
//                         keyboardType="numeric"
//                     />
//                     <TouchableOpacity
//                         style={styles.sideButton}
//                         onPress={() => setTargetWeight(targetWeight + 1)}
//                     >
//                         <Text style={styles.sideButtonFont}>+</Text>
//                     </TouchableOpacity>
//                 </View>

//                 <View style={styles.customExerciseComponentContainers}>
//                     <TouchableOpacity
//                         onPress={() => {
//                             longTermGoalList();
//                         }}
//                         style={styles.appButtonContainer}
//                     >
//                         <Text style={styles.appButtonText}>See long term goal progress</Text>
//                     </TouchableOpacity>
//                 </View>

//             </View>            
//         </View>
//     ) 

// }
import * as React from 'react';
import { Text, View, Button, TextInput, TouchableOpacity, Alert } from 'react-native';
import { styles } from '../../style/styles';
import { cleanString, cleanNum } from '../../utility/format.js';
import { getUser, getGoal, deleteGoal, postGoal, patchUser} from "../../controller/longTermGoalController";
import { retrieveGoalId } from '../../utility/dataHandler';
import { getBodyMetric } from '../../controller/BodyMetric/bodyMetricLogController' ;

export function TrackLongTermGoal ({ navigation }) {
    
    const [data, setData] = React.useState([]);
    const [isWeightGoal, setIsWeightGoal] = React.useState(false);
    const [startingWeight, setStartingWeight] = React.useState(0);
    const [targetWeight, setTargetWeight] = React.useState(0);
    const [todayWeight, setTodayWeight] = React.useState(0);


    const trackLongTermGoal = async () => {
        if (isWeightGoal_function()) {
            // user has a weight goal
            console.log(data);
            setWeight();
            console.log("track calling try")
            tryGetTodayWeight();
        }
        else {
            // TODO: user has a plan goal
        }
        // user has no goal
    }

   
    // true if weightgoal, false if plan
    const isWeightGoal_function = async() => {
        const json = await getGoal();
        return json.data.startingWeight !== null;
    }

    const setWeight = async () => {
        const json = await getGoal();
        setIsWeightGoal(true);
        setStartingWeight(cleanNum(json.data.startingWeight));
        setTargetWeight(cleanNum(json.data.targetWeight));
    }

    /* Pull user's body metrics */
    const getBMetric = async () => {
        const json = await getBodyMetric();
        setData(json.data);
    }

    const getTodayWeight = (todayDate) => {
        var value = 0;
        const results = cleanString(data === undefined ? null : data.filter(function (entry) {
            if (entry.date === todayDate.toISOString() && entry.metric === 'Body Weight'){
                value = entry.value;
            }
        }));
        return value; 
    }

    //check if today's weight is logged
    const tryGetTodayWeight = () => {
        console.log("trygettodayweight");
       
        var todayDate = new Date();
        todayDate.setHours(0, 0, 0, 0);

        console.log(getTodayWeight(todayDate));
        if (getTodayWeight(todayDate) != 0) {
            console.log("settingtodayweight");
            setTodayWeight(getTodayWeight(todayDate));
        }
        else {
            Alert.alert(
                "Missing current weight",
                "Please log today's weight in body metric first",
            )
        }
    }

  

    React.useEffect(() => {
        getBMetric();
        if (data !== []){
            console.log("\ncalling trackLongTermGoal");
            trackLongTermGoal();
        }
    }, []);


    return(
       <View>
        {isWeightGoal ? (  
            <View>
                <Text>Weight Goal</Text>
                <Text>Starting Weight: {startingWeight}</Text>
                <Text>Target Weight: {targetWeight}</Text>
                <Text>Current Weight: {todayWeight}</Text>
                <Text>{Math.abs(startingWeight - todayWeight) / Math.abs(startingWeight - targetWeight)} % done. </Text>
            </View>
        ):(
           
            <View>
                <Text>{"to be implemnted"}</Text>
            </View>
        )}
       </View>

    ) 

}
