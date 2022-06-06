import * as React from 'react';
import { Text, View, Button} from 'react-native';

export function ExerciseSelect({ route, navigation }) {
  const { exerciseType } = route.params;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Text>exerciseType: {JSON.stringify(exerciseType)}</Text>
      <Button
        title="Go to Home Screen"
        onPress={() => navigation.goBack()}
      />
    </View>
  );
}