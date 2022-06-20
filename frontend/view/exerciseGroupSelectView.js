import * as React from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { styles } from '../style/styles';

export function ExerciseGroupSelect({ navigation, route }) {
  const { date } = route.params;

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBarInput}
        onSubmitEditing ={(event) => navigation.navigate('Select Exercise', {
          exerciseType: event.nativeEvent.text,
          SearchType: 'Search',
          date: date,
        })}
        placeholder="Search for exercises"
      />
      <TouchableOpacity
        style={styles.generalButton}
        onPress={() => navigation.navigate('Select Exercise', {
          exerciseType: 'Abdominals',
          SearchType: 'Group',
          date: date,
        })}
        >
        <Text style={styles.generalButtonFont}> Abdominals </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.generalButton}
        onPress={() => navigation.navigate('Select Exercise', {
          exerciseType: 'Back',
          SearchType: 'Group',
          date: date,
        })}
        >
        <Text style={styles.generalButtonFont}> Back </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.generalButton}
        onPress={() => navigation.navigate('Select Exercise', {
          exerciseType: 'Biceps',
          SearchType: 'Group',
          date: date,
        })}
        >
        <Text style={styles.generalButtonFont}> Biceps </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.generalButton}
        onPress={() => navigation.navigate('Select Exercise', {
          exerciseType: 'Calves',
          SearchType: 'Group',
          date: date,
        })}
        >
        <Text style={styles.generalButtonFont}> Calves </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.generalButton}
        onPress={() => navigation.navigate('Select Exercise', {
          exerciseType: 'Cardio',
          SearchType: 'Group',
          date: date,
        })}
        >
        <Text style={styles.generalButtonFont}> Cardio </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.generalButton}
        onPress={() => navigation.navigate('Select Exercise', {
          exerciseType: 'Chest',
          SearchType: 'Group',
          date: date,
        })}
        >
        <Text style={styles.generalButtonFont}> Chest </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.generalButton}
        onPress={() => navigation.navigate('Select Exercise', {
          exerciseType: 'Legs',
          SearchType: 'Group',
          date: date,
        })}
        >
        <Text style={styles.generalButtonFont}> Legs </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.generalButton}
        onPress={() => navigation.navigate('Select Exercise', {
          exerciseType: 'Shoulders',
          SearchType: 'Group',
          date: date,
        })}
        >
        <Text style={styles.generalButtonFont}> Shoulders </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.generalButton}
        onPress={() => navigation.navigate('Select Exercise', {
          exerciseType: 'Triceps',
          SearchType: 'Group',
          date: date,
        })}
        >
        <Text style={styles.generalButtonFont}> Triceps </Text>
      </TouchableOpacity>
    </View>
  );
}
