import * as React from 'react';
import { Text, View, Button, TextInput} from 'react-native';
import { styles } from '../style/styles';

export function RecordExercise({ route, navigation }) {
  const { exerciseName } = route.params;
  const [weight, setWeight] = React.useState(0);
  const [reps, setReps] = React.useState(0);

  return (
    <View style={styles.container}>
        <Text>exerciseName: {JSON.stringify(exerciseName)}</Text>
        <Text>Weight</Text>
        <View style={styles.exerciseInput}>
          <Button
            title="-"
            onPress={() => setWeight(weight - 5)}
          />
          <TextInput
            style={styles.textInput}
            value={JSON.stringify(weight)}
            onChangeText={text => text == '' ? setWeight(0) : setWeight(parseInt(text))}
            keyboardType="numeric"
          />
          <Button
            title="+"
            onPress={() => setWeight(weight + 5)}
          />
        </View>
        <Text>Reps</Text>
        <View style={styles.exerciseInput}>
          <Button
            title="-"
            onPress={() => setReps(reps - 1)}
          />
          <TextInput
            style={styles.textInput}
            value={JSON.stringify(reps)}
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
        onPress={() => navigation.popToTop()}
      />
      <Button
        title="Go back"
        onPress={() => navigation.goBack()}
      />
    </View>
  );
}
