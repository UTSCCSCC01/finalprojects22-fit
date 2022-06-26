import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {Survey} from './view/Survey.js';
import {Plan} from './view/Plan.js';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName= "Survey">
        <Stack.Screen name= "Survey" component={Survey} />
        <Stack.Screen name = "Plan" component = {Plan} />
      </Stack.Navigator>
  </NavigationContainer>
  );
};

export default App;