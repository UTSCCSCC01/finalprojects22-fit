import * as React from 'react';
import { ActivityIndicator, FlatList, Text, View, TouchableOpacity } from 'react-native';
import { styles } from '../../style/styles';
import { cleanString, numberToTime } from '../../utility/format.js';
import { getExerciseSets, deleteExerciseSet, getExerciseById } from '../../controller/Exercise/exerciseLogController' 
import { postUserActivity, getUserActivity, patchUserActivity } from '../../controller/UserActivity/userActivityController'
import { retrievePlanId, retrieveUserId, storeUserPlan } from '../../utility/dataHandler.js'
import { getWorkoutPlan, patchWorkoutPlan, patchUser, deleteWorkoutPlan } from '../../controller/Exercise/workoutPlanController';
import { postSet, patchSet } from '../../controller/Exercise/exerciseRecorderController';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export function ExerciseLog({ navigation, route }) {
  /* Create hooks */
  const [isLoading, setLoading] = React.useState(true);
  const [data, setData] = React.useState(null);
  const [activityData, setActivityData] = React.useState(null);
  const [logMode, setLogMode] = React.useState('select');
  const [hasCompleted, setHasCompleted] = React.useState(false);

  const { date } = route.params;

  // Take an exercise from the plan and turn it into a set
  const getSetFromExercise = async (id, index) => {
    const json = await getExerciseById(id);
    const userId = await retrieveUserId();
    const exerciseName = cleanString(json.data.ExerciseName);
    const isCardio = cleanString(json.data.MuscleGroup) === 'Cardio' ? true : false;

    const body = {
      _id: index, 
      userId: userId, 
      exercise_name: exerciseName,
      is_cardio: isCardio,
      first_value: 0,
      second_value: 0,
      date: date,
      completed: false
    };

    return body;
  }

  // Get workout data from exercise plan
  const getWorkoutData = async (userPlanId) => {
    try {
      const json = await getWorkoutPlan(cleanString(userPlanId));
      const workoutCounter = json.data.workout_counter;
      const workoutFrequency = json.data.workouts.length;
      const workout = json.data.workouts[workoutCounter % workoutFrequency];
      const workoutData = [];
      
      for (let i = 0; i < workout.length; i++){
        workoutData.push(await getSetFromExercise(workout[i], i));
      }
      return workoutData;
    } catch (error) {
      console.error(error);
    }
  }

  /* Pull user's sets */
  const getSets = async () => {
    try {
      const json = await getExerciseSets(cleanString(date));
      if (json.data.length == 0){
        // Need to check if user has a plan in place
        const userPlanId = await retrievePlanId();
        if (userPlanId == 'null'){
          setData(json.data);
        }
        else {
          setData(await getWorkoutData(userPlanId));
        }
      }
      else {
        setData(json.data);
        setHasCompleted(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  /* Update Set */
  const updateSet = async (item) => {
    try {
      const body = JSON.stringify({
        completed: item.completed
      });

      /* patch set */
      const json = await patchSet(item._id, body);
    } catch (error) {
      console.error(error);
    }
  }

  /* Delete selected set */
  const deleteSets = async (id) => {
    try {
      const json = await deleteExerciseSet(id);
    } catch (error) {
      console.error(error);
    }
  }

  /* Pull activity for today */
  const getActivity = async () => {
    try {
      const json = await getUserActivity(cleanString(date));
      setActivityData(json.data);
    } catch (error) {
      console.error(error);
    }
  }

  // Add exercise activity in today's user activity object
  const createUserActivity = async () => {
    const userId = await retrieveUserId();
    // checks if page has exercise data, and if so, whether or not
    // at least one exercise has been marked as completed
    const has_exercise = cleanString(data) === "[]" ? false : hasCompleted;
    /* bundle parameters into JSON format */
    const body = JSON.stringify({
      userId: userId, 
      exercise_activity: has_exercise,
      date: date,
    });

    const json = await postUserActivity(body);
  }

  
  // update exercise activity in today's user activity object
  const updateUserActivity = async (id) => {
    const userId = await retrieveUserId();
    const has_exercise = cleanString(data) === "[]" ? false : hasCompleted;
    /* bundle parameters into JSON format */
    const body = JSON.stringify({
      userId: userId, 
      exercise_activity: has_exercise,
      date: date,
    });

    const json = await patchUserActivity(id, body);
  }

  const savePlannedExercises = async () => {
    // get user Id
    const userId = await retrieveUserId();

    // Loop through all exercises and save them in database
    for (let i = 0; i < data.length; i++){
      const body = JSON.stringify({
        userId: userId, 
        exercise_name: data[i].exercise_name,
        is_cardio: data[i].is_cardio,
        first_value: data[i].first_value,
        second_value: data[i].second_value,
        date: date,
        completed: data[i].completed,
      });
      const json = await postSet(body);
    }
  }

  // Increment workout counter, and handle logic for completing workout
  const incrementWorkoutCounter = async () => {
    // get necessary workoutplan data
    const planId = await retrievePlanId();
    const json = await getWorkoutPlan(cleanString(planId));
    let workout_counter = json.data.workout_counter + 1;
    const workout_frequency = json.data.workouts.length;
    const workout_weeks = json.data.workout_length;

    // True if user has completed all perscribed workouts
    if (workout_counter >= workout_frequency * workout_weeks){
      // remove planId from user object
      const body = JSON.stringify({
        workout_plan : null,
      });
      patchUser(body);

      // Delete workout plan from database and storage
      deleteWorkoutPlan(planId)
      storeUserPlan("null");
    }
    else {
      // Update workout counter
      const body = JSON.stringify({
        workout_counter : cleanString(workout_counter),
      });
      patchWorkoutPlan(body);
    }
  }

  // Marks the exercise as completed
  const markCompleted = (item) => {
    item.completed = true;

    // Need to perform additional actions if this was the first
    // exercise to be completed from a workout plan.
    if (!hasCompleted){
      savePlannedExercises();
      incrementWorkoutCounter();
      setHasCompleted(true);
    } else {
      // Need to still update the exercises...
      Promise.resolve(updateSet(item))
      .then(() => getSets());
    }
  }

  /* Perform update/delete depending on queued action */
  const doEvent = (item) => {
    if (logMode === 'delete' && item.completed == true){
      setActivityData(null);
      Promise.resolve(deleteSets(cleanString(item._id)))
      .then(() => getSets())
      .then(() => getActivity());
    }
    else if (logMode === 'update' && item.completed == true){
      navigation.navigate('Record Exercise', {
        exercise_name: item.exercise_name,
        exercise_group: item.is_cardio ? 'Cardio' : 'Not Cardio',
        exercise_id: item._id,
        first_value: item.first_value,
        second_value: item.second_value,
        date: item.date,
        completed: item.completed
      })
    }
    setLogMode('select')
  }

    // Create activity if none exists. Update as necessary if it does
    const addExerciseActivity = () => {
      if (cleanString(activityData) === '[]'){
        createUserActivity();
      }
      else {
        const activity = JSON.stringify(activityData[0]);
        var json = JSON.parse(activity);
        var id = JSON.stringify(json._id);
        updateUserActivity(cleanString(id));
      }
    }

  /* Change colour of the borders depending on the queued action */
  const selectStyle = (item) => {
    if (logMode === 'delete' && item.completed == true){
      return styles.flatListDeleteItem;
    }
    else if (logMode === 'update' && item.completed == true) {
      return styles.flatListUpdateItem;
    }
    else{
      return styles.flatListItem;
    }
  }

  /* TO DO: need to be able to change metrics based on user preferences */
  const formatCell = (item) => {
    if (item.is_cardio){
      return (
        <View style={selectStyle(item)}>
          <View style={styles.flatListTextContainer}>
            <View style={styles.setInfoContainer}>
              <Text style={styles.flatListText}>Exercise Name: {item.exercise_name}</Text>
              <Text style={styles.flatListText}>Time: {numberToTime(item.first_value)}</Text>
              <Text style={styles.flatListText}>Distance: {item.second_value} km</Text>
            </View>
            {!item.completed ?             
              <View style={styles.saveButtonContainer}>
                <Text style={styles.smallHeaderFont}>complete</Text>
                <TouchableOpacity
                    onPress={() => markCompleted(item)}
                  >
                  <MaterialIcons
                    name='check-circle-outline'
                    size={45}
                    color='#CFD1D0'
                  />
                </TouchableOpacity>
              </View> : 
              <View/>
            }
          </View>
        </View>
      );
    }
    else{
      return (
        <View style={selectStyle(item)}>
          <View style={styles.flatListTextContainer}>
            <View style={styles.setInfoContainer}>
              <Text style={styles.flatListText}>Exercise Name: {item.exercise_name}</Text>
              <Text style={styles.flatListText}>Weight: {item.first_value} kg</Text>
              <Text style={styles.flatListText}>Reps: {item.second_value} </Text>
            </View>
            {!item.completed ?             
              <View style={styles.saveButtonContainer}>
                <Text style={styles.smallHeaderFont}>complete</Text>
                <TouchableOpacity
                    onPress={() => markCompleted(item)}
                  >
                  <MaterialIcons
                    name='check-circle-outline'
                    size={45}
                    color='#CFD1D0'
                  />
                </TouchableOpacity>
              </View> : 
              <View/>
            }
          </View>
        </View>
      );
    }
  }


  // perform event upon focusing back onto the page
  React.useEffect(() => {
    navigation.addListener('focus', () => {
      // Reset activityData so event is triggered later
      setActivityData(null);
      Promise.resolve(getSets())
      .then(() => getActivity());
    });
  }, []);


  React.useEffect(() => {
    if (activityData != null){
      if (data != null){
        addExerciseActivity();
      }
    }
  }, [activityData]);


  React.useEffect(() => {
    if (activityData != null) {
      addExerciseActivity()
    }
  }, [hasCompleted]);

  return (
      <View style={styles.container}>
        <View style={styles.exerciseLogButtonsContainer}>
          <View style={styles.rowContainer}>
            <TouchableOpacity
              style={styles.ExerciseLogUtilityButton}
              onPress={() => navigation.navigate('Select Exercise Group', {
                date: date,
              })}
            >
              <Text style={styles.generalButtonFont}> Log new exercise </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.ExerciseLogUtilityButton}
              onPress={() => setLogMode(logMode === 'update' ? 'select' : 'update')}
            >
              <Text style={styles.generalButtonFont}> Update an exercise </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.rowContainer}>
            <TouchableOpacity
              style={styles.ExerciseLogUtilityButton}
              onPress={() => setLogMode(logMode === 'delete' ? 'select' : 'delete')}
            >
              <Text style={styles.generalButtonFont}> Delete an Exercise </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.flatListContainer}>
          {isLoading ? <ActivityIndicator/> : (
          <FlatList
            data={data}
            keyExtractor={(item, index) => item._id}
            renderItem={({item}) => <TouchableOpacity onPress={()=> doEvent(item)}>{formatCell(item)}</TouchableOpacity>}
          />
          )}
        </View>
      </View>
  );
}