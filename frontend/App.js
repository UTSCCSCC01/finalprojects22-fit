import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ExerciseSelect } from './view/ExerciseSelect'
import { MuscleGroupSelect } from './view/MuscleGroupSelect'
import { RecordExercise } from './view/RecordExercise';
import { ExerciseLog } from './view/ExerciseLog';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Exercise Log">
        <Stack.Screen name="Exercise Log" component={ExerciseLog} />
        <Stack.Screen name="Select Muscle Group" component={MuscleGroupSelect} />
        <Stack.Screen name="Select Exercise" component={ExerciseSelect} />
        <Stack.Screen name="Record Exercise" component={RecordExercise} />
      </Stack.Navigator>
  </NavigationContainer>
  );
};

export default App;