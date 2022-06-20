import * as React from 'react';
import { ActivityIndicator, FlatList, Text, View, TouchableOpacity } from 'react-native';
import { styles } from '../style/styles';
import { cleanString, numberToTime } from '../utility/format.js';
import { getExerciseSets, deleteExerciseSet, postUserActivity, getUserActivity, patchUserActivity } from '../controller/exerciseLogController' 
import { retrieveUserId } from '../utility/dataHandler.js'

export function ExerciseLog({ navigation, route }) {
  /* Create hooks */
  const [isLoading, setLoading] = React.useState(true);
  const [data, setData] = React.useState(null);
  const [activityData, setActivityData] = React.useState(null);
  const [logMode, setLogMode] = React.useState('select');

  const { date } = route.params;

  /* Pull user's sets */
  const getSets = async () => {
    try {
      const json = await getExerciseSets(cleanString(date));
      setData(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
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
  
  /* Delete selected set */
  const deleteSets = async (id) => {
    try {
      const json = await deleteExerciseSet(id);
      getSets();
    } catch (error) {
      console.error(error);
    }
  }

  const createUserActivity = async () => {
    const userId = await retrieveUserId();
    const has_exercise = cleanString(data) === "[]" ? false : true;
    /* bundle parameters into JSON format */
    const body = JSON.stringify({
      userId: userId, 
      exercise_activity: has_exercise,
      date: date,
    });

    const json = await postUserActivity(body);
  }

  const updateUserActivity = async (id) => {
    const userId = await retrieveUserId();
    const has_exercise = cleanString(data) === "[]" ? false : true;
    /* bundle parameters into JSON format */
    const body = JSON.stringify({
      userId: userId, 
      exercise_activity: has_exercise,
      date: date,
    });

    const json = await patchUserActivity(id, body);
  }

  /* Perform update/delete depending on queued action */
  const doEvent = (item) => {
    if (logMode === 'delete'){
      Promise.resolve(deleteSets(cleanString(item._id)))
      .then(() => getSets());
    }
    else if (logMode === 'update'){
      navigation.navigate('Record Exercise', {
        exercise_name: item.exercise_name,
        exercise_group: item.is_cardio ? 'Cardio' : 'Not Cardio',
        exercise_id: item._id,
        first_value: item.first_value,
        second_value: item.second_value,
        date: item.date,
      })
    }
    setLogMode('select')
  }

  /* Change colour of the borders depending on the queued action */
  const selectStyle = () => {
    if (logMode === 'delete'){
      return styles.flatListDeleteItem;
    }
    else if (logMode === 'update') {
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
        <View style={styles.flatListTextContainer}>
          <Text style={styles.flatListText}>Exercise Name: {item.exercise_name}</Text>
          <Text style={styles.flatListText}>Time: {numberToTime(item.first_value)}</Text>
          <Text style={styles.flatListText}>Distance: {item.second_value} km</Text>
        </View>
      );
    }
    else{
      return (
        <View style={styles.flatListTextContainer}>
          <Text style={styles.flatListText}>Exercise Name: {item.exercise_name}</Text>
          <Text style={styles.flatListText}>Weight: {item.first_value} kg</Text>
          <Text style={styles.flatListText}>Reps: {item.second_value} </Text>
        </View>
      );
    }
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

  // perform event upon focusing back onto the page
  React.useEffect(() => {
    navigation.addListener('focus', () => {
      getSets();
      getActivity();
    });
  }, []);


  React.useEffect(() => {
    if (activityData != null){
      if (data != null){
        addExerciseActivity();
      }
    }
  }, [activityData]);

  return (
      <View style={styles.container}>
        <View style={styles.exerciseLogButtonsContainer}>
          <View style={styles.rowContainer}>
            <TouchableOpacity
              style={styles.generalButton}
              onPress={() => navigation.navigate('Select Exercise Group', {
                date: date,
              })}
            >
              <Text style={styles.generalButtonFont}> Log new exercise </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.generalButton}
              onPress={() => setLogMode(logMode === 'update' ? 'select' : 'update')}
            >
              <Text style={styles.generalButtonFont}> Update an exercise </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.rowContainer}>
            <TouchableOpacity
              style={styles.generalButton}
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
            renderItem={({item}) => <Text style= {selectStyle()} onPress={()=> doEvent(item)}>{formatCell(item)}</Text>}
          />
          )}
        </View>
      </View>
  );
}