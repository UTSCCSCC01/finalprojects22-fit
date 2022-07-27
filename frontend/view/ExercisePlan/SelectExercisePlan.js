import * as React from 'react';
import { View, ActivityIndicator, TouchableOpacity, Text, FlatList } from 'react-native';
import { cleanString } from '../../utility/format.js';
import { styles } from '../../style/styles';
import { getDefaultWorkoutPlan, patchUser, postExercisePlan } from '../../controller/Exercise/workoutPlanController.js';
import { retrieveUserId } from '../../utility/dataHandler';

export function SelectExercisePlan({ navigation }) {

  const [data, setData] = React.useState("[]");
  const [isLoading, setLoading] = React.useState(true);
  const [selected, setSelected] = React.useState(null);

  // Search via the search bar
  const searchWorkoutPlans = async () => {
    try {
      const json = await getDefaultWorkoutPlan();
      setData(json.data);
    }catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  // Associate the user with the plan
  const addPlanToUser = async (planId) => {
    // bundle parameters into JSON format 
    const body = JSON.stringify({
      workout_plan : planId,
    });

    // Patch set
    const json = await patchUser(body);
  }

  // Set users workout plan to the select plan
  const setWorkoutPlan = async () => {
    // set parameters
    const userId = await retrieveUserId();
    const parameters = JSON.stringify({
      userId: userId,
      name: selected.name,
      workout_length: selected.workout_length,
      workout_counter: 0,
      workouts: selected.workouts,
      shared_plan: false
    });

    // Create a copy of the user's plan
    const json = await postExercisePlan(parameters);
    const planId = cleanString(json.data._id);

    // Associate plan with the user
    addPlanToUser(planId);
    alert("Saved workout plan!");
    navigation.navigate("Setting");
  }

  // Styling
  const formatCell = (item) => {
    let duration = item.workout_length;
    let frequency = item.workouts.length;
    if (selected == item){
      return <View style={styles.WorkoutPlanContainerHighlighted}>
        <Text> {item.name} </Text>
        <Text> Duration: {duration} weeks </Text>
        <Text> frequency: {frequency} workouts/week </Text>
      </View>
    }
    else {
      return <View style={styles.WorkoutPlanContainer}>
        <Text> {item.name} </Text>
        <Text> Duration: {duration} weeks </Text>
        <Text> frequency: {frequency} workouts/week </Text>
      </View>
    }
  }

  // Handle item press, highlights the paticular workout
  const handlePress = (item) => {
    setSelected(item);
  }
  
  // Handle logic for saving a plan to your account
  const handleSaveWorkout = () => {
    if (selected != null){
      setWorkoutPlan()
    }
  }

  // Handle logic for viewing a workout
  const handleViewWorkout = () => {
    if (selected != null){
      navigation.navigate('View Exercise Plan', {
        workout: selected,
      });
    }
  }

  // perform event upon accessing page
  React.useEffect(() => {
    navigation.addListener('focus', () => {
      searchWorkoutPlans();
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <TouchableOpacity
            style={selected == null ? styles.ExerciseLogUtilityButtonGray : styles.ExerciseLogUtilityButton}
            onPress={() => handleViewWorkout()}
          >
          <View>
            <Text style={styles.generalButtonFont}> View Workout </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
            style={selected == null ? styles.ExerciseLogUtilityButtonGray : styles.ExerciseLogUtilityButton}
            onPress={() => handleSaveWorkout()}
          >
          <View>
            <Text style={styles.generalButtonFont}> Save Plan </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.flatListContainer}>
        {isLoading ? <ActivityIndicator/> : (
        <FlatList
          data={data}
          keyExtractor={(item, index) => item._id}
          renderItem={({item}) => <TouchableOpacity onPress={() => handlePress(item)}>{formatCell(item)}</TouchableOpacity>}
        />
        )}
      </View>
    </View>
  );
}
