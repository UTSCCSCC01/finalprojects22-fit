import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ExerciseSelect } from './view/ExerciseSelect'
import { MuscleGroupSelect } from './view/MuscleGroupSelect'

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Select Muscle Group" component={MuscleGroupSelect} />
        <Stack.Screen name="Select Exercise" component={ExerciseSelect} />
      </Stack.Navigator>
  </NavigationContainer>
  );
};

export default App;