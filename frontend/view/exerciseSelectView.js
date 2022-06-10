import * as React from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { styles } from '../style/styles';
import { cleanString } from '../utility/format.js';
import { getExercisesByGroup, getExercisesBySearch } from '../controller/exerciseSelectController.js'

export function ExerciseSelect({ route, navigation }) {
  /* Create hooks */
  const [isLoading, setLoading] = React.useState(true);
  const [data, setData] = React.useState([]);

  const { exerciseType, SearchType } = route.params;

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

  /* Trigger Query */
  React.useEffect(() => {
    if (SearchTypeClean === 'Search'){
      searchExercises();
    }
    else{
      getGroupExercises();
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
  })

}

  return (
    <View style={styles.container}>
      {isLoading ? <ActivityIndicator/> : (
      <FlatList
        data={data}
        keyExtractor={({ id }, index) => id}
        renderItem={({item}) => <Text style={styles.item} onPress={()=> getItem(item)}>{item.ExerciseName}</Text>}
      />
      )}
    </View>
  );
}