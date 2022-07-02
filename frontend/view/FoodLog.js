import * as React from 'react';
import { ActivityIndicator, Button, FlatList, Text, View } from 'react-native';
import { styles } from '../style';
import { cleanString, numberToTime } from '../utility/format.js';
import { getFoodSavedPlans, deleteFoodSavedPlans, postUserActivity, getUserActivity, patchUserActivity } from '../controller/FoodLogController'
import { retrieveUserId } from '../utility/dataHandler.js'

export function FoodLog({ navigation, route }) {
  /* Create hooks */
  const [isLoading, savedplanLoading] = React.useState(true);
  const [data, savedplanData] = React.useState([]);
  const [activityData, setActivityData] = React.useState(null);
  const [logMode, savedplanLogMode] = React.useState('select');

  const { date } = route.params;

  /* Pull user's saved plans */
  const getSavedPlans = async () => {
    try {
      const json = await getFoodSavedPlans(cleanString(date));
      savedplanData(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      savedplanLoading(false);
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

  /* Delete selected saved plan */
  const deleteSavedPlans = async (id) => {
    try {
      const json = await deleteFoodSavedPlans(id);
      getSavedPlans();
    } catch (error) {
      console.error(error);
    }
  }

  const createUserActivity = async () => {
    const userId = await retrieveUserId();
    const has_data = cleanString(data) === "[]" ? false : true;
    /* bundle parameters into JSON format */
    const body = JSON.stringify({
      userId: userId, 
      food_activity: has_data,
      date: date,
    });

    const json = await postUserActivity(body);
  }

  const updateUserActivity = async (id) => {
    const userId = await retrieveUserId();
    const has_data = cleanString(data) === "[]" ? false : true;
    /* bundle parameters into JSON format */
    const body = JSON.stringify({
      userId: userId, 
      food_activity: has_data,
      date: date,
    });

    const json = await patchUserActivity(id, body);
  }

  /* Perform update/delete depending on queued action */
  const doEvent = (item) => {
    if (logMode === 'delete'){
      setActivityData(null);
      Promise.resolve(deleteSavedPlans(cleanString(item._id)))
      .then(getSavedPlans())
      .then(() => getActivity());
    }
    else if (logMode === 'update'){
      navigation.navigate('Record Food', {
        food_name: item.food_name,
        food_id: item._id,
        calorie: item.calorie,
        carbohydrate: item.carbohydrate,
        fat: item.fat,
        protein: item.protein,
        date: item.date,
      })
    }
    savedplanLogMode('select')
  }

  /* Change colour of the borders depending on the queued action */
  const selectStyle = () => {
    if (logMode === 'delete'){
      return styles.deleteItem;
    }
    else if (logMode === 'update') {
      return styles.updateItem;
    }
    else{
      return styles.item;
    }
  }

  const formatCell = (item) => {
     return item.food_name;
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

  React.useEffect(() => {
    navigation.addListener('focus', () => {
      // Reset activityData so event is triggered later
      setActivityData(null);
      Promise.resolve(getSavedPlans())
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

  return (
    <View style={styles.container}>
      {isLoading ? <ActivityIndicator/> : (
      <FlatList
        data={data}
        keyExtractor={(item,index) => item._id}
        renderItem={({item}) => <Text style= {selectStyle()} onPress={()=> doEvent(item)}>{formatCell(item)}</Text>}
      />
      )}
      <View style={styles.fixToText}>
        <Button
          title="Log a new food"
          onPress={() => navigation.navigate('Select Food Category', {
            date: date,
          })}
        />
        <Button
          title="Update an food"
          onPress={() => savedplanLogMode(logMode === 'update' ? 'select' : 'update')}
        />
        <Button
          title="Delete an food"
          onPress={() => savedplanLogMode(logMode === 'delete' ? 'select' : 'delete')}
        />
      </View>
    </View>
  );
}