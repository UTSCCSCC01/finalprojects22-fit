import * as React from 'react';
import { ActivityIndicator, Button, FlatList, Text, View } from 'react-native';
import { styles } from '../style';
import { cleanString, numberToTime } from '../utility/format.js';
import { getFoodSavedPlans, deleteFoodSavedPlans } from '../controller/FoodLogController'

export function FoodLog({ navigation }) {
  /* Create hooks */
  const [isLoading, setLoading] = React.useState(true);
  const [data, setData] = React.useState([]);
  const [logMode, setLogMode] = React.useState('select');

  /* Pull user's saved plans */
  const getSavedPlans = async () => {
    try {
      const json = await getFoodSavedPlans();
      setData(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
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
      .then(getSets());
    }
    else if (logMode === 'update'){
      navigation.navigate('Record Food', {
        food_name: item.food_name,
        food_id: item._id,
        carbohydrate: item.carbohydrate,
        fat: item.fat,
        protein: item.protein,
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

  /* TO DO: need to be able to change metrics based on user preferences */
  const formatCell = (item) => {
  if (item.is_cardio){
    return item.food_name + ' - Carbohydrates: ' +item.carbohydrate + 'g, Fat: ' + item.fat + 'g, Protein: ' + item.protein + 'g';
  }
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
        keyExtractor={({ id }, index) => id}
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
          onPress={() => setLogMode(logMode === 'update' ? 'select' : 'update')}
        />
        <Button
          title="Delete an food"
          onPress={() => setLogMode(logMode === 'delete' ? 'select' : 'delete')}
        />
      </View>
    </View>
  );
}