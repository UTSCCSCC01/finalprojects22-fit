import * as React from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { styles } from '../style/styles';
import { cleanString } from '../utility/format.js';
import { getExercisesByGroup, getExercisesBySearch } from '../controller/exerciseSelectController.js'
import { getCustomizedExercisesByGroup, getCustomizedExercisesBySearch } from '../controller/exerciseCustomizedSelectController.js'

export function ExerciseSelect({ route, navigation }) {
  /* Create hooks */
  const [isLoading, setLoading] = React.useState(true);
  const [data, setData] = React.useState([]);
  const [dataCustomized, setDataCustomized] = React.useState([]);

  const { exerciseType, SearchType, date } = route.params;

  /* stringify and clean route params */
  const exerciseTypeClean = cleanString(exerciseType);
  const SearchTypeClean = cleanString(SearchType);

  /* Search by muscle group (including cardio) */
  const getGroupExercises = async () => {
    try {
      const json = await getExercisesByGroup(exerciseTypeClean);
      setData(json.data);
    }catch (error) {
      console.error(error);
    }finally {
      setLoading(false);
    }
  }

  const getCustomizedGroupExercises = async () => {
    try {
      const json = await getCustomizedExercisesByGroup(exerciseTypeClean);
      setDataCustomized(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  /* Search via the search bar */
  const searchExercises = async () => {
    try {
      const json = await getExercisesBySearch(exerciseTypeClean);
      setData(json.data);
    }catch (error) {
      console.error(error);
    }finally {
      setLoading(false);
    }
  }

  const searchCustomizedExercises = async () => {
    try {
      const json = await getCustomizedExercisesBySearch(exerciseTypeClean);
      setDataCustomized(json.data);
    } catch (error) {
      console.error(error);
    }finally {
      setLoading(false);
    }
  }

  /* Trigger Query */
  React.useEffect(() => {
    if (SearchTypeClean === 'Search'){
      searchExercises();
      searchCustomizedExercises();
    }
    else{
      getGroupExercises();
      getCustomizedGroupExercises();
    }
  }, []);

/* Navigates to next page  */
const getItem = (item) => {
  navigation.navigate('Record Exercise', {
    exercise_name: item.ExerciseName,
    exercise_group: item.MuscleGroup,
    exercise_id: 'N/A',
    first_value: 0,
    second_value: 0,
    date: date,
  })

}

  return (
    <View style={styles.container}>
      <Text style={styles.displayText}>default section</Text>
      <View style={styles.flatListContainer}>
        {isLoading ? <ActivityIndicator /> : (
          <FlatList
            data={data}
            keyExtractor={(item, index) => item._id}
            renderItem={({ item }) => <Text style={styles.flatListSearchItem} onPress={() => getItem(item)}>{item.ExerciseName}</Text>}
          />
        )}
      </View>
      <Text style={styles.displayText}>customized section</Text>
      <View style={styles.flatListContainer}>
        {isLoading ? <ActivityIndicator /> : (
          <FlatList
            data={dataCustomized}
            keyExtractor={(item, index) => item._id}
            renderItem={({ item }) => <Text style={styles.flatListSearchItem} onPress={() => getItem(item)}>{item.ExerciseName}</Text>}
          />
        )}
      </View>
    </View>
  );
}