import * as React from 'react';
import { Text, View, Button, TextInput} from 'react-native';
import { styles } from '../style';
import { cleanString, cleanNum } from '../utility/format.js';
import { postSavedFood, patchSavedFood } from '../controller/RecordFoodController.js'
import { retrieveUserId } from '../utility/dataHandler.js'


export function RecordFood({ route, navigation }) {

  const [carbs, setCarbohydrate] = React.useState(0);
  const [fats, setFat] = React.useState(0);
  const [prots, setProtein] = React.useState(0);
  const [cals, setCalorie] = React.useState(0);

  const { food_name, food_group, food_id, calorie, carbohydrate, fat, protein, date } = route.params;

  const per_carbohydrate = (Math.round(100*cleanNum(carbohydrate))/10000);
  const per_fat = (Math.round(100*cleanNum(fat))/10000);
  const per_protein = (Math.round(100*cleanNum(protein))/10000);

  const createSavedFood = async () => {

      /* Clean/set body parameters */
      const foodName = cleanString(food_name);
      const userId = await retrieveUserId();

      /* bundle parameters into JSON format */
      const body = JSON.stringify({
        userId: userId,
        food_name: foodName,
        calorie: cals,
        carbohydrate: carbs,
        fat: fats,
        protein: prots,
        date: date
      });

      /* Post Saved Food */
      const json = await postSavedFood(body);

      /* go back to exercise log page */
      navigation.navigate("Food Log", {date : date});
    }

    /* Update set */
    const updateSavedFood = async () => {

      /* Clean parameter */
      const savedfoodId = cleanString(food_id);

      /* bundle parameters into JSON format */
      const body = JSON.stringify({
        calorie: cals,
        carbohydrate: carbs,
        fat: fats,
        protein: prots,
      });

      /* patch st */
      const json = patchSavedFood (savedfoodId, body);

      /* go back to food log page */
      navigation.navigate("Food Log", {date : date});
    }

    React.useEffect(() => {
      setCarbohydrate(cleanNum(carbohydrate));
      setFat(cleanNum(fat));
      setProtein(cleanNum(protein));
      setCalorie(calorie);
    }, []);

    const changecalorie = (number) => {
        setCalorie(number);
        setCarbohydrate(Math.round(100*(cleanNum(per_carbohydrate) * number))/100);
        setFat(Math.round(100*(cleanNum(per_fat) * number))/100);
        setProtein(Math.round(100*(cleanNum(per_protein) * number))/100);
    }

    return (
      <View style={styles.container}>
          <Text>{cleanString(food_name)}</Text>
          <Text>{'Calories'}</Text>
          <View style={styles.foodInput}>
            <Button
              title="- 100g"
              onPress={() => cals <= 99 ? changecalorie(0)  : changecalorie(cals - 100) }
            />
            <TextInput
              style={styles.textInput}
              value={cleanString(cals) + ' g'}
              onChangeText={text => text === '' ? changecalorie(cals) : changecalorie(parseInt(text))}
              keyboardType="numeric"
            />
             <Button
                title='+ 100g'
                onPress={() => changecalorie(cals + 100)}
             />
          </View>
          <Text>{'Carbohydrates'}</Text>
          <View style={styles.foodInput}>
            <TextInput
              style={styles.textInput}
              value={cleanNum(carbs) + ' g'}
              onChangeText={text => text === '' ? setCarbohydrate(carbs) : setCarbohydrate(parseFloat(text))}
              keyboardType="numeric"
            />
          </View>
          <Text>{'Fats'}</Text>
          <View style={styles.foodInput}>
            <TextInput
              style={styles.textInput}
              value={cleanNum(fats) + ' g'}
              onChangeText={text => text == '' ? setFat(fats) : setFat(parseFloat(text))}
              keyboardType="numeric"
            />
          </View>
          <Text>{'Protein'}</Text>
          <View style={styles.foodInput}>
             <TextInput
                style={styles.textInput}
                value={cleanNum(prots) + ' g'}
                onChangeText={text => text == '' ? setProtein(prots) : setProtein(parseFloat(text))}
                keyboardType="numeric"
             />
          </View>
        <Button
          title={cleanString(food_id) === 'N/A' ? 'Log Food' : 'Update Food'}
          onPress={() => cleanString(food_id) === 'N/A' ? createSavedFood() : updateSavedFood()}
        />
      </View>
    );
  }