import * as React from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { styles } from '../../style/styles';

export function CreateWorkout({ navigation }) {

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.generalButton}
        onPress={() => navigation.navigate('Workout Exercise Search')}
      >
      <View>
        <Text style={styles.generalButtonFont}> Add Exercises </Text>
      </View>
      </TouchableOpacity>
    </View>
  );
}
