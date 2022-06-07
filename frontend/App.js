import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SelectFoodCategory } from './visual/SelectFoodCategory'
import { SelectFood } from './visual/SelectFood'

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Select Food Category" component={SelectFoodCategory} />
        <Stack.Screen name="Select Food" component={SelectFood} />
      </Stack.Navigator>
  </NavigationContainer>
  );
};

export default App;