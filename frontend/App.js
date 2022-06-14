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
import { SelectFoodCategory } from './view/SelectFoodCategory'
import { SelectFood } from './view/SelectFood'
import { RecordFood } from './view/RecordFood'
import { FoodLog } from './view/FoodLog';

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
          <Stack.Group>
            <Stack.Screen name="Food Log" component={FoodLog} />
            <Stack.Screen name="Select Food Category" component={SelectFoodCategory} />
            <Stack.Screen name="Select Food" component={SelectFood} />
            <Stack.Screen name="Record Food" component={RecordFood} />
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
  );
};

export default App;
