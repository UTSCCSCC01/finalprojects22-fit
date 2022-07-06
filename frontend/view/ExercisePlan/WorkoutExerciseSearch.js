import * as React from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { styles } from '../../style/styles';

export function WorkoutExerciseSearch({ navigation }) {

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.generalButton}
        onPress={() => navigation.navigate('Create Workout')}
      >
      <View>
        <Text style={styles.generalButtonFont}> go back </Text>
      </View>
      </TouchableOpacity>
    </View>
  );
}
