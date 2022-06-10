import * as React from 'react';
import { View, Button, TextInput } from 'react-native';
import { styles } from '../style/styles';

export function ExerciseGroupSelect({ navigation }) {

  return (
    <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          onSubmitEditing ={(event) => navigation.navigate('Select Exercise', {
            exerciseType: event.nativeEvent.text,
            SearchType: 'Search',
          })}
          placeholder="Search for exercises"
        />
        <Button
          title="Abdominals"
          onPress={() => navigation.navigate('Select Exercise', {
            exerciseType: 'Abdominals',
            SearchType: 'Group',
          })}
        />
        <Button
          title="Back"
          onPress={() => navigation.navigate('Select Exercise', {
            exerciseType: 'Back',
            SearchType: 'Group',
          })}
        />
        <Button
          title="Biceps"
          onPress={() => navigation.navigate('Select Exercise', {
            exerciseType: 'Biceps',
            SearchType: 'Group',
          })}
        />
        <Button
          title="Calves"
          onPress={() => navigation.navigate('Select Exercise', {
            exerciseType: 'Calves',
            SearchType: 'Group',
          })}
        />
        <Button
          title="Cardio"
          onPress={() => navigation.navigate('Select Exercise', {
            exerciseType: 'Cardio',
            SearchType: 'Group',
          })}
        />
        <Button
          title="Chest"
          onPress={() => navigation.navigate('Select Exercise', {
            exerciseType: 'Chest',
            SearchType: 'Group',
          })}
        />
        <Button
          title="Legs"
          onPress={() => navigation.navigate('Select Exercise', {
            exerciseType: 'Legs',
            SearchType: 'Group',
          })}
        />
        <Button
          title="Shoulders"
          onPress={() => navigation.navigate('Select Exercise', {
            exerciseType: 'Shoulders',
            SearchType: 'Group',
          })}
        />
        <Button
          title="Triceps"
          onPress={() => navigation.navigate('Select Exercise', {
            exerciseType: 'Triceps',
            SearchType: 'Group',
          })}
        />
      </View>

  );
}
