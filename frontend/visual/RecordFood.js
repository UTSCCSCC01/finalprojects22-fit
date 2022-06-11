import * as React from 'react';
import { Text, View, Button, TextInput} from 'react-native';
import { styles } from '../style';

export function RecordFood({ route, navigation }) {
  const { foodName } = route.params;
  const [calories, setCalories] = React.useState(0);
  const [protein, setProtein] = React.useState(0);

  return (
    <View style={styles.container}>
        <Text>foodName: {JSON.stringify(foodName)}</Text>
        <Text>Calories</Text>
        <View style={styles.foodInput}>
          <Button
            title="-"
            onPress={() => setCalories(calories - 5)}
          />
          <TextInput
            style={styles.textInput}
            value={JSON.stringify(calories)}
            onChangeText={text => text == '' ? setCalories(0) : setCalories(parseInt(text))}
            keyboardType="numeric"
          />
          <Button
            title="+"
            onPress={() => setCalories(calories + 5)}
          />
        </View>
        <Text>Protein</Text>
        <View style={styles.foodInput}>
          <Button
            title="-"
            onPress={() => setProtein(protein - 1)}
          />
          <TextInput
            style={styles.textInput}
            value={JSON.stringify(protein)}
            onChangeText={text => text == '' ? setProtein(0) : setProtein(parseInt(text))}
            keyboardType="numeric"
          />
          <Button
            title='+'
            onPress={() => setProtein(protein + 1)}
          />
        </View>
      <Button
        title="Log Food"
        onPress={() => navigation.popToTop()}
      />
      <Button
        title="Go back"
        onPress={() => navigation.goBack()}
      />
    </View>
  );
}