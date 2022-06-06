import * as React from 'react';
import { View, Button, TextInput, Alert } from 'react-native';
import { styles } from '../style/styles';

export function MuscleGroupSelect({ navigation }) {
  //const [onChangeText] = React.useState(null);

  return (
    <View style={styles.container}>
        <TextInput
          style={styles.input}
          onSubmitEditing ={(event) => (Alert.alert(event.nativeEvent.text))}
          placeholder="Search for exercises"
        />
      <Button
        title="Abdominals"
        onPress={() => navigation.navigate('Select Exercise', {
          exerciseType: 'Abdominals',
        })}
      />
      <Button
        title="Back"
        onPress={() => navigation.navigate('Select Exercise', {
          exerciseType: 'Back',
        })}
      />
      <Button
        title="Biceps"
        onPress={() => navigation.navigate('Select Exercise', {
          exerciseType: 'Biceps',
        })}
      />
      <Button
        title="Calves"
        onPress={() => navigation.navigate('Select Exercise', {
          exerciseType: 'Calves',
        })}
      />
      <Button
        title="Cardio"
        onPress={() => navigation.navigate('Select Exercise', {
          exerciseType: 'Cardio',
        })}
      />
      <Button
        title="Chest"
        onPress={() => navigation.navigate('Select Exercise', {
          exerciseType: 'Chest',
        })}
      />
      <Button
        title="Legs"
        onPress={() => navigation.navigate('Select Exercise', {
          exerciseType: 'Legs',
        })}
      />
      <Button
        title="Shoulders"
        onPress={() => navigation.navigate('Select Exercise', {
          exerciseType: 'Shoulders',
        })}
      />
      <Button
        title="Triceps"
        onPress={() => navigation.navigate('Select Exercise', {
          exerciseType: 'Triceps',
        })}
      />
    </View>
  );
}
