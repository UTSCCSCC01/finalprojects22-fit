import * as React from 'react';
import { Text, View, Button, TextInput} from 'react-native';
import { styles } from '../style';
import { cleanString, cleanNum } from '../utility/format.js';
import { postSavedFood, patchSavedFood } from '../controller/RecordFoodController.js'


export function RecordFood({ route, navigation }) {

  const [carbs, setCarbohydrate] = React.useState(0);
  const [fats, setFat] = React.useState(0);
  const [prots, setProtein] = React.useState(0);

  const { food_name, food_group, food_id, carbohydrate, fat, protein } = route.params;

  const createSavedFood = async () => {

      /* Clean/set body parameters */
      const currentDate = new Date();
      const foodName = cleanString(food_name);

      /* bundle parameters into JSON format */
      const body = JSON.stringify({
        userId: '62a8aed17a8cd32ad4e43907',
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
      const json = patchSavedFood (savedfoodId, body);

      /* go back to food log page */
      navigation.popToTop()
    }

    React.useEffect(() => {
      setCarbohydrate(cleanNum(carbohydrate));
      setFat(cleanNum(fat));
      setProtein(cleanNum(protein));
    }, []);

    return (
      <View style={styles.container}>
          <Text>{cleanString(food_name)}</Text>
          <Text>{'Carbohydrates'}</Text>
          <View style={styles.foodInput}>
            <Button
              title="-"
              onPress={() => setCarbohydrate(carbs - 1)}
            />
            <TextInput
              style={styles.textInput}
              value={cleanNum(carbs) + ' g'}
              onChangeText={text => text === '' ? setCarbohydrate(carbs) : setCarbohydrate(parseFloat(text))}
              keyboardType="numeric"
            />
            <Button
              title="+"
              onPress={() => setCarbohydrate(carbs + 1)}
            />
          </View>
          <Text>{'Fats'}</Text>
          <View style={styles.foodInput}>
            <Button
              title="-"
              onPress={() => setFat(fats - 1)}
            />
            <TextInput
              style={styles.textInput}
              value={cleanNum(fats) + ' g'}
              onChangeText={text => text == '' ? setFat(fats) : setFat(parseFloat(text))}
              keyboardType="numeric"
            />
            <Button
              title='+'
              onPress={() => setFat(fats + 1)}
            />
          </View>
          <Text>{'Protein'}</Text>
          <View style={styles.foodInput}>
             <Button
                title="-"
                onPress={() => setProtein(prots - 1)}
             />
             <TextInput
                style={styles.textInput}
                value={cleanNum(prots) + ' g'}
                onChangeText={text => text == '' ? setProtein(prots) : setFat(parseFloat(text))}
                keyboardType="numeric"
             />
             <Button
                title='+'
                onPress={() => setProtein(prots + 1)}
             />
          </View>
        <Button
          title={cleanString(food_id) === 'N/A' ? 'Log Food' : 'Update Food'}
          onPress={() => cleanString(food_id) === 'N/A' ? createSavedFood() : updateSavedFood()}
        />
      </View>
    );
  }