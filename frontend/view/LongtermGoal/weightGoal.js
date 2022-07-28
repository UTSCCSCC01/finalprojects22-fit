import * as React from 'react';
import { Text, View, Button, TextInput, TouchableOpacity, Alert } from 'react-native';
import { styles } from '../../style/styles';
import { cleanString } from '../../utility/format.js';
import { getUser, getGoal, deleteGoal, postGoal, patchUser} from "../../controller/longTermGoalController";
import { retrieveUserId } from '../../utility/dataHandler';
import { getBodyMetric } from '../../controller/BodyMetric/bodyMetricLogController' ;


export function WeightGoal({ navigation }) {

    // hooks
    const [startingWeight, setStartingWeight] = React.useState(0);
    const [targetWeight, setTargetWeight] = React.useState(0);
    const [data, setData] = React.useState([]); // data: [metrics], each metric: "metric": string, "value": number, "date":date


    const getTodayWeight = (todayDate) => {
        var value = 0;
        const results = cleanString(data === undefined ? null : data.filter(function (entry) {
            if (entry.date === todayDate.toISOString() && entry.metric === 'Body Weight'){
                value = entry.value;
            }
        }));
        // console.log(value);
        return value; 
    }

    /* Pull user's body metrics */
    const getBMetric = async () => {
        const json = await getBodyMetric();
        setData(json.data);
    }

    //check if today's weight is logged
    const tryGetTodayWeight = async() => {
        // console.log("trygettodayweight");
        // get today dates
        // var todayDate = new Date().toISOString().substring(0,10); //2020-07-10 15:00:00.000
        var todayDate = new Date();
        todayDate.setHours(0,0,0,0);
      
        if (getTodayWeight(todayDate)!=0){
            setStartingWeight(getTodayWeight(todayDate));
            // console.log(startingWeight);
        }
        else {
            Alert.alert(
                "Missing current weight",
                "Please log today's weight in body metric first",
            )
            return;
        }
    }

    // React.useEffect(() => {
    //     navigation.addListener('focus', () => {
    //         // Reset activityData so event is triggered later
    //         setData(null);
    //         getBMetric();
    //         Promise.resolve(getBMetric())
    //         .then(() => tryGetTodayWeight());
    //     });
    // }, []);

    React.useEffect(() => {
        getBMetric();
        if (data !== null){
            tryGetTodayWeight();
        }
    }, []);

    // if input startingWeight and targetWeight, in correct format, "weightrecorder"
    const validInput = () => {
        if (startingWeight > 0 && targetWeight >0 && Math.abs(startingWeight-targetWeight) >=2.5) {
            return true;
        }
        return false;
    }

    // true if user already has a goal
    const goalExists = async () => {
       const json = await getUser();
       return json.data.goalId !== null;
    }

    const createGoal = async () => {
        // post goal & patch user with goalId
        const userId = await retrieveUserId();
        const parameters = JSON.stringify({
            userId: userId,
            startingWeight: startingWeight,
            targetWeight: targetWeight,
        });
        const json1 = await postGoal(parameters);
        const goalId = cleanString(json1.data._id);
        const body = JSON.stringify({
            goalId: goalId,
        });
        const json2 = await patchUser(body);
        Alert.alert(
            "Success",
            "New long term goal created",
        )
    }

    const goalExistsAlert = () => {
        // console.log("goal exists alert");
        Alert.alert(
            "Already has a long term goal",
            "Do you want to replace it?",
            [
              { text: "Cancel", onPress: () => alert('still original goal') },
              { text: "Yes", onPress: () => createGoal() }
            ]
        );
    }
    

    const tryCreateGoal = async () => {
        if (!validInput()) {
            // alert invalid input
            Alert.alert(
                "Invalid Input",
                "Please make sure both current and target weight >0, and they differ by at least 2.5kg");
        }
        else {
            // alert if already has a goal
            if(goalExists()) {
                goalExistsAlert();
            }
        }
        // navigation.goBack();
    }

    return (
        <View style={styles.recorderContainer}>
            {/* <Text>{"Current weight:"} startingWeight</Text> */}
            {/* <Button style={styles.button} title='Get Starting/Today Weight' onPress={()=>{
                tryGetTodayWeight();
            }}></Button> */}
            <Text>{"Current Weight:"} {startingWeight}</Text>
            <Text>{"Set Target weight(must differ from current weight by at least 2.5 kg)"}</Text>
            <View style={styles.exerciseInputContainer}>
                <TouchableOpacity
                    style={styles.sideButton}
                    onPress={() => targetWeight <= 0 ? setTargetWeight(0) : setTargetWeight(targetWeight - 1)}
                >
                    <Text style={styles.sideButtonFont}>-</Text>
                </TouchableOpacity>
                <TextInput
                    style={styles.exerciseMetricsInput}
                    value={cleanString(targetWeight) + "KG"}
                    onChangeText={text => text === "CM" || text === "KG" ? setTargetWeight(0) : setTargetWeight(parseInt(text))}
                    keyboardType="numeric"
                />
                <TouchableOpacity
                    style={styles.sideButton}
                    onPress={() => setTargetWeight(targetWeight + 1)}
                >
                    <Text style={styles.sideButtonFont}>+</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.customExerciseComponentContainers}>
                <TouchableOpacity
                    onPress={() => {
                        tryCreateGoal();
                    }}
                    style={styles.appButtonContainer}
                >
                    <Text style={styles.appButtonText}>Save</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}


