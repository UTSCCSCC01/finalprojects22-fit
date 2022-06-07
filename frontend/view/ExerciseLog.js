import * as React from 'react';
import { View, Button, FlatList, Text } from 'react-native';
import { styles } from '../style/styles';

export function ExerciseLog({ navigation }) {

  return (
    <View style={styles.container}>
      <FlatList
        data={[
          {key: 'ex1'},
          {key: 'ex2'},
          {key: 'ex3'},
          {key: 'ex4'},
          {key: 'ex5'},
          {key: 'ex6'},
          {key: 'ex7'},
          {key: 'ex8'},
          {key: 'ex9'},
          {key: 'ex10'},
          {key: 'ex11'},
          {key: 'ex12'},
          {key: 'ex13'},
          {key: 'ex14'},
          {key: 'ex15'},
          {key: 'ex16'},
          
        ]}
        renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
      />
      <Button
        title="Log a new exercise"
        onPress={() => navigation.navigate('Select Muscle Group')}
      />
    </View>
  );
}