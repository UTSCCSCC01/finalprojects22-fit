import * as React from 'react';
import { ActivityIndicator, FlatList, Text, View, TouchableOpacity } from 'react-native';
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
          <Text style={styles.flatListText}>Weight: {numberToTime(item.first_value)} kg</Text>
          <Text style={styles.flatListText}>Reps: {item.second_value} </Text>
        </View>
      );
    }
  }

  React.useEffect(() => {
    navigation.addListener('focus', () => {
      getSets();
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.exerciseLogButtonsContainer}>
        <View style={styles.rowContainer}>
          <TouchableOpacity
            style={styles.generalButton}
            onPress={() => navigation.navigate('Select Exercise Group')}
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