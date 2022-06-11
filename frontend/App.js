import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SelectFoodCategory } from './visual/SelectFoodCategory'
import { SelectFood } from './visual/SelectFood'
import { RecordFood } from './visual/RecordFood'
import { FoodLog } from './visual/FoodLog';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Food Log">
        <Stack.Screen name="Food Log" component={FoodLog} />
        <Stack.Screen name="Select Food Category" component={SelectFoodCategory} />
        <Stack.Screen name="Select Food" component={SelectFood} />
        <Stack.Screen name="Record Food" component={RecordFood} />
      </Stack.Navigator>
  </NavigationContainer>
  );
};

export default App;