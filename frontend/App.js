import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {Survey} from './view/Survey.js';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Survey">
        <Stack.Screen name="Survey" component={Survey} />
      </Stack.Navigator>
  </NavigationContainer>
  );
};

export default App;