import React from 'react';
import { View, LogBox } from 'react-native';
LogBox.ignoreAllLogs();
import Login from './components/LoginComponents';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainPage from './components/MainPage';
import UserSurvey from './components/NewUserSurvey';
import { ExerciseSelect } from './view/exerciseSelectView';
import { ExerciseGroupSelect } from './view/exerciseGroupSelectView';
import { ExerciseRecorder } from './view/exerciseRecorderView';
import { ExerciseLog } from './view/exerciseLogView';
import { UserProvider } from './context/UserContext';


const Stack = createNativeStackNavigator();

const App = () => {
  //routing for the whole app
  return (
    <UserProvider value = {false}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome">
          <Stack.Screen name="Welcome" component={Login} />
          <Stack.Screen name="MainPage" component={MainPage} />
          <Stack.Screen name="Survey" component={UserSurvey} />
          <Stack.Screen name="Exercise Log" component={ExerciseLog} />
          <Stack.Screen name="Select Exercise Group" component={ExerciseGroupSelect} />
          <Stack.Screen name="Select Exercise" component={ExerciseSelect} />
          <Stack.Screen name="Record Exercise" component={ExerciseRecorder} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
};

export default App;

