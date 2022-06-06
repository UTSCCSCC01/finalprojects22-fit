import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, Button, TextInput, Alert } from 'react-native';

function HomeScreen({ navigation }) {
  const [onChangeText] = React.useState(null);

  return (
    <View style={styles.container}>
        <TextInput
          style={styles.input}
          onSubmitEditing ={(event) => (Alert.alert(event.nativeEvent.text))}
          placeholder="Search for exercises"
        />
      <Button
        title="Abs"
        onPress={() => navigation.navigate('Details', {
          exerciseType: 'Abs',
        })}
      />
      <Button
        title="Back"
        onPress={() => navigation.navigate('Details', {
          exerciseType: 'Back',
        })}
      />
      <Button
        title="Biceps"
        onPress={() => navigation.navigate('Details', {
          exerciseType: 'Biceps',
        })}
      />
      <Button
        title="Calves"
        onPress={() => navigation.navigate('Details', {
          exerciseType: 'Calves',
        })}
      />
      <Button
        title="Cardio"
        onPress={() => navigation.navigate('Details', {
          exerciseType: 'Cardio',
        })}
      />
      <Button
        title="Chest"
        onPress={() => navigation.navigate('Details', {
          exerciseType: 'Chest',
        })}
      />
      <Button
        title="Legs"
        onPress={() => navigation.navigate('Details', {
          exerciseType: 'Legs',
        })}
      />
      <Button
        title="Shoulders"
        onPress={() => navigation.navigate('Details', {
          exerciseType: 'Shoulders',
        })}
      />
      <Button
        title="Triceps"
        onPress={() => navigation.navigate('Details', {
          exerciseType: 'Triceps',
        })}
      />
    </View>
  );
}

function DetailsScreen({ route, navigation }) {
  const { exerciseType } = route.params;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Text>exerciseType: {JSON.stringify(exerciseType)}</Text>
      <Button
        title="Go to Home Screen"
        onPress={() => navigation.goBack()}
      />
    </View>
  );
}

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Select Exercise" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
  </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    marginHorizontal: 16,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default App;