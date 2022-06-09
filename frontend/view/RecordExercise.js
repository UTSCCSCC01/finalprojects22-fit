import * as React from 'react';
import { Text, View, Button, TextInput} from 'react-native';
import { styles } from '../style/styles';
import { cleanString, numberToTime } from '../utility/format.js';

export function RecordExercise({ route, navigation }) {
  /* Create hooks */
  const [weight, setWeight] = React.useState(0);
  const [reps, setReps] = React.useState(0);

  const { exercise_name, exercise_group } = route.params;

  /* Search by muscle group (including cardio) */
  const postSet = async () => {

    /* Set body parameters */
    const currentDate = new Date();
    const exerciseName = cleanString(exercise_name);
    const firstValue = cleanString(weight);
    const secondValue = cleanString(reps);
    const isCardio = cleanString(exercise_group) === 'Cardio' ? 'true' : 'false';

    /* Send Post Request */
    fetch('http://localhost:3000/set', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId: '629fb406dce35a2490193a84',
        exercise_name: exerciseName,
        is_cardio: isCardio,
        first_value: firstValue,
        second_value: secondValue,
        date: currentDate.getTime()
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
        title="Log Exercise"
        onPress={() => addNewSet()}
      />
    </View>
  );
}
