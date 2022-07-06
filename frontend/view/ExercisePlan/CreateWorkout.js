import * as React from 'react';
import { View, TextInput, TouchableOpacity, Text, FlatList } from 'react-native';
import { cleanString } from '../../utility/format.js';
import { styles } from '../../style/styles';
import { workouts } from './CreateExercisePlan';

export function CreateWorkout({ navigation, route }) {
  
  const [queryState, setQueryState] = React.useState("default");

  const { day } = route.params;

  const workoutDay = cleanString(day);

  const getDefaultMessage = () => {
    return <View>
      <Text> Add exercises to create your workout </Text>
    </View>
  }

  return (
    <View style={styles.container}>
      <View>
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
      </View>
      <View style={styles.flatListContainer}>
        {workouts[workoutDay - 1].length == 0 ? getDefaultMessage() : (
        <FlatList
          data={workouts[workoutDay - 1]}
          keyExtractor={(item, index) => item._id}
          renderItem={({item}) => <Text style={styles.flatListSearchItem}>{item.ExerciseName}</Text>}
        />
        )}
      </View>
    </View>
  );
}
