import * as React from 'react';
import { Text, View, Button} from 'react-native';
import { styles } from '../style/styles';

export function ExerciseSelect({ route, navigation }) {
  const { exerciseType } = route.params;
  return (
    <View style={styles.container}>
      <Text>exerciseType: {JSON.stringify(exerciseType)}</Text>
      <Button
        title="Bench Press"
        onPress={() => navigation.navigate('Record Exercise', {
          exerciseName: 'Bench Press',
        })}
      />
      <Button
        title="Go to Home Screen"
        onPress={() => navigation.goBack()}
      />
    </View>
  );
}