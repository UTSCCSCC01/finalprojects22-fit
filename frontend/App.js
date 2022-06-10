import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ExerciseSelect } from './view/exerciseSelectView'
import { ExerciseGroupSelect } from './view/exerciseGroupSelectView'
import { ExerciseRecorder } from './view/exerciseRecorderView';
import { ExerciseLog } from './view/exerciseLogView';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Exercise Log">
        <Stack.Screen name="Exercise Log" component={ExerciseLog} />
        <Stack.Screen name="Select Exercise Group" component={ExerciseGroupSelect} />
        <Stack.Screen name="Select Exercise" component={ExerciseSelect} />
        <Stack.Screen name="Record Exercise" component={ExerciseRecorder} />
      </Stack.Navigator>
  </NavigationContainer>
  );
};

export default App;