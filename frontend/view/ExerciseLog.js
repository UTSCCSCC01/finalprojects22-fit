import * as React from 'react';
import { ActivityIndicator, Button, FlatList, Text, View } from 'react-native';
import { styles } from '../style/styles';

export function ExerciseLog({ navigation }) {
  /* Create hooks */
  const [isLoading, setLoading] = React.useState(true);
  const [data, setData] = React.useState([]);

  /* Pull user's sets */
  /* TO DO - GET USER DATA INSTEAD OF HARD COADING USER ID */
  const getSets = async () => {
    try {
      const response = await fetch('http://localhost:3000/set/629fb406dce35a2490193a84');
      const json = await response.json();
      setData(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    getSets();
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? <ActivityIndicator/> : (
      <FlatList
        data={data}
        keyExtractor={({ id }, index) => id}
        renderItem={({item}) => <Text style={styles.item}>{item.exercise_name},{item.first_value}</Text>}
      />
      )}
      <Button
        title="Log a new exercise"
        onPress={() => navigation.navigate('Select Muscle Group')}
      />
    </View>
  );
}