import * as React from 'react';
import { View, TextInput, TouchableOpacity, Text, FlatList } from 'react-native';
import { cleanString } from '../../utility/format.js';
import { styles } from '../../style/styles';
import { workouts } from './CreateExercisePlan';

export function CreateWorkout({ navigation, route }) {
  
  const [logState, setLogState] = React.useState("default");

  const { day } = route.params;

  const workoutDay = cleanString(day);

  const getDefaultMessage = () => {
    return <View>
      <Text style={styles.finePrintWarning}> Add exercises to create your workout </Text>
    </View>
  }

  const selectStyle = () => {
    if (logState === 'delete'){
      return styles.flatListSearchDeleteItem;
    }
    else{
      return styles.flatListSearchItem;
    }
  }

  /* Perform update/delete depending on queued action */
  const itemEvent = (index) => {
    if (logState === 'delete'){
      console.log("deleting");
      workouts[workoutDay -1].splice(index, 1);
    }
    setLogState('default')
  }

  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
      <TouchableOpacity
        style={styles.generalButton}
        onPress={() => navigation.navigate('Workout Exercise Search', {
          day : workoutDay,
        })}
      >
        <View>
          <Text style={styles.generalButtonFont}> Add Exercises </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.generalButton}
        onPress={() => logState === "delete" ? setLogState('default') : setLogState('delete')}
      >
        <View>
          <Text style={styles.generalButtonFont}> Delete workout </Text>
        </View>
      </TouchableOpacity>
      </View>
      <View style={styles.flatListContainer}>
        {workouts[workoutDay - 1].length == 0 ? getDefaultMessage() : (
        <FlatList
          data={workouts[workoutDay - 1]}
          keyExtractor={(item, index) => item._id}
          renderItem={({item, index}) => <Text style={selectStyle()} onPress={()=> itemEvent(index)}>{item.ExerciseName}</Text>}
        />
        )}
      </View>
    </View>
  );
}
