import * as React from 'react';
import { ActivityIndicator, Button, FlatList, Text, View } from 'react-native';
import { styles } from '../style/styles';
import { cleanString, numberToTime } from '../utility/format.js';
import { getExerciseSets, deleteExerciseSet } from '../controller/exerciseLogController' 

export function ExerciseLog({ navigation }) {
  /* Create hooks */
  const [isLoading, setLoading] = React.useState(true);
  const [data, setData] = React.useState([]);
  const [logMode, setLogMode] = React.useState('select');

  /* Pull user's sets */
  const getSets = async () => {
    try {
      const json = await getExerciseSets();
      setData(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
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

  /* Perform update/delete depending on queued action */
  const doEvent = (item) => {
    if (logMode === 'delete'){
      Promise.resolve(deleteSets(cleanString(item._id)))
      .then(getSets());
    }
    else if (logMode === 'update'){
      navigation.navigate('Record Exercise', {
        exercise_name: item.exercise_name,
        exercise_group: item.is_cardio ? 'Cardio' : 'Not Cardio',
        exercise_id: item._id,
        first_value: item.first_value,
        second_value: item.second_value,
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
      return item.exercise_name + ' - Time: ' + numberToTime(item.first_value) + ', Distance: ' + (item.second_value / 10) + ' km ';
    }
    else{
      return item.exercise_name + ' - Weight: ' + item.first_value + ' kg ' + ', Reps: ' + item.second_value;
    }
  }

  React.useEffect(() => {
    navigation.addListener('focus', () => {
      getSets();
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
          title="Log a new exercise"
          onPress={() => navigation.navigate('Select Exercise Group')}
        />
        <Button
          title="Update an exercise"
          onPress={() => setLogMode(logMode === 'update' ? 'select' : 'update')}
        />
        <Button
          title="Delete an exercise"
          onPress={() => setLogMode(logMode === 'delete' ? 'select' : 'delete')}
        />
      </View>
    </View>
  );
}