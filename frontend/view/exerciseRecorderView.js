import * as React from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { styles } from '../style/styles';
import { cleanString, numberToTime } from '../utility/format.js';
import { postSet, patchSet } from '../controller/exerciseRecorderController.js'
import { retrieveUserId } from '../utility/dataHandler.js'

export function ExerciseRecorder({ route, navigation }) {
  /* Create hooks */
  const [weight, setWeight] = React.useState(0);
  const [reps, setReps] = React.useState(0);

  const { exercise_name, exercise_group, exercise_id, first_value, second_value, date } = route.params;

  /* create new set */
  const createSet = async () => {

    /* Clean/set body parameters */
    const exerciseName = cleanString(exercise_name);
    const isCardio = cleanString(exercise_group) === 'Cardio' ? 'true' : 'false';
    const userId = await retrieveUserId();

    /* bundle parameters into JSON format */
    const body = JSON.stringify({
      userId: userId, 
      exercise_name: exerciseName,
      is_cardio: isCardio,
      first_value: weight,
      second_value: reps,
      date: date
    });
    
    /* Post set */
    const json = await postSet(body);
  
    /* go back to exercise log page */
    navigation.navigate("Exercise Log", {date : date});
  }

  /* Update set */
  const updateSet = async () => {

    /* Clean parameter */
    const setId = cleanString(exercise_id);

    /* bundle parameters into JSON format */
    const body = JSON.stringify({
      first_value: weight,
      second_value: reps,
    });

    /* patch st */
    const json = patchSet(setId, body);

    /* go back to exercise log page */
    navigation.navigate("Exercise Log", {date : date});
  }

  /* Determines which format to use to represent first_value */
  const cardioTimeConverter = () => {
    if (weight < 0){      
      setWeight(0);
    }

    if (cleanString(exercise_group) === 'Cardio'){
      return numberToTime(weight);
    }
    else{
      return cleanString(weight)
    }
  }

  const cardioDistConverter = () => {
    if (cleanString(exercise_group) === 'Cardio'){
      return cleanString(reps) + 'KM';
    }
    else{
      return cleanString(reps);
    }
  }

  React.useEffect(() => {
    setWeight(first_value);
    setReps(second_value);
  }, []);

  return (
      <View style={styles.recorderContainer}>
        <Text style={styles.header1}>{cleanString(exercise_name)}</Text>
        <View style={styles.headercontainer2}>
          <Text style={styles.header2}>{cleanString(exercise_group) === 'Cardio' ? 'Time: ' : 'Weight: '}</Text>
        </View>
        <View style={styles.exerciseInputContainer}>
          <TouchableOpacity
            style={styles.sideButton}
            onPress={() => weight <= 0 ? setWeight(0) : setWeight(weight - 5)}
            >
            <Text style={styles.sideButtonFont}> - </Text>
          </TouchableOpacity>
          <TextInput
            style={styles.exerciseMetricsInput}
            value={cardioTimeConverter()}
            onChangeText={text => text === '' ? setWeight(0) : setWeight(parseInt(text))}
            keyboardType="numeric"
          />
          <TouchableOpacity
            style={styles.sideButton}
            onPress={() => setWeight(weight + 5)}
          >
            <Text style={styles.sideButtonFont}> + </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.headercontainer2}>
          <Text style={styles.header2}>{cleanString(exercise_group) === 'Cardio' ? 'Distance: ' : 'Reps: '}</Text>
        </View>
        <View style={styles.exerciseInputContainer}>
          <TouchableOpacity
            style={styles.sideButton}
            onPress={() => reps <= 0 ? setReps(0) : setReps(reps - 1)}
            >
            <Text style={styles.sideButtonFont}> - </Text>
          </TouchableOpacity>
          <TextInput
            style={styles.exerciseMetricsInput}
            value={cardioDistConverter()}
            onChangeText={text => text == '' ? setReps(0) : setReps(parseInt(text))}
            keyboardType="numeric"
          />
          <TouchableOpacity
            style={styles.sideButton}
            onPress={() => setReps(reps + 1)}
          >
            <Text style={styles.sideButtonFont}> + </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
            style={styles.generalButton}
            onPress={() => cleanString(exercise_id) === 'N/A' ? createSet() : updateSet()}
          >
          <Text style={styles.generalButtonFont}> {cleanString(exercise_id) === 'N/A' ? 'Log Exercise' : 'Update Exercise'} </Text>
        </TouchableOpacity>
      </View>
  );
}
