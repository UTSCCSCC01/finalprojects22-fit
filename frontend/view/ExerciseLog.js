import * as React from 'react';
import { ActivityIndicator, Button, FlatList, Text, View } from 'react-native';
import { styles } from '../style/styles';
import { cleanString, numberToTime } from '../utility/format.js';

export function ExerciseLog({ navigation }) {
  /* Create hooks */
  const [isLoading, setLoading] = React.useState(true);
  const [data, setData] = React.useState([]);
  const [logMode, setLogMode] = React.useState('select');

  /* Pull user's sets */
  /* TO DO - GET USER DATA INSTEAD OF HARDCODING USER ID */
  const getSets = async () => {
    try {
      const response = await fetch('http://localhost:3000/set/629fb406dce35a2490193a84');
      const json = await response.json();
      setData(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
  
  /* Delete selected set */
  const deleteSets = async (id) => {
    const setId = cleanString(id);
    fetch('http://localhost:3000/set/'.concat(setId), {method: 'DELETE'})
    .then(getSets());
  }

  /* Update selected set */
  const patchSets = async (id) => {
    const setId = cleanString(id);
    fetch('http://localhost:3000/set/'.concat(setId), {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        first_value: 20,
        second_value: 5,
      })
    })
    .then(getSets());
  }

  /* Perform update/delete depending on queued action */
  const doEvent = (item) => {
    if (logMode === 'delete'){
      deleteSets(item._id);
    }
    else if (logMode === 'update'){
      patchSets(item._id);
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
          onPress={() => navigation.navigate('Select Muscle Group')}
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