import React from 'react';
import { View } from 'react-native';
import Login from './components/LoginComponents';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainPage from './components/MainPage';
import UserSurvey from './components/NewUserSurvey';
import { ExerciseSelect } from './view/exerciseSelectView';
import { ExerciseGroupSelect } from './view/exerciseGroupSelectView';
import { ExerciseRecorder } from './view/exerciseRecorderView';
import { ExerciseLog } from './view/exerciseLogView';

const Stack = createNativeStackNavigator();

const App = () => {
  //routing for the whole app
  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome">
          <Stack.Group>
            <Stack.Screen name="Welcome" component={Login} />
            <Stack.Screen name="MainPage" component={MainPage} />
            <Stack.Screen name="Survey" component={UserSurvey} />
          </Stack.Group>
          <Stack.Group>
            <Stack.Screen name="Exercise Log" component={ExerciseLog} />
            <Stack.Screen name="Select Exercise Group" component={ExerciseGroupSelect} />
            <Stack.Screen name="Select Exercise" component={ExerciseSelect} />
            <Stack.Screen name="Record Exercise" component={ExerciseRecorder} />
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
  );
};

export default App;

