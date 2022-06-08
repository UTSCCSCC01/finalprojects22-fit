import React from 'react';
import { View } from 'react-native';
import Login from './components/LoginComponents';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainPage from './components/MainPage';
import UserSurvey from './components/NewUserSurvey';

const Stack = createNativeStackNavigator();


const App = () => {
  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="MainPage" component={MainPage} />
          <Stack.Screen name="Survey" component={UserSurvey} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}

export default App;
