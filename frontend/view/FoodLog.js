import * as React from 'react';
import { ActivityIndicator, Button, FlatList, Text, View } from 'react-native';
import { styles } from '../style';
import { cleanString, numberToTime } from '../utility/format.js';
import { getFoodSavedPlans, deleteFoodSavedPlans } from '../controller/FoodLogController'

export function FoodLog({ navigation }) {
  /* Create hooks */
  const [isLoading, savedplanLoading] = React.useState(true);
  const [data, savedplanData] = React.useState([]);
  const [logMode, savedplanLogMode] = React.useState('select');

  /* Pull user's saved plans */
  const getSavedPlans = async () => {
    try {
      const json = await getFoodSavedPlans();
      savedplanData(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      savedplanLoading(false);
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

  /* Perform update/delete depending on queued action */
  const doEvent = (item) => {
    if (logMode === 'delete'){
      Promise.resolve(deleteSavedPlans(cleanString(item._id)))
      .then(getSavedPlans());
    }
    else if (logMode === 'update'){
      navigation.navigate('Record Food', {
        food_name: item.food_name,
        food_id: item._id,
        calorie: item.calorie,
        carbohydrate: item.carbohydrate,
        fat: item.fat,
        protein: item.protein,
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

  React.useEffect(() => {
    navigation.addListener('focus', () => {
      getSavedPlans();
    });
  }, []);

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
          onPress={() => navigation.navigate('Select Food Category')}
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