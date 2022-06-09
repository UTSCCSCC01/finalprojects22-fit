import * as React from 'react';
import { Text, View, Button, TextInput} from 'react-native';
import { styles } from '../style/styles';
import { cleanString, numberToTime } from '../utility/format.js';

export function RecordExercise({ route, navigation }) {
  /* Create hooks */
  const [weight, setWeight] = React.useState(0);
  const [reps, setReps] = React.useState(0);

  const { exercise_name, exercise_group, exercise_id, first_value, second_value } = route.params;

  /* create new set */
  const postSet = async () => {

    /* Set body parameters */
    const currentDate = new Date();
    const exerciseName = cleanString(exercise_name);
    const isCardio = cleanString(exercise_group) === 'Cardio' ? 'true' : 'false';

    /* Send Post Request */
    fetch('http://localhost:3000/set', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId: '629fb406dce35a2490193a84', // TO DO: dont hardcode this
        exercise_name: exerciseName,
        is_cardio: isCardio,
        first_value: weight,
        second_value: reps,
        date: currentDate.getTime()
      })
    });
  }

  /* Update set */
  const patchSet = async () => {
    const setId = cleanString(exercise_id);
    fetch('http://localhost:3000/set/'.concat(setId), {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        first_value: weight,
        second_value: reps,
      })
    });
  }

  /* Determines which format to use to represent first_value */
  const cardioTimeConverter = () => {
    if (cleanString(exercise_group) === 'Cardio'){
      return numberToTime(weight);
    }
    else{
      return cleanString(weight)
    }
  }

  const cardioDistConverter = () => {
    if (cleanString(exercise_group) === 'Cardio'){
      return cleanString(reps / 10) + ' KM';
    }
    else{
      return cleanString(reps)
    }
  }

  /* Create new set in database and navigate back to the log */
  const addNewSet = () => {
    postSet();
    navigation.popToTop()
  }

  /* Update set in database and navigate back to the log */
  const updateSet = () => {
    patchSet();
    navigation.popToTop()
  }

  React.useEffect(() => {
    setWeight(first_value);
    setReps(second_value);
  }, []);

  return (
    <View style={styles.container}>
        <Text>exerciseName: {cleanString(exercise_name)}</Text>
        <Text>{cleanString(exercise_group) === 'Cardio' ? 'Time' : 'Weight'}</Text>
        <View style={styles.exerciseInput}>
          <Button
            title="-"
            onPress={() => setWeight(weight - 5)}
          />
          <TextInput
            style={styles.textInput}
            value={cardioTimeConverter()}
            onChangeText={text => text === '' ? setWeight(0) : setWeight(parseInt(text))}
            keyboardType="numeric"
          />
          <Button
            title="+"
            onPress={() => setWeight(weight + 5)}
          />
        </View>
        <Text>{cleanString(exercise_group) === 'Cardio' ? 'Distance' : 'Reps'}</Text>
        <View style={styles.exerciseInput}>
          <Button
            title="-"
            onPress={() => setReps(reps - 1)}
          />
          <TextInput
            style={styles.textInput}
            value={cardioDistConverter()}
            onChangeText={text => text == '' ? setReps(0) : setReps(parseInt(text))}
            keyboardType="numeric"
          />
          <Button
            title='+'
            onPress={() => setReps(reps + 1)}
          />
        </View>
      <Button
        title={cleanString(exercise_id) === 'N/A' ? 'Log Exercise' : 'Update Exercise'}
        onPress={() => cleanString(exercise_id) === 'N/A' ? addNewSet() : updateSet()}
      />
    </View>
  );
}
