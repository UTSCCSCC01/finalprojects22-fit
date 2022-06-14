import * as React from 'react';
import { Text, View, Button, TextInput} from 'react-native';
import { styles } from '../style';
import { cleanString} from '../utility/format.js';
import { postSet, patchSet } from '../controller/RecordFoodController.js'


export function RecordFood({ route, navigation }) {

  const [carbohydrate, setCarbohydrate] = React.useState(0);
  const [fat, setFat] = React.useState(0);
  const [protein, setProtein] = React.useState(0);

  const { food_name, food_group, food_id, carbs, fats, prots } = route.params;

  const createSet = async () => {

      /* Clean/set body parameters */
      const currentDate = new Date();
      const foodName = cleanString(food_name);

      /* bundle parameters into JSON format */
      const body = JSON.stringify({
        userId: '62a4d21342622fa510066af9',
        food_name: foodName,
        carbohydrate: carbs,
        fat: fats,
        protein: prots,
        date: currentDate.getTime()
      });

      /* Post Saved Food */
      const json = await postSavedFood(body);

      /* go back to exercise log page */
      navigation.popToTop()
    }

    /* Update set */
    const updateSavedFood = async () => {

      /* Clean parameter */
      const savedfoodId = cleanString(food_id);

      /* bundle parameters into JSON format */
      const body = JSON.stringify({
        carbohydrate: carbs,
        fat: fats,
        protein: proteins,
      });

      /* patch st */
      const json = patchSet(savedfoodId, body);

      /* go back to food log page */
      navigation.popToTop()
    }

    React.useEffect(() => {
      setCarbohydrate(carbs);
      setFat(fats);
      setProtein(prots);
    }, []);

    return (
      <View style={styles.container}>
          <Text>{cleanString(food_name)}</Text>
          <Text>{cleanString(food_group)}</Text>
          <View style={styles.foodInput}>
            <Button
              title="-"
              onPress={() => setCarbohydrate(carbohydrate - 1)}
            />
            <TextInput
              style={styles.textInput}
              value={cleanString(carbohydrate)}
              onChangeText={text => text === '' ? setCarbohydrate(0) : setCarbohydrate(parseInt(text))}
              keyboardType="numeric"
            />
            <Button
              title="+"
              onPress={() => setCarbohydrate(carbohydrate + 1)}
            />
          </View>
          <View style={styles.foodInput}>
            <Button
              title="-"
              onPress={() => setFat(fat - 1)}
            />
            <TextInput
              style={styles.textInput}
              value={cleanString(fat)}
              onChangeText={text => text == '' ? setFat(0) : setFat(parseInt(text))}
              keyboardType="numeric"
            />
            <Button
              title='+'
              onPress={() => setFat(fat + 1)}
            />
          </View>
          <View style={styles.foodInput}>
             <Button
                title="-"
                onPress={() => setProtein(protein - 1)}
             />
             <TextInput
                style={styles.textInput}
                value={cleanString(protein)}
                onChangeText={text => text == '' ? setProtein(0) : setFat(parseInt(text))}
                keyboardType="numeric"
             />
             <Button
                title='+'
                onPress={() => setProtein(protein + 1)}
             />
          </View>
        <Button
          title={cleanString(food_id) === 'N/A' ? 'Log Food' : 'Update Food'}
          onPress={() => cleanString(food_id) === 'N/A' ? createSavedFood() : updateSavedFood()}
        />
      </View>
    );
  }