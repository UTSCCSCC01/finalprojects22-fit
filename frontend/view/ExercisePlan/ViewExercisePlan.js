import * as React from 'react';
import { ScrollView, View, ActivityIndicator, Text } from 'react-native';
import { styles } from '../../style/styles';
import { getExerciseById } from '../../controller/Exercise/exerciseLogController.js';

export function ViewExercisePlan({ navigation, route }) {

  const [frequency, setFrequency] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [exercises, setExercises] = React.useState([]);

  const { workout } = route.params;
  const workoutData = [[],[],[],[],[],[],[]];

  // Get exercise by the given id
  const getExercise = async (id) => {
    const json = await getExerciseById(id);
    return json.data.ExerciseName;
  }

  // Set up our state variables, in paticular the exercises for each workout
  const setWorkoutData = async (freq) => {
    for (let i = 0; i < freq; i++){
      for (let j = 0; j < workout.workouts[i].length; j++){
        workoutData[i].push(await getExercise(workout.workouts[i][j]));
      }
    }
    setExercises(workoutData);
    setLoading(false);
  }

  // perform event upon accessing page
  React.useEffect(() => {
    navigation.addListener('focus', () => {
      // Create an array of size i where the nth element = n
      let i = workout.workouts.length;
      setFrequency(Array.apply(null, Array(i)).map(function (x, n) { return n; }));
      setWorkoutData(i);
    })    
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View>
        {frequency.map(i=>{return (
        <View key={i}>
          <View>
            <Text style={styles.exercisePlanViewHeader} key={"text" + i}> Workout {i + 1}</Text>
          </View>
          <View>
            {loading ? <ActivityIndicator/> 
            : exercises[i].map(j=>{
            return (
              <View style={styles.flatListSearchItem}>
                <Text>{j}</Text>
              </View>
            )})}
          </View>
        </View>
        )})}
      </View>
    </ScrollView>
  );
}
