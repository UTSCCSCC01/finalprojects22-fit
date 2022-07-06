import * as React from 'react';
import { View, ActivityIndicator, TextInput, TouchableOpacity, Text, FlatList } from 'react-native';
import { cleanString } from '../../utility/format.js';
import { styles } from '../../style/styles';
import { getExercisesBySearch } from '../../controller/Exercise/exerciseSelectController';
import { workouts } from './CreateExercisePlan';

export function WorkoutExerciseSearch({ navigation, route }) {

  const [data, setData] = React.useState("[]");
  const [queryState, setQueryState] = React.useState("default");

  const { day } = route.params;

  const workoutDay = cleanString(day);

  const getQueryState = () => {
    if (queryState === "default"){
      return <View>
        <Text> Use the search bar to find exercises </Text>
      </View>
    } else if (queryState === "loading") {
      return <ActivityIndicator/>
    } else if (queryState === "done"){
      return <View>
      <Text> No results found  </Text>
    </View>
    }
  }

  /* Search via the search bar */
  const searchExercises = async (query) => {
    try {
      const json = await getExercisesBySearch(query);
      setData(json.data);
    }catch (error) {
      console.error(error);
    }finally {
      setQueryState("done");
    }
  }

  const queryExercises = (query) => {
    setQueryState("loading");
    searchExercises(query);
  }

  const handlePress = (item) => {
    // Append the exercise to the list of selected exercises
    // for the current workout
    workouts[workoutDay - 1].push(item);
    navigation.navigate('Create Workout', {
      day : workoutDay,
  })}

  return (
    <View style={styles.container}>
      <View>
      <TextInput
        style={styles.searchBarInput}
        onSubmitEditing ={(event) => queryExercises(event.nativeEvent.text)}
        placeholder="Search for exercises"
      />
      </View>
      <View style={styles.flatListContainer}>
        {(cleanString(data) === "[]") ? getQueryState() : (
        <FlatList
          data={data}
          keyExtractor={(item, index) => item._id}
          renderItem={({item}) => <Text style={styles.flatListSearchItem} onPress={() => handlePress(item)}>{item.ExerciseName}</Text>}
        />
        )}
      </View>
      <TouchableOpacity
          style={styles.generalButton}
          onPress={() => navigation.navigate('Create Workout', {
            day : workoutDay,
          })}
        >
        <View>
          <Text style={styles.generalButtonFont}> go back </Text>
        </View>
        </TouchableOpacity>
    </View>
  );
}
