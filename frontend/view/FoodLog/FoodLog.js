import * as React from 'react';
import { ActivityIndicator, FlatList, Text, View, TouchableOpacity } from 'react-native';
import { styles } from '../../style/styles.js';
import { cleanString, numberToTime, cleanNum } from '../../utility/format.js';
import { getFoodSavedPlans, deleteFoodSavedPlans } from '../../controller/Food/FoodLogController'
import { postUserActivity, getUserActivity, patchUserActivity } from '../../controller/UserActivity/userActivityController'
import { retrieveUserId } from '../../utility/dataHandler.js'

export function FoodLog({ navigation, route }) {
  /* Create hooks */
  const [isLoading, setLoading] = React.useState(true);
  const [data, setData] = React.useState(null);
  const [activityData, setActivityData] = React.useState(null);
  const [logMode, setLogMode] = React.useState('select');

  const { date } = route.params;

  /* Pull user's saved plans */
  const getSavedPlans = async () => {
    try {
      const json = await getFoodSavedPlans(cleanString(date));
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

   const formatCell = (item) => {
        return (
          <View style={styles.flatListTextContainer}>
            <Text style={styles.flatListText}>Food Name: {item.food_name}</Text>
            <Text style={styles.flatListText}>Calorie: {cleanNum(item.calorie)} g</Text>
            <Text style={styles.flatListText}>Carbohydrate: {cleanNum(item.carbohydrate)} g</Text>
            <Text style={styles.flatListText}>Fat: {cleanNum(item.fat)} g</Text>
            <Text style={styles.flatListText}>Protein: {cleanNum(item.protein)} g</Text>
          </View>
        );
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
    setLogMode('select')
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

  // Create activity if none exists. Update as necessary if it does
  const addFoodActivity = () => {
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
        addFoodActivity();
      }
    }
  }, [activityData]);

  return (
    <View style={styles.container}>
       <View style={styles.exerciseLogButtonsContainer}>
         <View style={styles.rowContainer}>
           <TouchableOpacity
             style={styles.generalButton}
             onPress={() => navigation.navigate('Select Food Category', {
             date: date,
             })}
           >
             <Text style={styles.generalButtonFont}> Log a new Food </Text>
           </TouchableOpacity>
           <TouchableOpacity
             style={styles.generalButton}
             onPress={() => setLogMode(logMode === 'update' ? 'select' : 'update')}
           >
             <Text style={styles.generalButtonFont}> Update a Food </Text>
           </TouchableOpacity>
         </View>
         <View style={styles.rowContainer}>
           <TouchableOpacity
             style={styles.generalButton}
             onPress={() => setLogMode(logMode === 'delete' ? 'select' : 'delete')}
           >
             <Text style={styles.generalButtonFont}> Delete a Food </Text>
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